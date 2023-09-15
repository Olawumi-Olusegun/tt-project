'use client';
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from 'react-icons/ai';
import Register from "./auth/Register";
import Login from "./auth/Login";
import { useGeneralStore } from "../stores/general";


export default function AuthOverlay() {
    const [isRegister, setIsRegister] = useState(false);
    const { setIsLoginOpen } = useGeneralStore();

    return (
        <>
        <div id="AuthOverlay" className="fixed flex items-center justify-center p-2 z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50">
            <form className="relative bg-white w-full max-w-[470px] h-[70%] p-4 rounded-lg  overflow-auto " >
                <div className="w-full flex justify-end">
                    <button
                     onClick={() => setIsLoginOpen(false)}
                     className="p-1.5 rounded-full bg-gray-100">
                     <AiOutlineClose size={26} />
                    </button>
                </div>
                    { isRegister ? <Register /> : <Login /> }
                <div className="aboslute flex items-center justify-center space-x-[5px] py-5 left-0 bottom-0 border-t w-full">
                    <span className="text-gray-600 text-[14px] ">
                        { !isRegister ? "Don't have an account?" : "Already have an account?"  }
                    </span>
                    <button
                     onClick={() => setIsRegister((isRegister) => !isRegister)}
                     className="text-[14px] text-[#f02c56] font-semibold"
                    >
                        <span>
                            {!isRegister ? ' Register' : " Login" }
                        </span>
                    </button>
                </div>
            </form>
        </div>
        </>
    )
}