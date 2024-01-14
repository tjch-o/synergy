"use client";

import NavBar from "@/components/NavBar/NavBar";
import Post from "@/components/Post/Post";
import CreatePostButton from "@/components/buttons/CreatePostButton";
import LogoutButton from "@/components/buttons/LogoutButton";
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
            setPosts(res.data.postsWithUsernames);
            fetchPostsData();
        };

        fetchPostsData();
    }, []);

    const onClick = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/access-create-post",
                {
                    validateStatus: (status) => {
                        return status < 500 || status == 401 || status == 403;
                    },
                },
            );
            console.log(res.status);
            if (res.status == 200) {
                router.push(`/forum/create-post/${userId}`);
            } else {
                router.push("/auth/login");
            }
        } catch (error) {
            console.log(error);
        }
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
                            username={post.username}
                            likeCount={post.likeCount}
                            commentCount={post.commentCount}
                            comments={post.comments}
                        />
                    );
                })}
            </div>
            <CreatePostButton onClick={onClick} />
            <LogoutButton />
        </div>
    );
};

export default ForumPage;
