import Link from "next/link";
import { MenuItemCompTypes } from "../../types/types";
import { AiOutlineCheck } from "react-icons/ai";
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";


export default function MenuItemFollow({ user }: MenuItemCompTypes) {

    return (
        <>
        <Link href={`/profile/${user?.id}`} 
        className="flex items-center cursor-pointer hover:bg-gray-100 rounded-md w-full py-1.5 px-2"
        >
        <img src={useCreateBucketUrl(user?.image || '')} alt="user-image" width={35} className="rounded-full lg:mx-0 mx-auto" />
        <div className="lg:pl-2 5 lg:block hidden">
            <div className="flex items-center">
                <p className="font-bold text-[14px] truncate ">
                    {user?.name}
                </p>
                <p className="ml-1 rounded-full bg-[#58d5ec] h-[14px] relative ">
                    <AiOutlineCheck size={15} className="relative p-[3px]" color="#fff"  />
                </p>
            </div>
            <p className="font-light text-[12px] text-gray-600 ">
                {user?.name}
            </p>
        </div>        
        </Link>
        </>
    )
}