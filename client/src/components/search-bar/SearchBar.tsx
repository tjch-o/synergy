import { ChangeEvent } from "react";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };

    const placeholder = "Search for a title, content or author of a post.";

    return (
        <div className="flex justify-center items-center my-4">
            <input
                className="border rounded"
                type="text"
                placeholder={placeholder}
                onChange={handleSearch}
                style={{ width: "400px" }}
            />
        </div>
    );
};

export default SearchBar;
