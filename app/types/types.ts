
export interface UserContextTypes  {
    user: User | null;
    register: (name: string, email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    checkUser: () => Promise<void>;
}

export interface User  {
    id: string;
    name: string;
    bio: string;
    image: string;
}

export interface Profile  {
    id: string;
    user_id: string;
    name: string;
    bio: string;
    image: string;
}

export interface UploadError  {
    type: string;
    message: string;
}

export interface MenuItemstypes  {
    iconString: string;
    colorString: string;
    sizeString: string;
}

export interface RandomUsers {
    id: string;
    name: string;
    image: string;
}

export interface PostWithProfile {
    id: string;
    user_id: string;
    video_url: string;
    text: string;
    created_at: string;
    profile: {
        user_id: string;
        name: string;
        image: string;
    }
}

export interface CommentWithProfile {
    id: string;
    user_id: string;
    post_id: string;
    text: string;
    created_at: string;
    profile: {
        user_id: string;
        name: string;
        image: string;
    }
}


export interface Post {
    id: string;
    user_id: string;
    video_url: string;
    text: string;
    created_at: string;
}

export interface Like {
    id: string;
    user_id: string;
    post_id: string;
}

export interface Comment {
    id: string;
    user_id: string;
    post_id: string;
}

export interface ProfilePageTypes {
    params: { profileId: string }
}



export interface ShowErrorObject {
    type?: string;
    message: string;
}


export interface CropperDimensions {
    height?: number | null;
    width?: number | null;
    left?: number | null;
    top?: number | null;
}

export interface MenuItemCompTypes {
    user: RandomUsers;

}

export interface PostMainCompTypes {
    post: PostWithProfile;
}

export interface PostUserCompTypes {
    post: Post;
}

export interface PostMainLikesCompTypes {
    post: PostWithProfile;
}

export interface TextInputCompTypes {
    string: string;
    inputType: string;
    placeholder: string;
    onUpdate: (newValue: string) => void;
    error: string;
}

export interface CommentsHeaderCompTypes {
    params: {
        userId: string;
        postId: string;
    };
    post: PostWithProfile;
}

export interface PostPageTypes {
    params: {
        userId: string;
        postId: string;
    }
}

export interface CommentsCompTypes {
    params: {
        userId: string;
        postId: string;
    }
}

export interface SingleCommentCompTypes {
    comment: CommentWithProfile;
    params: {
        userId: string;
        postId: string;
    }
}