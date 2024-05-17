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

    const [posts, setPosts] = useState([]);
    const username = window.sessionStorage.getItem("username");
    const router = useRouter();

    useEffect(() => {
        const fetchPostsData = async () => {
            const res = await axios.get("http://localhost:5000/forum-posts");
            setPosts(res.data.posts);
            fetchPostsData();
        };

        fetchPostsData();
    }, []);

    return (
        // <p>
        //     you made it! welcome {window.sessionStorage.getItem("username")} :D
        // </p>
        <div className="bg-fixed bg-center bg-cover h-screen">
            <div className="fixed inset-0">
                <Image src="/bg.jpg" alt="bg" layout="fill" objectFit="cover" />
            </div>
            <div className="relative">
                <NavBar username={username} />
                <h1 className="text-3xl text-center m-8 text-white">
                    Discussion Posts
                </h1>
                <div className="grid grids-col-1 md:grids-cols-2 lg:grid-cols-4 gap-2 p-4 justify-items-stretch">
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
                                postId={post.postId}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ForumHomePage;
