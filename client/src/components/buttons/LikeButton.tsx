import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

interface LikeButtonProps {
    likeCount: number;
    status: boolean;
    onClick: () => void;
}

const LikeButton = ({ likeCount, status, onClick }: LikeButtonProps) => {
    return (
        <div className="flex flex-row p-2">
            {status ? (
                <ThumbUpAltIcon fontSize="medium" onClick={onClick} />
            ) : (
                <ThumbUpOffAltIcon fontSize="medium" onClick={onClick} />
            )}
            <p className="pl-1">{likeCount}</p>
        </div>
    );
};

export default LikeButton;
