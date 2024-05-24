import AddCircleIcon from "@mui/icons-material/AddCircle";

interface CreateCommentButtonProps {
    isVisible?: boolean;
    onClick: () => void;
}

const CreateCommentButton = ({ isVisible, onClick }: CreateCommentButtonProps) => {
    return (
        <div className="hover:opacity-50">
            {isVisible ? (
                <button
                    className="py-2 px-4 rounded text-white"
                    style={{ color: "#000" }}
                    onClick={onClick}
                >
                    <AddCircleIcon fontSize="large" />
                </button>
            ) : null}
        </div>
    );
};

export default CreateCommentButton;
