import { getFormattedTime } from "@/utils/formatTime";

import DeleteCommentButton from "../buttons/DeleteCommentButton";

interface CommentProps {
    commentId: string;
    content: string;
    username: string;
    time: string;
    isOwner: boolean;
}

const Comment = ({ commentId, content, username, time, isOwner }: CommentProps) => {
    return (
        <div className="inline-block min-w-max max-w-full rounded opacity-75 bg-violet-800 mx-4 py-4 my-4">
            <p className="text-md text-white pb-2 px-4">{content}</p>
            <div className="flex justify-between items-center space-x-2">
            <p className="text-sm text-cyan-400 px-4">
                Posted by {username} at {getFormattedTime(time)}{" "}
            </p>
            <DeleteCommentButton commentId={commentId} isOwner={isOwner} />
            </div>
            
        </div>
    );
};

export default Comment;
