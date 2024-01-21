import { convertTime } from "@/utils/clientUtils";
import Image from "next/image";

import LikeButton from "../buttons/LikeButton";
import ViewCommentsButton from "../buttons/ViewCommentsButton";

interface PostProps {
    postId: string;
    title: string;
    content: string;
    // image: string;
    time: Date;
    username: string;
    likeCount: number;
    commentCount: number;
}

const Post = ({
    postId,
    title,
    content,
    time,
    username,
    likeCount,
    commentCount,
}: PostProps) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white ring-2 ring-purple-200 rotate-3d rotate-x-30 rotate-y-30 rotate-z-30 perspective-500">
            {/* <Image className="w-full" src="/img/card-top.jpg" alt="" /> */}
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-blue-600">
                    {title}
                </div>
                <p className="text-gray-700 text-base mb-2">{content}</p>
                <p className="text-gray-700 text-base mb-2">
                    {" "}
                    {`Posted by ${username} on ${convertTime(time)}`}
                </p>
                <div className="flex flex-row">
                    <LikeButton likeCount={likeCount} />
                    <ViewCommentsButton
                        commentCount={commentCount}
                        url={`/forum/view-post/${postId}`}
                    />
                </div>
            </div>
        </div>
    );
};

export default Post;
