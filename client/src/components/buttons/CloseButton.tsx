import CloseIcon from "@mui/icons-material/Close";

interface CreateCommentButtonProps {
    onClick: () => void;
}

const CloseButton = ({ onClick }: CreateCommentButtonProps) => {
    return (
        <div className="hover:opacity-50">
            <button
                className="py-2 px-4 rounded text-white"
                style={{ color: "#000" }}
                onClick={onClick}
            >
                <CloseIcon fontSize="large" />
            </button>
        </div>
    );
};

export default CloseButton;
