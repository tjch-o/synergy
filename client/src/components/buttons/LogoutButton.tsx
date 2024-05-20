"use client";

import LogoutIcon from "@mui/icons-material/Logout";

interface LogoutButtonProps {
    onClick: () => void;
}

const LogoutButton = ({ onClick }: LogoutButtonProps) => {
    return (
        <div className="hover:opacity-50">
            <button className="bg-[#603fef] py-2 px-4 rounded text-white" onClick={onClick}>
                <LogoutIcon fontSize="medium" />
                &nbsp; Logout
            </button>
        </div>
    );
};

export default LogoutButton;
