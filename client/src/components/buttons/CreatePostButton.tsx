import PostAddIcon from "@mui/icons-material/PostAdd";

interface CreatePostButtonProps {
    onClick: () => void;
}

const CreatePostButton = ({ onClick }: CreatePostButtonProps) => {
    return (
        <div className="hover:opacity-50">
            <button className="bg-[#603fef] py-2 px-4 rounded text-white" onClick={onClick}>
                <PostAddIcon fontSize="medium" />
                &nbsp; Add Post
            </button>
        </div>
    );
};

export default CreatePostButton;
