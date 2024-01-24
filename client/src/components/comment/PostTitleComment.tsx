import { convertTime } from "@/utils/clientUtils";

interface PostTitleCommentProps {
    title: string;
    content: string;
    username: string;
    time: string;
}

const PostTitleComment = ({
    title,
    content,
    username,
    time,
}: PostTitleCommentProps) => {
    return (
        <div>
            <h1>{title}</h1>
            <p>{content}</p>
            <p className="text-sm text-white">Posted by {username} at {convertTime(time)} </p>
        </div>
    );
};

export default PostTitleComment;
