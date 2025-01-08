'use client'
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseC';
import { useRouter } from 'next/navigation'; // Updated import for Next.js app directory
import SearchBar from './search';
import UserDropdown from './user_dropdown';

import { Switch } from "@/components/ui/switch"
import { Scale } from 'lucide-react';

export default function Navbar({print}) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(print);
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    fetchUser();
  }, []);
  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
    if (isChecked) {
      window.location.href = '/';
    } else {
      window.location.href = '/digital';
    }
};
  return (
    <div className="relative mb-2 w-full bg-[#212121] h-[50px] flex items-center px-4 justify-between">
      {/* First item (LHC) */}
      <p className="f1f text-xl sm:ml-4 hidden sm:block">
  <a href="/">MF</a>
</p>
<div className="mt-0.5 -ml-0.5 gap-2 flex items-center block sm:hidden">
  <svg className='text-[#999999]' xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
    <path fill="currentColor" d="M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3M8 5h8v3H8zm8 14H8v-4h8zm2-4v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4z"/>
    <circle cx="18" cy="11.5" r="1" fill="currentColor"/>
  </svg>
  <Switch className="" checked={isChecked} onCheckedChange={handleSwitchChange} />
  <svg className='text-[#999999]' xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
    <path fill="currentColor" d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5c0-2.64-2.05-4.78-4.65-4.96M19 18H6c-2.21 0-4-1.79-4-4c0-2.05 1.53-3.76 3.56-3.97l1.07-.11l.5-.95A5.47 5.47 0 0 1 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5l1.53.11A2.98 2.98 0 0 1 22 15c0 1.65-1.35 3-3 3m-9-3.82l-2.09-2.09L6.5 13.5L10 17l6.01-6.01l-1.41-1.41z"/>
  </svg>
</div>
      {/* Center item */}
      <p className="f1f text-xl text-[#C4C3AE] absolute left-1/2 transform -translate-x-1/2 hidden sm:block">
        マンガ
      </p>
      <p className="f1f text-xl mt-1 sm:ml-4 absolute left-1/2 transform -translate-x-1/2 block sm:hidden">
  <a href="/">MF</a>
</p>
      <SearchBar placeholder={print} />

      {/* Third item (RHC) */}
      <UserDropdown />
    </div>
  );
}
