import { useUser } from "@/app/context/userContext";
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";
import useDeleteComment from "@/app/hooks/useDeleteComment";
import { useCommentStore } from "@/app/stores/comment";
import { SingleCommentCompTypes } from "@/app/types/types";
import moment from "moment";
import Link from "next/link";
import { useCallback, useState } from "react";
import { BiLoaderCircle, BiTrash } from "react-icons/bi";


export default function SingleComment({ comment, params }: SingleCommentCompTypes) {

    const [isDeleting, setIsDeleting] = useState(false);

    const contextUser = useUser();
    const { setCommentsByPost } = useCommentStore();

    const handleDeleteComment = async () => {
        let res = confirm("Are you sure you want to delete this comment?");
        if(!res) return;

        try {
            setIsDeleting(true);
            await useDeleteComment(comment?.id);
            setCommentsByPost(params?.postId);
            setIsDeleting(false)
        } catch (error) {
            alert(error);
        }

    }

    return (
        <>
            <div 
            id="SingleComment" 
            className="flex items-center justify-between px-8 mt-4"
            >
              <div className="flex items-center relative w-full">
                <Link href={`/profile/${comment?.profile?.user_id}`} >
                    <img 
                    src={useCreateBucketUrl(comment?.profile?.image)}
                    alt="profile-image" 
                    width={40}
                    className="absolute top-0 rounded-full lg:max-0 mx-auto"
                    />
                </Link>
                <div className="ml-14 pt-0 5 w-full">
                    <div className="text-[18px] font-semibold flex items-center justify-between ">
                        <span className="flex items-center">
                            {comment?.profile?.name} - 
                            <span className="text-[12px] text-gray-600 font-light ml-1">
                                {moment(comment?.created_at).calendar()}
                            </span>
                        </span>

                        {
                            contextUser?.user?.id == comment?.profile?.user_id ? 
                            (<>
                            <button
                             disabled={isDeleting}
                             onClick={handleDeleteComment}

                            >
                                {isDeleting 
                                ? <BiLoaderCircle size={20} color="#e91e62" className="animate-spin" /> 
                                : <BiTrash size={25} className="cursor-pointer" />  
                                }
                            </button>
                            </>) 
                            : null
                        }
                    </div>
                    <p className="text-[15px] font-light ">
                        {comment?.text}
                    </p>
                </div>
              </div>
            </div>
        </>
    )
}