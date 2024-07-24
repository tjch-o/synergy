import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { ChangeEvent } from "react";

const SortMenu = ({ setSortProperty }: { setSortProperty: (value: string) => void }) => {
    const handleChange = (event: ChangeEvent<{ value: string }>) => {
        setSortProperty(event.target.value);
    };

    return (
        <FormControl
            variant="standard"
            htmlFor="uncontrolled-native"
            sx={{
                m: 1,
                minWidth: 200,
                ".MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.87)", fontSize: "20px" },
            }}
        >
            <InputLabel>Sort by</InputLabel>
            <Select onChange={handleChange} label="Sort by" displayEmpty defaultValue={"None"}>
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="time">Time</MenuItem>
                <MenuItem value="likeCount">Likes</MenuItem>
                <MenuItem value="commentCount">Comments</MenuItem>
            </Select>
        </FormControl>
    );
};

export default SortMenu;
