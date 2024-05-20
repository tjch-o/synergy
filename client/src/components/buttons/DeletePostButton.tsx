import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import axios from 'axios';

interface LikeButtonProps {
    isOwner: boolean;
    postId: string;
}

const LikeButton = ({ isOwner, postId }: LikeButtonProps) => {
    const handleDeletePost = async () => {
        try {
            const res = await axios.delete(`http://localhost:5000/post/${postId}`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`
                }, 
                data : {"username": window.localStorage.getItem("username")}
            });

            console.log(res.status)

            if (res.status === 200) {
                console.log(res.data.message);
            } else {
                console.log(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        isOwner ? (
            <div className="text-sky-200 flex flex-row">
                <Button onClick={handleDeletePost} sx={{color: '#c0e8e8'}}>
                    <DeleteIcon fontSize="medium" />
                </Button>
            </div>
        ) : null
    )
};

export default LikeButton;