'use client'
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseC';
import { useRouter } from 'next/navigation'; // Updated import for Next.js app directory
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { CarouselOrientation } from './showcase';

export default function Home() {

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/');
      }
      setLoading(false);
    };
    
    checkUser();
  }, [router, supabase.auth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-screen bg-[#161616] flex items-center justify-start ">
      <div className="bg-transparent p-4 rounded-lg sm:w-[25%] w-[95%] ml-[0%] sm:ml-[5%]">
      <p className='f1f -mt-20 mb-12 text-xl ml-0.5'>MF</p>
        <p className='fon text-3xl text-[#e7e7e7]'>Sign in</p>
        <p className='fon text-xs mt-1 text-[#e7e7e7] mb-1'>New to MangaFusion? Continue we will initiate a sign up.</p>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google', 'discord', 'spotify']}
          theme="dark"
        />

      </div>
      <div className="hidden sm:block ml-auto">
  <CarouselOrientation />
</div>

    </div>
  );
}
