import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";

interface LikeButtonProps {
    postId: string;
    likeCount: number;
    status: boolean;
}

const LikeButton = ({ postId, likeCount, status }: LikeButtonProps) => {
    const [likeStatus, setLikeStatus] = useState(status);
    const username = Cookies.get("username");
    // const username = localStorage.getItem("username");

    const onClickLike = async (postId: string, likeStatus: boolean) => {
        if (likeStatus == false) {
            try {
                const res = await axios.post(
                    `http://localhost:5000/post/like/${postId}`,
                    { username: username },
                    {
                        validateStatus: (status) => status >= 200 && status <= 500,
                        withCredentials: true,
                    },
                );

                if (res.status == 200) {
                    setLikeStatus(true);
                } else {
                    console.log(res.data.message);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const res = await axios.delete(`http://localhost:5000/post/like/${postId}`, {
                    data: { username: username },
                });

                if (res.status == 200) {
                    setLikeStatus(false);
                } else {
                    console.log(res.data.message);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="flex flex-row p-2">
            {likeStatus ? (
                <ThumbUpAltIcon fontSize="medium" onClick={() => onClickLike(postId, likeStatus)} />
            ) : (
                <ThumbUpOffAltIcon
                    fontSize="medium"
                    onClick={() => onClickLike(postId, likeStatus)}
                />
            )}
            <p className="pl-1">{likeCount}</p>
        </div>
    );
};

export default LikeButton;
