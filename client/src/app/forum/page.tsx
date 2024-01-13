"use client";

import CreatePostButton from "@/components/CreatePostButton/CreatePostButton";
import NavBar from "@/components/NavBar/NavBar";
import Post from "@/components/Post/Post";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ForumPage = () => {
    const [posts, setPosts] = useState([]);
    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");

    const router = useRouter();

    useEffect(() => {
        if (typeof window === "undefined") return;
        const localUserId = window.localStorage.getItem("userId");
        const localUsername = window.localStorage.getItem("username");
        setUserId(localUserId);
        setUsername(localUsername);
    });

    useEffect(() => {
        const fetchPostsData = async () => {
            const res = await axios.get("http://localhost:5000/fetch-posts");
            setPosts(res.data.posts);
            fetchPostsData();
        };

        fetchPostsData();
    }, []);

    const onClick = () => {
        router.push(`/forum/create-post/${userId}`);
    };

    return (
        <div
            className="bg-fixed bg-center bg-cover h-screen"
            style={{ backgroundImage: "url('./bg.jpg')" }}
        >
            <NavBar />
            <h1 className="text-3xl text-center m-4 text-white">
                Discussion Posts
            </h1>
            <div className="grid grids-col-1 md:grids-cols-3 lg:grid-cols-4 gap-2 p-4">
                {posts.map((post, index) => {
                    return (
                        <Post
                            key={index}
                            title={post.title}
                            content={post.content}
                            time={post.time}
                            username={username}
                            likeCount={post.likeCount}
                            commentCount={post.commentCount}
                            comments={post.comments}
                        />
                    );
                })}
            </div>
            <CreatePostButton onClick={onClick} />
        </div>
    );
};

export default ForumPage;
