import Comment from "@/components/comment/Comment";
import { convertTime } from "@/utils/clientUtils";

interface PostWithCommentsProps {
    title: string;
    content: string;
    time: Date;
    comments: Array;
}

const PostWithComments = ({
    title,
    content,
    time,
    comments,
}: PostWithCommentsProps) => {
    return (
        <div>
            <h1>{title}</h1>
            <p>{content}</p>
            <p>{convertTime(time)}</p>
        </div>
    );
};

export default PostWithComments;
