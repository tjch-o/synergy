"use client";

import CreatePostButton from "@/components/buttons/CreatePostButton";
import LogoutButton from "@/components/buttons/LogoutButton";
import NavBar from "@/components/navbar/NavBar";
import Post from "@/components/post/Post";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ForumPage = () => {
    const [posts, setPosts] = useState([]);
    const [userId, setUserId] = useState("");

    const router = useRouter();

    // prevents too many re-renders
    useEffect(() => {
        if (typeof window === "undefined") return;
        const localUserId = window.localStorage.getItem("userId");
        setUserId(localUserId);
    }, []);

    useEffect(() => {
        const fetchPostsData = async () => {
            const res = await axios.get("http://localhost:5000/fetch-posts");
            setPosts(res.data.postsWithUsernames);
            fetchPostsData();
        };

        fetchPostsData();
    }, []);

    const onClickCreatePost = async () => {
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
                router.push("/login");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onClickLogout = async () => {
        try {
            router.push("/login");
            window.localStorage.removeItem("userId");
            window.localStorage.removeItem("token");
        } catch (error) {
            console.error(error);
        }
    };

    const isAuthenticated = window.localStorage.getItem("userId")
        ? true
        : false;

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
                {isAuthenticated ? (
                    posts.map((post, index) => {
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
                                postId={post.postId}
                            />
                        );
                    })
                ) : (
                    <p className="text-white">
                        Please login to see posts on this platform.
                    </p>
                )}
            </div>
            <CreatePostButton onClick={onClickCreatePost} />
            <LogoutButton onClick={onClickLogout} />
        </div>
    );
};

export default ForumPage;
