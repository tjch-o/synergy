import Comment from "@/components/comment/Comment";
import { convertTime } from "@/utils/clientUtils";

interface PostWithCommentsProps {
    title: string;
    content: string;
    username: string;
    time: string;
    comments: Array;
}

const PostWithComments = ({
    title,
    content,
    username,
    time,
    comments,
}: PostWithCommentsProps) => {
    return (
        <div>
            <h1>{title}</h1>
            <p>{content}</p>
            <p>{username}</p>
            <p>{convertTime(time)}</p>
            <div>
                {comments.map((comment) => (
                    <Comment
                        key={comment._id}
                        username={comment.username}
                        content={comment.content}
                        time={comment.time}
                    />
                ))}
            </div>
        </div>
    );
};

export default PostWithComments;
