import { convertTime } from "@/utils/clientUtils";

interface CommentProps {
    content: string;
    username: string;
    time: string;
}

const Comment = ({ content, username, time }: CommentProps) => {
    console.log(time);
    return (
        <div>
            <p>{content}</p>
            <p>{username}</p>
            <p>{convertTime(time)}</p>
        </div>
    );
};

export default Comment;
