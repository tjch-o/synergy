import CommentIcon from "@mui/icons-material/Comment";

interface CommentButtonProps {
    commentCount: number;
    comments: Array;
}

const CommentButton = ({ commentCount, comments }: CommentButtonProps) => {
    return (
        <div className="flex flex-row p-2">
            <CommentIcon fontSize="medium" />
            <p className="pl-1">{commentCount}</p>
        </div>
    );
};

export default CommentButton;
