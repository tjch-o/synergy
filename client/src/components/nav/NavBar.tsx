import NavBarLogo from "../logos/NavBarLogo";

interface NavBarProps {
    username: string;
}

const NavBar = ({ username }: NavBarProps) => {
    return (
        <nav className="flex items-center justify-between opacity-75 bg-black p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <NavBarLogo />
            </div>
            <div className="text-white text-lg">
                <p> welcome {username} </p>
            </div>
        </nav>
    );
};

export default NavBar;
