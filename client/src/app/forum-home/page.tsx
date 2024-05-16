"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const ForumHomePage = () => {

    // try {
    //     const res = await axios.get("http://localhost:5000/auth", {
    //         headers: {
    //             Authorization: `Bearer ${window.sessionStorage.getItem("token")}`
    //         }
    //     })
    //     console.log(res.status)
    // } catch (error) {
    //     console.log(error)
    // }

    return (
        <p>you made it! welcome {window.sessionStorage.getItem("username")} :D</p>
    );
};

export default ForumHomePage;
