'use client';

import React, { useEffect }  from 'react';
import ClientOnly from "@/app/components/ClientOnly";
import Comments from "@/app/components/post/Comments";
import CommentsHeader from "@/app/components/post/CommentsHeader";
import { useCommentStore } from "@/app/stores/comment";
import { useLikeStore } from "@/app/stores/like";
import { usePostStore } from "@/app/stores/post";
import { PostPageTypes } from "@/app/types/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";
import { BiChevronUp } from "react-icons/bi";
import useCreateBucketUrl from '@/app/hooks/useCreateBucketUrl';

export default function Post({ params}: PostPageTypes) {
    
    const router = useRouter();

   const { postById, postsByUser, setPostById, setPostsByUser } = usePostStore();
   const { setLikesByPost } = useLikeStore();
   const { setCommentsByPost } = useCommentStore();

    const loopThroughPostsUp  = () => {
        postsByUser?.forEach((post) => {
            if(post?.id > params?.postId) {
                router.push(`/post/${post?.id}/${params?.userId}`);
            }
        })
    }
    
    const loopThroughPostsDown  = () => {
        postsByUser?.forEach((post) => {
            if(post?.id < params?.postId) {
                router.push(`/post/${post?.id}/${params?.userId}`);
            }
        })
    }


    useEffect(() => {
        console.log({ postId: params?.postId})
        setPostById(params?.postId);
        setCommentsByPost(params?.postId);
        setLikesByPost(params?.postId);
        setPostsByUser(params?.userId);
    }, [])

    return (
        <>
            <div 
            id="PostPage"
            className="lg:flex justify-between w-full h-screen bg-black overflow-auto "
            >
                <div className="lg:w-[calc(100%_-_540px)] h-full relative ">
                    <Link href={`/profile/${params?.userId}`}>
                        <div className="absolute text-white z-20 m-5 rounded-full bg-gray-700 p-1.5 hover:bg-gray-800">
                            <AiOutlineClose size={27}  />
                        </div>
                    </Link>

                    <div>
                        <button
                        onClick={() => loopThroughPostsUp()}
                        className="absolute z-20 right-4 top-4 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
                        >
                            <BiChevronUp size={30} color="fff" />
                        </button>

                        <button
                        onClick={() => loopThroughPostsDown()}
                        className="absolute z-20 right-4 top-20 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
                        >
                            <BiChevronUp size={30} color="fff" />
                        </button>
                    </div>

                    <img 
                    src="/images/tiktok-logo-small.png" 
                    alt="image" 
                    width={45}
                    className="absolute z-20 top-[18px] left-[70px] rounded-full lg:mx-0 mx-auto "
                    />
                    <ClientOnly>
                        {
                            postById?.video_url ? (
                                <>
                                 <video 
                                  src={useCreateBucketUrl(postById?.video_url)}
                                  className="fixed object-cover w-full my-auto z-[0] h-screen "

                                 />
                                </>
                            ) 
                            : null
                        }

                        <div className="bg-black bg-opacity-70 lg:min-w-[480px] z-10 relative ">
                            { postById?.video_url ? (<>
                             <video 
                              autoPlay
                              loop
                              muted
                              controls
                              src={useCreateBucketUrl(postById?.video_url)}
                              className="h-screen mx-auto"
                             />
                            </>) : null }
                        </div>
                    </ClientOnly>
                </div>

                <div id="InfoSection"
                className="lg:max-w-[550px] relative w-full h-full bg-white "
                >
                    <div className="py-7" />
                    <ClientOnly>
                        {
                         postById?.video_url ? (<>
                          <CommentsHeader post={postById} params={params} />
                         </>) : null
                        }
                    </ClientOnly>
                    <Comments params={params} />
                </div>
            </div>
        </>
    )
}