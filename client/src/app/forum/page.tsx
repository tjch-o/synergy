"use client";

import CreatePostButton from "@/components/CreatePostButton/CreatePostButton";
import NavBar from "@/components/NavBar";
import Post from "@/components/Post/Post";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ForumPage = () => {
    const [posts, setPosts] = useState([]);

    const userId = window.localStorage.getItem("userId");
    const router = useRouter();

    // useEffect();

    const onClick = () => {
        router.push(`/forum/create-post/${userId}`);
    };

    return (
        <div>
            <NavBar />
            <h1 className="text-3xl text-center m-4">Discussion Posts</h1>
            <div>
                {/* {posts.map((post) => {
                return ()
                })} */}
            </div>
            <CreatePostButton onClick={onClick} />
        </div>
    );
};

export default ForumPage;
