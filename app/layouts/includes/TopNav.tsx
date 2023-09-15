import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { BiSearch, BiUser } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { useUser } from "@/app/context/userContext";
import { useGeneralStore } from "@/app/stores/general";
import { RandomUsers } from "@/app/types/types";
import { debounce } from "debounce";
import useSearchProfileByName from "@/app/hooks/useSearchProfileByName";
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";



export default function TopNav() {
    const router = useRouter();
    const pathname = usePathname();

    const userContext = useUser();
    const { setIsLoginOpen, setIsEditProfileOpen } = useGeneralStore();

    const [searchName, setSearchName] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const [searchProfile, setSearchProfile] = useState<RandomUsers[]>([]);

    const handleSearchName = debounce(async(event: React.ChangeEvent<HTMLInputElement>) => {
         
        const { value } = event.target;
        
        if(value == '') {
            return setSearchProfile([]);
        }
        try {
            const result = await useSearchProfileByName(value);

            if(result) {
                return setSearchProfile(result)
            } else  {
             setSearchProfile([])
            }

        } catch (error) {
            setSearchProfile([]);
            alert(error);
        }
    }, 500);

    const handleGoTo = () => {
        if(!userContext?.user) {
            setIsLoginOpen(true);
            return;
        }

        router.push('/upload');
    }

    const handleLogout = async () => {
        await userContext?.logout();
        setShowMenu(false);
    }

    useEffect(() => {
        setIsEditProfileOpen(false);
    }, []);

    return (
        <>
        <div id="nav" className="fixed bg-white z-30 flex items-center w-full border-b h-[60px]">
            <div className={`flex items-center justify-between gap-6 w-full px-4 mx-auto ${pathname == '/' ? 'max-w-[1150px]' : '' }`}>
                <Link href="/">
                    <img src="/images/tiktok-logo.png" alt="app-logo" className="min-w-[115px] w-[115px] " />
                </Link>

                <div className="relative hidden md:flex items-center justify-end bg-[#f1f1f2] p-1 rounded-full max-w-[430px] w-full ">
                    <input 
                    type="text" 
                    onChange={handleSearchName} 
                    // value={searchName}
                    placeholder="search account"
                    className="w-full pl-3 my-2 bg-transparent placeholder-[#838383] text-[15px] focus:outline-none "
                    />

                    {
                        searchProfile?.length > 0 ? (
                            <div className="absolute bg-white max-w-[910px] w-full h-auto z-20 left-0 top-12 border p-1 ">
                                {
                                    searchProfile?.map((profile, index) => (
                                    <div className="p-1" key={index}>
                                        <Link href={`/profile/${profile?.id}`} className="flex items-center justify-between w-full cursor-pointer hover:bg-[#f12b56] p-1 px-2 hover:text-white ">
                                            <div className="flex items-center">
                                                <img width={40} className="rounded-md" src={useCreateBucketUrl(profile?.image)} alt="user-image" />
                                                <div className="truncate ml-2">{profile?.name}</div>
                                            </div>
                                        </Link>
                                    </div>
                                    ))
                                }
                            </div>
                        ) : null
                    }

                    <button className="px-3 py-1 flex items-center cursor-pointer border-l border-l-gray-300">
                        <BiSearch color="#A1A2A7" size={22} />
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <button
                    onClick={handleGoTo}
                    className="flex items-center border rounded-sm py-[6px] hover:bg-gray-100 pl-1.5"
                    >
                        <AiOutlinePlus color="#000" size={22} />
                        <span className="px-2 font-medium text-[15px]">Upload</span>
                    </button>
                    {
                        !userContext?.user?.id  ? (
                        <div className="flex items-center gap-1">
                            <button
                            onClick={() => setIsLoginOpen(true)}                            
                            className="flex items-center bg-[#f02c56] text-white border rounded-md px-3 py-[6px] ">
                                <span className="whitespace-nowrap mx-4 font-medium text-[15px] ">Log In</span>
                            </button>
                            <BsThreeDotsVertical size={25} color="#161724" className="cursor-pointer " />
                        </div>

                        ) : (
                            <div className="flex items-center">
                                <div className="relative">
                                    <button 
                                     onClick={() => setShowMenu((showMenu) => !showMenu)}
                                    className="mt-1 border border-gray-200 rounded-full">
                                        <img src={useCreateBucketUrl(userContext?.user?.image || '')} alt="user-image" className="rounded-full w-[35px] h-[35px]" />
                                    </button>

                                    {
                                        showMenu ? (
                                        <div className="absolute bg-white rounded-lg py-1.5 w-[200px] shadow-xl border top-[40px] right-0 ">
                                            <button 
                                            onClick={() => {
                                                router.push(`/profile/${userContext?.user?.id}`);
                                                setShowMenu(false);
                                            } }
                                            className="flex items-center w-full justify-center hover:bg-gray-100 py-3 px-2 hover-bg-gray-100 cursor-pointer">
                                                <BiUser size={20} />
                                                <span className="pl-2 font-semibold text-sm">Profile</span>
                                            </button>
                                            <button 
                                                onClick={handleLogout}
                                                className="flex items-center w-full justify-center hover:bg-gray-100 py-3 px-2 hover-bg-gray-100 cursor-pointer">
                                                <FiLogOut size={20} />
                                                <span className="pl-2 font-semibold text-sm">Logout</span>
                                            </button>
                                        </div>

                                        ) : null
                                    }

                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
        </>
    )
}