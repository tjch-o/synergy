interface LoginButtonProps {
    onClick: () => void;
    disabled: boolean;
}

const LoginButton = ({ onClick, disabled }: LoginButtonProps) => {
    return (
        <button
            type="submit"
            className="block font-2xl py-2 px-4 ml-4 bg-blue-800 text-white rounded shadow-md"
            onClick={onClick}
            disabled={disabled}
        >
            Login
        </button>
    );
};

export default LoginButton;
