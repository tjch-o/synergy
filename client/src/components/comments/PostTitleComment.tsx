import { convertTime } from "@/utils/clientUtils";

interface PostTitleCommentProps {
    title: string;
    content: string;
    username: string;
    time: string;
}

const PostTitleComment = ({ title, content, username, time }: PostTitleCommentProps) => {
    return (
        <div className="inline-block min-w-max max-w-full rounded opacity-75 bg-blue-700 py-4 my-4">
            <h1 className="text-xl text-white pb-2 px-4">{title}</h1>
            <p className="text-md text-white pb-2 px-4">{content}</p>
            <p className="text-sm text-pink-400 px-4">
                Posted by {username} at {convertTime(time)}{" "}
            </p>
        </div>
    );
};

export default PostTitleComment;
