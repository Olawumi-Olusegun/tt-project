'use client';

import React, { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UploadError } from "../types/types";
import UploadLayout from "../layouts/UploadLayout";
import { BiLoader, BiLoaderCircle, BiSolidCloudUpload } from "react-icons/bi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { PiKnifeLight } from "react-icons/pi";
import { useUser } from "../context/userContext";
import useCreatePost from "../hooks/useCreatePost";

export default function Upload() {

    const router = useRouter();

    const contextUser = useUser();
    

    const [fileDisplay, setFileDisplay] = useState('');
    const [caption, setCaption] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<UploadError | null>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if(files && files.length > 0) {
            const file = files[0];
            const fileUrl = URL.createObjectURL(file);
            setFileDisplay(fileUrl);
            setFile(file);
        }
    }

    const handleClearVideo = useCallback(() => {
        setFile(null);
        setFileDisplay('');
    }, []);

    const handledisCard = useCallback(() => {
        setFile(null);
        setFileDisplay('');
        setCaption('');
    }, []);

    const validatePost = () => {
        setError(null);
        let isError = false;
        if(!file) {
            setError({ type: 'File', message: "A video is required"});
            isError = true;
        } else if(!caption) {
            setError({ type: 'Caption', message: "A caption is required"});
            isError = true;
        }

        return isError;
    }

    const createNewPost = async () => {
        console.log(caption)
        let isError = validatePost();

        if(isError) return;
        if(!file || !contextUser?.user) return;

        setIsUploading(true);

        try {
            await useCreatePost(file, contextUser?.user?.id, caption);
            router.push(`/profile/${contextUser?.user?.id}`);
        } catch (error) {
            setIsUploading(false);
            alert(error);
        }
    }

    useEffect(() => {
        if(!contextUser?.user) {
            router.push('/');
        }
    }, [contextUser]);

    return (
        <>
         <UploadLayout>
            <div className="w-full mt-[80px] bg-white shadow-lg rounded-md py-6 md:px-10 px-4 ">
                <div>
                    <h1 className="text-[23px] font-semibold ">Upload video</h1>
                    <h1 className="text-gray-400 mt-1 ">Post a video to your account</h1>
                </div>
                <div className="mt-8 md:flex gap-6">
                    {!fileDisplay ? (
                        <>
                        <label htmlFor="fileInput" 
                        className="
                         md:mx-0
                         mx-auto
                         mt-4
                         mb-6
                         flex
                         flex-col
                         items-center
                         justify-center
                         w-full
                         max-w-[260px]
                         h-[470px]
                         text-center
                         p-3
                         border-2
                         border-dashed
                         border-gray-300
                         rounded-lg
                         hover:bg-gray-100
                         cursor-pointer
                         transition
                        "
                        >
                            <BiSolidCloudUpload size={40} color="#b3b3b1" />
                            <p className="mt-4 text-[17px]">Select video to upload</p>
                            <p className="mt-1.5 text-gray-500 text-[13px]">Or drag and drop a file</p>
                            <p className="mt-12 text-gray-500 text-[17px]">MP4</p>
                            <p className="mt-2 text-gray-500 text-[13px]">Up to 30 minutes</p>
                            <p className="mt-2 text-gray-500 text-[13px]">Less than 2 GB</p>
                            
                            <span 
                            className="px-2 py-1.5 mt-8 text-white text-[15px] w-[80%] bg-[#f02c56] rounded-sm cursor-pointer"
                            >
                            Select File
                            <input 
                            type="file" 
                            id="fileInput" 
                            className="hidden" 
                            onChange={handleFileChange}
                            accept=".mp4"
                            />
                            </span>
                        </label>

                        </>
                    ) : (
                    <>
                    <div className="
                        md:mx-0
                        mx-auto
                        mt-4
                        md:mb-12
                        mb:16
                        flex
                        items-center
                        justify-center
                        w-full
                        max-w-[260px]
                        h-[540px]
                        p-3
                        rounded-2xl
                        cursor-pointer
                        relative
                    ">
                        { isUploading ? (
                            <div className="absolute flex items-center justify-center z-20 bg-black h-full w-full rounded-[50px] bg-opacity-50 ">
                                <div className="mx-auto flex items-center justify-center gap-1">
                                    <BiLoader size={30} color="#f12b56" className="animate-spin" />
                                    <div className="text-white font-bold">Uploading...</div>
                                </div>
                            </div>

                        ) : null }

                        <img src="/images/mobile-case.png" alt="mobile-case" 
                         className="absolute z-20 pointer-event-none"
                        />

                        <img src="/images/tiktok-logo-white.png" alt="mobile-case" 
                         className="absolute z-20 right-4 bottom-6 pointer-event-none"
                         width={90}
                        />

                        <video
                            src={fileDisplay}
                            autoPlay
                            loop
                            muted
                            className="absolute rounded-xl object-cover z-20 p-[13px] w-full h-full"
                        />

                        <div className="absolute -bottom-12 flex items-center justify-between rounded-xl border w-full p-2 border-gray-300 ">
                          <div className="flex items-center truncate">
                            <AiOutlineCheckCircle size={16} className="min-w-[16px]" />
                            <p className="text-[11px] pl-2 truncate text-ellipsis">
                                { file ? file?.name  : ''}
                            </p>
                          </div>  
                          <button 
                          onClick={handleClearVideo}
                          className="text-[11px] ml-2 font-semibold"

                          >
                            Change
                          </button>
                        </div>

                    </div>
                    
                    </>) }

                    <div className="mt-12 md:mt-4 mb-6">
                        <div className="flex bg-[#f8f8f8] py-4 px-6 ">
                            <div>
                                <PiKnifeLight size={20} className="mr-4"  />
                            </div>

                            <div>
                                <div className="text-semibold text-[15px] mb-1.5 ">
                                    Divide videos and edit
                                </div>
                                <div className="text-semibold text-[13px] text-gray-400 ">
                                    You can quickly divide videos into multiple parts, remove redundant parts and turn landscape videos into portrait videos
                                </div>
                            </div>
                            <div className="flex justify-end max-w-[130px] w-full h-full text-center my-auto">
                                <button className="px-8 py-1.5 text-white text-[15px] bg-[#f02c56] rounded-sm ">
                                    Edit
                                </button>
                            </div>
                        </div>
                        
                        <div className="mt-5">
                            <div className="flex items-center justify-between">
                                <p className="mb-1 text-[15px] ">Caption</p>
                                <span className="text-gray-400 text-[12px] ">{caption?.length}/150</span>
                            </div>
                            <input
                            maxLength={150}
                            type="text"
                            className="w-full border p-2.5 rounded-md focus:outline-none"
                            onChange={(event) => setCaption(event.target.value)}
                            value={caption}
                            />
                        </div>

                        <div className="flex gap-3">
                            <button className="px-10 py-2.5 mt-8 border text-[16px] hover:bg-gray-100 rounded-sm"
                            disabled={isUploading}
                            onClick={handledisCard}
                            >
                                Discard
                            </button>

                            <button className="px-10 py-2.5 mt-8 border text-[16px] text-white bg-[#f02c56] rounded-sm "
                            disabled={isUploading}
                            onClick={createNewPost}
                            >
                                {
                                isUploading 
                                ? <BiLoaderCircle size={25} className="animate-spin" color="#fff" /> 
                                : "Post" 
                                }
                            </button>
                        </div>

                        {
                            error ? (
                                <div className="text-red-600 mt-4">
                                    { error?.message }
                                </div>
                            ) : null
                        }

                    </div>
                </div>
            </div>
         </UploadLayout>
        </>
    )
}