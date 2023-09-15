
import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MenuItem from './MenuItem';
import ClientOnly from '@/app/components/ClientOnly';
import MenuItemFollow from '@/app/layouts/includes/MenuItemFollow';
import { useGeneralStore } from '@/app/stores/general';
import { useUser } from '@/app/context/userContext';


export default function SideNavMain() {
    const pathname = usePathname();

    const { setRandomUsers, randomUsers } = useGeneralStore();

    const contextUser = useUser();

    useEffect(() => {
        setRandomUsers()
    }, []);

    return (
        <>
        <div id='SideNavMain' className={`
            fixed
            z-20
            bg-white
            pt-[70px]
            h-full
            lg:border-r
            w-[75px]
            overflow-auto
            ${pathname === '/' ? "lg:w-[310px]" : "lg:w-[220px]"}
        `}>
            <div className="lg:w-full w-[55px] mx-auto ">
                <Link href="/">
                  <MenuItem  
                   iconString="For You"
                   colorString={pathname == '/' ? "#f02c56" : ""}
                   sizeString="20"
                  />
                </Link>
                <MenuItem  
                   iconString="Following"
                   colorString="#000"
                   sizeString="25"
                />
                <MenuItem  
                   iconString="Live"
                   colorString="#000"
                   sizeString="25"
                />
            </div>

                <div className="border-b lg:ml-2 mt-2" />

                <h3 className="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2">Suggested accounts</h3>

                <div className="lg:hidden block pt-3" />

                <ClientOnly>
                    <div className='cursor-pointer'>
                        {
                            randomUsers?.map((user, index) => (
                                <MenuItemFollow  user={user} key={index} />
                            ))
                        }
                    </div>
                </ClientOnly>
            
                <button className='lg:block text-[#f02c56] pt-1.5 pl-2 text-[13px] '>
                    See all
                </button>


            {
                contextUser?.user?.id ? (
                <>
                <div className="border-b lg:ml-2 mt-2" />

                <h3 className="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2">Following accounts</h3>

                <div className="lg:hidden block pt-3" />

                <ClientOnly>
                    <div className='cursor-pointer'>
                    {
                        randomUsers?.map((user, index) => (
                            <MenuItemFollow  user={user} key={index} />
                        ))
                    }
                    </div>
                </ClientOnly>
            
                <button className='lg:block text-[#f02c56] pt-1.5 pl-2 text-[13px] '>
                    See more
                </button>
                    
                </>

                ) : null
            }

            <div className="lg:block hidden border-b lg:ml-2 mt-2" />

            <div className="lg:block hidden text-[11px] text-gray-500 ">
                <p className="pt-4 px-2">About Newsroom Tiktok Shop Contact Careers ByteDance</p>
                <p className="pt-4 px-2">Tiktok for Good Advertise Developers Transparency Tiktok Rewards Tiktok Browse Tiktok Embeds</p>
                <p className="pt-4 px-2">Help Safety Terms Privacy Creator Portal Community Guide</p>
                <p className="pt-4 px-2">&copy; {new Date().getFullYear()} TikTok </p>
            </div>

        </div>
        </>
    )
}