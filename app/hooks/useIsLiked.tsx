
import { Like } from "../types/types";

const useIsLiked = (userId: string, postId: string, likes: Array<Like>) => {

    let res: Like[] = [];

    try {
        likes?.forEach((like) => {
            if(like?.user_id == userId && like.post_id == postId) {
                res.push(like);
            }
        });

        if(typeof res == undefined) return;

        return res.length > 0 

    } catch (error) {
        throw error
    }
}

export default useIsLiked;