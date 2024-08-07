import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { ChangeEvent } from "react";

type StringHashMap = {
    [key: string]: string;
};

const SortMenu = ({ setSortProperty }: { setSortProperty: (value: string) => void }) => {
    const handleChange = (event: ChangeEvent<{ value: string }>) => {
        setSortProperty(event.target.value);
    };

    const renderSelectedValue = (value: string) => {
        const mapping: StringHashMap = {
            title: "Title",
            time: "Time",
            likeCount: "Number of Likes",
            commentCount: "Number of Comments",
        };

        if (!mapping[value]) {
            return "None";
        }
        return mapping[value];
    };

    return (
        <div>
            <FormControl
                variant="standard"
                htmlFor="uncontrolled-native"
                sx={{
                    m: 1,
                    minWidth: 200,
                    border: "1px solid rgba(255, 255, 255, 0.87)",
                    borderRadius: "4px",
                    padding: "4px",
                    ".MuiInputLabel-root": {
                        color: "rgba(255, 255, 255, 0.87)",
                        fontSize: "20px",
                        marginTop: "4px",
                        marginLeft: "10px",
                    },
                }}
            >
                <InputLabel sx={{ marginBottom: "4px" }}>Sort by</InputLabel>
                <Select
                    onChange={handleChange}
                    label="Sort by"
                    displayEmpty
                    defaultValue={"None"}
                    renderValue={(selected) => {
                        return (
                            <span style={{ color: "white", marginTop: "4px", marginLeft: "8px" }}>
                                {renderSelectedValue(selected)}
                            </span>
                        );
                    }}
                >
                    <MenuItem value="title">Title</MenuItem>
                    <MenuItem value="time">Time</MenuItem>
                    <MenuItem value="likeCount">Number of Likes</MenuItem>
                    <MenuItem value="commentCount">Number of Comments</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

export default SortMenu;
