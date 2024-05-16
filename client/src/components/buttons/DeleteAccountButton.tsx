import DeleteIcon from "@mui/icons-material/Delete";

interface DeleteAccountButtonProps {
    onClick: () => void;
}

const DeleteAccountButton = ({ onClick }: DeleteAccountButtonProps) => {
    return (
        <div className="hover:opacity-50">
            <button
                className="bg-[#603fef] py-2 px-4 rounded text-white"
                onClick={onClick}
            >
                <DeleteIcon fontSize="medium" />
                &nbsp; Delete Account
            </button>
        </div>
    );
};

export default DeleteAccountButton;
