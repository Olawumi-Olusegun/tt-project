'use client'

import { MenuItemstypes } from "@/app/types/types";
import { AiOutlineHome } from "react-icons/ai";
import { BsCameraVideo } from "react-icons/bs";
import { RiGroupLine } from "react-icons/ri";

export default function MenuItem({iconString, colorString, sizeString}: MenuItemstypes) {

    const icons = () => {
        if(iconString === 'For You')  return <AiOutlineHome size={sizeString} color={colorString} />
        if(iconString === 'Following')  return <RiGroupLine size={sizeString} color={colorString} />
        if(iconString === 'Live')  return <BsCameraVideo size={sizeString} color={colorString} />
    }

    return (
        <>
         <div className="w-full cursor-pointer flex items-center hover:bg-gray-100 p-2.5 rounded-md ">
            <div className="flex item-center lg:mx-0 mx-auto">
                {icons()}
                <p className={`lg:block hidden pl-[9px] mt-0.5 font-semibold text-[17px] text-[${colorString}]`}>
                    {iconString}
                </p>
            </div>
         </div>
        </>
    )
}