'use client'
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseC';
import { useRouter } from 'next/navigation'; // Updated import for Next.js app directory
import SearchBar from './search';
import UserDropdown from './user_dropdown';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    fetchUser();
  }, []);

  return (
    <div className="relative mb-2 w-full bg-[#212121] h-[50px] flex items-center px-4 justify-between">
      {/* First item (LHC) */}
      <p className="f1f text-xl sm:ml-4">
        <a href="/">MF</a>
      </p>
      
      {/* Center item */}
      <p className="f1f text-xl text-[#C4C3AE] absolute left-1/2 transform -translate-x-1/2">
        マンガ
      </p>
      
      <SearchBar />

      {/* Third item (RHC) */}
      <UserDropdown />
    </div>
  );
}
