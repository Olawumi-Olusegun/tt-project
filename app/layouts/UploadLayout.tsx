'use client'
import React from "react";
import TopNav from "./includes/TopNav";

export default function UploadLayout({ children}: { children: React.ReactNode}) {
  
    return (
        <>
         <div className="bg-[#f8f8f8] h-[100vh]">
            <TopNav />
            <div className="flex justify-between mx-auto w-full px-2 max-w-[1140px]">
                {children}
            </div>
         </div>
        </>
    )
}