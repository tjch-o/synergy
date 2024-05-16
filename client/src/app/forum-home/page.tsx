"use client";

import axios from "axios";

const ForumHomePage = () => {
    console.log(window.sessionStorage.getItem("token"));

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

    return <p> you made it! :D </p>;
};

export default ForumHomePage;
