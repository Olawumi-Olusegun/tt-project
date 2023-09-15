
import { database, storage } from '@/libs/AppWriteClient'
import useGetLikesByPostId from './useGetLikesByPostId';
import useDeleteLike from './useDeleteLike';
import useDeleteComment from './useDeleteComment';
import useGetCommentsByPostId from './useGetCommentsByPostId';

const useDeletePostById = async (postId: string, currentImage: string) => {

    try {

        const likes = await useGetLikesByPostId(postId);

        likes.forEach(async (like) => {
            await useDeleteLike(like?.id)
        });

        const coments = await useGetCommentsByPostId(postId);

        coments.forEach(async (comment) => {
            await useDeleteComment(comment?.id)
        });

        await database.deleteDocument(
            String(process.env.NEXT_PUBLIC_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_POST),
            postId,
        );

        await storage.deleteFile(
            String(process.env.NEXT_PUBLIC_BUCKET_ID),
            currentImage,
        );

        
        
    } catch (error) {
        throw error;
    }
}

export default useDeletePostById