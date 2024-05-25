import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import axios from "axios";

interface DeleteCommentButtonProps {
    isOwner: boolean;
    commentId: string;
}

const DeleteCommentButton = ({ isOwner, commentId }: DeleteCommentButtonProps) => {
    const handleDeletePost = async () => {
        try {
            const res = await axios.delete(`http://localhost:5000/comment/${commentId}`, {
                data: { username: window.localStorage.getItem("username") },
            });

            if (res.status === 200) {
                console.log(res.data.message);
            } else {
                console.log(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return isOwner ? (
        <div className="text-white">
            <Button onClick={handleDeletePost} sx={{ color: "#fff" }}>
                <DeleteIcon fontSize="medium" />
            </Button>
        </div>
    ) : null;
};

export default DeleteCommentButton;
