'use client';

import React from "react";
import { usePathname } from 'next/navigation';
import TopNav from "./includes/TopNav";
import SideNavMain from "./includes/SideNavMain";


export default function MainLayout({ children}: { children: React.ReactNode}) {
    const pathname = usePathname();
    return (
        <>
        <TopNav />
         <div className={`flex overflow-x-hidden justify-between mx-auto w-full lg:px-2 5 px-0 ${pathname == '/' ? 'max-w-[1140px]' : '' } `}>
            <SideNavMain />
            {children}
         </div>
        </>
    )
}