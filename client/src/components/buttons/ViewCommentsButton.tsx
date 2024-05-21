import CommentIcon from "@mui/icons-material/Comment";
import Link from "next/link";

interface CommentButtonProps {
    commentCount: number;
    postId: string;
}

const ViewCommentsButton = ({ commentCount, postId }: CommentButtonProps) => {
    const url = `/posts/view-post/${postId}`;

    return (
        <div className="flex flex-row p-2">
            <Link href={url}>
                <CommentIcon fontSize="medium" />
            </Link>
            <p className="pl-1">{commentCount}</p>
        </div>
    );
};

export default ViewCommentsButton;
