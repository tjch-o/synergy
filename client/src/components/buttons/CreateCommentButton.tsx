import AddCircleIcon from "@mui/icons-material/AddCircle";

interface CreateCommentButtonProps {
    onClick: () => void;
}

const CreateCommentButton = ({ onClick }: CreateCommentButtonProps) => {
    return (
        <div className="hover:opacity-50">
            <button
                className="py-2 px-4 rounded text-white"
                style={{ color: "#000" }}
                onClick={onClick}
            >
                <AddCircleIcon fontSize="large" />
            </button>
        </div>
    );
};

export default CreateCommentButton;
