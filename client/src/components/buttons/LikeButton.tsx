import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { useState } from "react";

interface LikeButtonProps {
    likeCount: number;
}

const LikeButton = ({ likeCount }: LikeButtonProps) => {
    return (
        <div className="flex flex-row p-2">
            <ThumbUpOffAltIcon fontSize="medium" />
            <p className="pl-1">{likeCount}</p>
        </div>
    );
};

export default LikeButton;
