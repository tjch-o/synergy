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
        <div className="max-w-sm rounded-md overflow-hidden text-sky-200 border-2 border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]">
            {/* <Image className="w-full" src="/img/card-top.jpg" alt="" /> */}
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-blue-600">
                    {title}
                </div>
                <p className="text-gray-700 text-white mb-2">{content}</p>
                <p className="text-gray-700 text-base mb-2 font-semi-bold">
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
