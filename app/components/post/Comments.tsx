
import React, { useCallback, useState } from "react";
import { CommentsCompTypes } from "@/app/types/types";
import ClientOnly from "../ClientOnly";
import SingleComment from "./SingleComment";
import { BiLoaderCircle } from "react-icons/bi";
import { useCommentStore } from "@/app/stores/comment";
import { useGeneralStore } from "@/app/stores/general";
import { useUser } from "@/app/context/userContext";
import useCreateComment from "@/app/hooks/useCreateComment";

export default function Comments({ params }: CommentsCompTypes) {

    const [comment, setComment] = useState('');
    const [inputFocused, setInputFocused] = useState(false);
    const [isUploadLoading, setIsUploadLoading] = useState(false);

    const { commentsByPost, setCommentsByPost } = useCommentStore();
    const { setIsLoginOpen } = useGeneralStore();
    const contextUser = useUser();

    const handleAddComment = async () => {
        if(!contextUser?.user) {
            return setIsLoginOpen(true);
        }

        try {
            setIsUploadLoading(true);
            await useCreateComment(
                contextUser?.user?.id,
                params?.postId,
                comment
            );

            setCommentsByPost(params?.postId);
            setComment('')
            setIsUploadLoading(false);
        } catch (error) {
            alert(error)
            throw error;
        }
    }


//     const commentsByPost = [
//         { 
//         id: "123",
//         user_id: "456",
//         post_id: '123',
//         text: "This is a video text",
//         created_at: "13 June 2023",
//         profile: {
//           user_id: "456",
//           name: "Mark",
//           image: "https://placehold.co/100"
//         },
//     },
//         { 
//         id: "1234",
//         user_id: "456",
//         post_id: '123',
//         text: "This is a video text",
//         created_at: "13 June 2023",
//         profile: {
//           user_id: "456",
//           name: "Mark",
//           image: "https://placehold.co/100"
//         },
//     },
//         { 
//         id: "1235",
//         user_id: "456",
//         post_id: '123',
//         text: "This is a video text",
//         created_at: "13 June 2023",
//         profile: {
//           user_id: "456",
//           name: "Mark",
//           image: "https://placehold.co/100"
//         },
//     },

// ];


    return (
        <>
        <div 
        id="Comments" 
        className="relative bg-[#f8f8f8] z-0 w-full h-[calc(100%_-_273px)] border-t-2 overflow-auto "
        >
            <div className="pt-2" />
            <ClientOnly>
                {
                    commentsByPost?.length < 1
                    ? (<>
                     <div className="text-center mt-6 text-xl text-gray-500">
                        No comments...
                     </div>
                    </>) 
                    : (<>
                     <div>
                        {commentsByPost?.map((comment) => (
                            <SingleComment 
                            key={comment?.id} 
                            comment={comment} 
                            params={params} 
                            />
                        ))}
                     </div>
                    </>)
                }
            </ClientOnly>

            <div className="mb-28" />

        </div>

        <div id="CreateComment" className="absolute flex items-center justify-between bottom-0 bg-white h-[85px] lg:max-w-[550px] w-full py-5 px-8 border-t-2  ">
            <div className={`
             bg-[#f1f1f2]
             flex
             items-center
             rounded-lg
             w-full
             lg:max-w-[420px]
             ${inputFocused ? "border-2 border-gray-400" : "border-2 border-[#f1f1f2]" }
            `}>
                <input 
                type="text"
                maxLength={1000}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                onChange={(event) => setComment(event.target.value)}
                value={comment}
                placeholder="Add comment..."
                className="bg-[#f1f1f2] text-[14px] focus:outline-none w-full lg:max-w-[420px] p-2 rounded-lg "
                />
            </div>
            {
                !isUploadLoading ? (<>
                  <button 
                   disabled={!comment}
                   onClick={handleAddComment}
                   className={`font-semibold text-sm ml-5 pr-1
                     ${comment ? "text-[#f02c56] cursor-pointer" : "text-gray-400" }
                   `}
                  >
                    Post
                  </button>
                </>) : (<>
                 <BiLoaderCircle size={20} className="animate-spin" color="#e91e62" />
                </>)
            }
        </div>
        </>
    )
}