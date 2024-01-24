import Comment from "@/components/comment/Comment";

import PostTitleComment from "../comment/PostTitleComment";

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
            <PostTitleComment
                title={title}
                content={content}
                username={username}
                time={time}
            />
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
