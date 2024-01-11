import CreatePostIcon from "./CreatePostIcon";

interface CreatePostButtonProps {
    onClick: () => void;
}

const CreatePostButton = ({ onClick }: CreatePostButtonProps) => {
    return (
        <div>
            <button
                className="bg-[#603fef] py-2 px-4 rounded text-white"
                onClick={onClick}
            >
                <CreatePostIcon />
                &nbsp; Add Post
            </button>
        </div>
    );
};

export default CreatePostButton;
