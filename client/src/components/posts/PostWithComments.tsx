// import Comment from "@/components/comments/Comment";

// import PostTitleComment from "../comments/PostTitleComment";

// interface PostWithCommentsProps {
//     title: string;
//     content: string;
//     username: string;
//     time: string;
//     comments: Array;
// }

// const PostWithComments = ({
//     title,
//     content,
//     username,
//     time,
//     comments,
// }: PostWithCommentsProps) => {
//     return (
//         <div>
//             <PostTitleComment
//                 title={title}
//                 content={content}
//                 username={username}
//                 time={time}
//             />
//             <div>
//                 {comments.map((comment) => (
//                     <div key={comment._id}>
//                         <Comment
//                             username={comment.username}
//                             content={comment.content}
//                             time={comment.time}
//                         />
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default PostWithComments;
