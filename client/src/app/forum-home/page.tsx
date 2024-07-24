"use client";

import CreatePostButton from "@/components/buttons/CreatePostButton";
import NavBar from "@/components/nav/NavBar";
import Post from "@/components/posts/Post";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, ChangeEvent } from "react";
import { sortByProperty } from "@/utils/sort";
import SortMenu from "@/components/menus/SortMenu"
import { Sort } from "@mui/icons-material";

const ForumHomePage = () => {
    const [posts, setPosts] = useState([]);
    const [sortProperty, setSortProperty] = useState("");

    const token = window.localStorage.getItem("token");
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    const username = window.localStorage.getItem("username");
    const router = useRouter();

    const fetchPostsData = async () => {
        const res = await axios.get("http://localhost:5000/forum-posts");
        if (sortProperty != "") {
            res.data.posts = sortByProperty(res.data.posts, sortProperty);
        }
        setPosts(res.data.posts);
    };

    useEffect(() => {
        fetchPostsData();
    }, [posts]);

    const onClickCreatePost = () => {
        router.push("/posts/create-post");
    };

    const onClickDeleteAccount = async () => {
        try {
            const res = await axios.get("http://localhost:5000/auth");

            if (res.status == 200) {
                router.push("/delete-account");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onClickLogout = async () => {
        try {
            const res = await axios.post("http://localhost:5000/logout");

            if (res.status == 200) {
                window.localStorage.removeItem("token");
                window.localStorage.removeItem("username");
                router.push("/login");
            } else {
                console.log(res);
            }
        } catch {
            console.log("Failed to logout.");
        }
    };

    return (
        <div className="bg-fixed bg-center bg-cover h-screen">
            <div className="fixed inset-0">
                <Image src="/bg.jpg" alt="bg" layout="fill" objectFit="cover" />
            </div>
            <div className="relative">
                <NavBar
                    username={username}
                    onDeleteAccount={onClickDeleteAccount}
                    onLogout={onClickLogout}
                />
                <h1 className="text-3xl text-center m-8 text-white">Discussion Posts</h1>
                <div className="grid grids-col-1 md:grids-cols-2 lg:grid-cols-4 gap-2 p-4 justify-items-stretch">
                    {token ? (
                        posts.map((post, index) => {
                            const status = post.likedUsers && post.likedUsers.includes(username);
                            return (
                                <Post
                                    key={index}
                                    title={post.title}
                                    content={post.content}
                                    time={post.time}
                                    username={post.username}
                                    likeCount={post.likeCount}
                                    commentCount={post.commentCount}
                                    postId={post.postId}
                                    isOwner={post.username == username}
                                    likeStatus={status}
                                />
                            );
                        })
                    ) : (
                        <p className="flex items-center text-white"> Please login to see posts. </p>
                    )}
                </div>

                    {token ? <div className="flex justify-center items-center space-x-8">
                        <CreatePostButton onClick={onClickCreatePost} />
                        <SortMenu setSortProperty={setSortProperty}/>
                        </div>
                    : null}
            </div>
        </div>
    );
};

export default ForumHomePage;
