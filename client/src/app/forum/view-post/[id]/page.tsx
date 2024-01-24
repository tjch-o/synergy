"use client";

import CloseButton from "@/components/buttons/CloseButton";
import CreateCommentButton from "@/components/buttons/CreateCommentButton";
import GoBackButton from "@/components/buttons/GoBackButton";
import NavBar from "@/components/navbar/NavBar";
import PostWithComments from "@/components/post/PostWithComments";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const ViewPostPage = () => {
    const urlParams = useParams();
    const postId = urlParams.id;
    const userId = window.localStorage.getItem("userId");

    const [isVisible, setIsVisible] = useState(false);
    const [postData, setPostData] = useState({
        title: "",
        content: "",
        username: "",
        time: "",
        comments: [],
    });

    const [commentData, setCommentData] = useState({
        postId: postId,
        content: "",
    });

    const router = useRouter();

    const handleClick = () => {
        setIsVisible(true);
    };

    const handleClose = () => {
        setIsVisible(false);
    };

    const handleGoBack = () => {
        router.push("/forum");
    };

    const handleChangeInCommentData = (
        event: FormEvent<HTMLTextAreaElement>,
    ) => {
        const { name, value } = event.target;
        setCommentData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const data = {
            ...commentData,
            userId: userId,
            time: Date.now(),
        };

        const res = await axios.post(
            "http://localhost:5000/create-comment",
            data,
        );

        if (res.status == 200) {
            setIsVisible(false);
        } else {
            console.log(res.data.message);
        }
    };

    useEffect(() => {
        const fetchPostData = async () => {
            console.log(postId);
            const res = await axios.get(
                `http://localhost:5000/get-post/${postId}`,
            );
            console.log(res.data.foundPostWithUsername);
            setPostData({
                title: res.data.foundPostWithUsername.title,
                content: res.data.foundPostWithUsername.content,
                username: res.data.foundPostWithUsername.username,
                time: res.data.foundPostWithUsername.time,
                comments: res.data.foundPostWithUsername.comments,
            });
        };

        fetchPostData();
    });

    return (
        <div>
            <div className="fixed inset-0">
                <Image
                    src="/bg.jpg"
                    alt="bg"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="relative">
                <NavBar />
                <PostWithComments
                    title={postData.title}
                    content={postData.content}
                    username={postData.username}
                    time={postData.time}
                    comments={postData.comments}
                />
                <GoBackButton onClick={handleGoBack} />
                <CreateCommentButton onClick={handleClick} />
                {isVisible && (
                    <div>
                        <CloseButton onClick={handleClose} />
                        <form onSubmit={handleSubmit}>
                            {/* <input
                            className="border-2 border-black rounded-lg py-2"
                            placeholder="Enter comment here..."
                            name="content"
                            type="textarea"
                            onChange={handleChangeInCommentData}
                        /> */}
                            <textarea
                                className="border-2 border-black rounded-lg py-2 w-full h-24"
                                name="content"
                                rows={4}
                                onChange={handleChangeInCommentData}
                            />
                            <button
                                type="submit"
                                className="py-2 px-4 rounded text-black"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewPostPage;
