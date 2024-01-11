import Image from "next/image";

import CommentButton from "../CommentButton/CommentButton";
import LikeButton from "../LikeButton/LikeButton";

interface PostProps {
    title: string;
    content: string;
    // image: string;
    time: Date;
    username: string;
    likeCount: number;
    commentCount: number;
}

const Post = ({
    title,
    content,
    time,
    username,
    likeCount,
    commentCount,
}: PostProps) => {
    const convertTime = (time: Date) => {
        return new Date(time).toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        });
    };

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            {/* <Image className="w-full" src="/img/card-top.jpg" alt="" /> */}
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base mb-2">{content}</p>
                <p className="text-gray-700 text-base mb-2">
                    {" "}
                    {`Posted by ${username} on ${convertTime(time)}`}
                </p>
                <div className="flex flex-row">
                    <LikeButton likeCount={likeCount} />
                    <CommentButton commentCount={commentCount} />
                </div>
            </div>
        </div>
    );
};

export default Post;
