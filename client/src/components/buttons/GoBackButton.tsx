import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

interface GoBackButtonProps {
    onClick: () => void;
}

const GoBackButton = ({ onClick }: GoBackButtonProps) => {
    return (
        <div className="mx-4 hover:opacity-50">
            <button className="bg-[#603fef] py-2 px-4 rounded text-white" onClick={onClick}>
                <ArrowLeftIcon fontSize="medium" />
                Return to forum
            </button>
        </div>
    );
};

export default GoBackButton;
