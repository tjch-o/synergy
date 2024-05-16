import { convertTime } from "@/utils/clientUtils";

interface CommentProps {
    content: string;
    username: string;
    time: string;
}

const Comment = ({ content, username, time }: CommentProps) => {
    console.log(time);
    return (
        <div className="inline-block min-w-max max-w-full rounded opacity-75 bg-violet-800 py-4 my-4">
            <p className="text-md text-white pb-2 px-4">{content}</p>
            <p className="text-sm text-pink-400 px-4">
                Posted by {username} at {convertTime(time)}{" "}
            </p>
        </div>
    );
};

export default Comment;
