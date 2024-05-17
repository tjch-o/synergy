"use client";

import CreatePostButton from "@/components/buttons/CreatePostButton";
import DeleteAccountButton from "@/components/buttons/DeleteAccountButton";
import LogoutButton from "@/components/buttons/LogoutButton";
import NavBar from "@/components/nav/NavBar";
import Post from "@/components/posts/Post";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
        <p>
            you made it! welcome {window.sessionStorage.getItem("username")} :D
        </p>
    );
};

export default ForumHomePage;
