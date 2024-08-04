"use client";

import CreatePostButton from "@/components/buttons/CreatePostButton";
import SortMenu from "@/components/menus/SortMenu";
import NavBar from "@/components/nav/NavBar";
import Post from "@/components/posts/Post";
import { sortByProperty } from "@/utils/sort";
import { Sort } from "@mui/icons-material";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

const ForumHomePage = () => {
    const [posts, setPosts] = useState([]);
    const [sortProperty, setSortProperty] = useState("");

    // const token = window.localStorage.getItem("token");
    // if (token) {
    //     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    // }
    const token = Cookies.get("token");

    // const username = window.localStorage.getItem("username");
    const username = Cookies.get("username");
    const router = useRouter();

    const fetchPostsData = async () => {
        const res = await axios.get("http://localhost:5000/forum-posts", {
            withCredentials: true,
        });

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
        router.push("/delete-account");
    };

    const onClickLogout = async () => {
        try {
            console.log("logging out token is ", token);
            const res = await axios.post(
                "http://localhost:5000/logout",
                {},
                {
                    withCredentials: true,
                },
            );

            if (res.status == 200) {
                Cookies.remove("username");
                router.push("/login");
            } else {
                console.log(res);
            }
        } catch (error) {
            console.log(error);
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

                {token ? (
                    <div className="flex justify-center items-center space-x-8">
                        <CreatePostButton onClick={onClickCreatePost} />
                        <SortMenu setSortProperty={setSortProperty} />
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default ForumHomePage;
