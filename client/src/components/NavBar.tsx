import NavBarLogo from "./Logo/NavBarLogo";

const NavBar = () => {
    return (
        <nav className="flex items-center justify-between flex-wrap bg-black p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <NavBarLogo />
            </div>
        </nav>
    );
};

export default NavBar;
