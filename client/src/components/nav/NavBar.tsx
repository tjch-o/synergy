import NavBarLogo from "../logos/NavBarLogo";
import AccountMenu from "../menus/AccountMenu";

interface NavBarProps {
    username: string;
    onCreatePost: () => void;
    onDeleteAccount: () => void;
    onLogout: () => void;
}

const NavBar = ({ username, onCreatePost, onDeleteAccount, onLogout }: NavBarProps) => {
    return (
        <nav className="flex items-center justify-between opacity-75 bg-black p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <NavBarLogo />
            </div>
            <div className="text-white text-lg">
                <AccountMenu
                    username={username}
                    onCreatePost={onCreatePost}
                    onDeleteAccount={onDeleteAccount}
                    onLogout={onLogout}
                />
            </div>
        </nav>
    );
};

export default NavBar;
