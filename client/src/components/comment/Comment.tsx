import { convertTime } from "@/utils/clientUtils";

interface CommentProps {
    content: string;
    time: Date;
}

const Comment = ({ content, time }: CommentProps) => {
    return (
        <div>
            <p>{content}</p>
            <p>{convertTime(time)}</p>
        </div>
    );
};

export default Comment;
