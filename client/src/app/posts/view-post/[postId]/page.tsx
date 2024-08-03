"use client";

import FailureAlert from "@/components/alerts/FailureAlert";
import SuccessAlert from "@/components/alerts/SuccessAlert";
import CreateCommentButton from "@/components/buttons/CreateCommentButton";
import GoBackButton from "@/components/buttons/GoBackButton";
import Comment from "@/components/comments/Comment";
import PostTitleComment from "@/components/comments/PostTitleComment";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

const ViewPostPage = () => {
    const urlParams = useParams();
    const postId = urlParams.postId;
    // const username = localStorage.getItem("username");
    // const token = window.localStorage.getItem("token");
    // if (token) {
    //     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    // }
    const username = Cookies.get("username");

    const [postData, setPostData] = useState({
        title: "",
        content: "",
        username: "",
        time: "",
        comments: [],
    });
    const [commentData, setCommentData] = useState([]);
    const [isCreateCommentButtonVisible, setCreateCommentButtonVisible] = useState(true);
    const [isCreateCommentSectionVisible, setCreateCommentSectionVisible] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [alertType, setAlertType] = useState(false);
    const [isAlertVisible, setAlertVisible] = useState(false);
    const [message, setMessage] = useState("");

    const pos = postData.username == username ? "justify-end" : "justify-start";
    const className = `flex ${pos} mx-4`;

    const getPostData = async () => {
        const res = await axios.get(`http://localhost:5000/post/${postId}`, {
            withCredentials: true,
        });

        if (res.status === 200) {
            setPostData(res.data.post);
        } else {
            console.log("Error fetching post data");
        }
    };

    useEffect(() => {
        getPostData();
    }, [postData]);

    const getCommentData = async () => {
        try {
            const promises = postData.comments.map(async (commentId) => {
                const res = await axios.get(`http://localhost:5000/comment/${commentId}`, {
                    withCredentials: true,
                });
                return res;
            });

            const responses = await Promise.all(promises);
            const comments = responses.map((response) => response.data);
            setCommentData(comments);
        } catch (error) {
            console.log("Error fetching comment data");
        }
    };

    useEffect(() => {
        if (postData && postData.comments) {
            getCommentData();
        }
    }, [postData]);

    const router = useRouter();

    const handleGoBack = () => {
        router.push("/forum-home");
    };

    const handleChangeInInput = (event: ChangeEvent<HTMLInputElement>) => {
        setNewComment(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            const data = {
                content: newComment,
                username: username,
                postId: postId,
                time: Date.now(),
            };

            const res = await axios.post(`http://localhost:5000/comment`, data, {
                validateStatus: (status) => status >= 200 && status <= 500,
                withCredentials: true,
            });

            if (res.status == 200) {
                setNewComment("");
                setCreateCommentButtonVisible(true);
                setCreateCommentSectionVisible(false);
                setAlertVisible(true);
                setAlertType(true);
                setMessage(res.data.message);
                getCommentData();
            } else {
                setAlertVisible(true);
                setAlertType(false);
                setMessage(res.data.message);
            }
        } catch (error) {
            setAlertVisible(true);
            setAlertType(false);
            setMessage(error.message);
        }
    };

    return (
        <div className="bg-fixed bg-center bg-cover h-screen">
            <div className="fixed inset-0">
                <Image src="/post.jpg" alt="bg" layout="fill" objectFit="cover" />
            </div>
            <div className="relative">
                <div className={className}>
                    <PostTitleComment
                        title={postData.title}
                        content={postData.content}
                        username={postData.username}
                        time={postData.time}
                    />
                </div>

                {commentData.map((comment, index) => {
                    const pos = comment.username == username ? "justify-end" : "justify-start";
                    const className = `flex ${pos}`;
                    return (
                        <div key={index} className={className}>
                            <Comment
                                commentId={comment.commentId}
                                content={comment.content}
                                username={comment.username}
                                time={comment.time}
                                isOwner={comment.username == username}
                            />
                        </div>
                    );
                })}

                {isCreateCommentSectionVisible && (
                    <div>
                        <label className="block font-bold text-white ml-4 mt-4 mb-2">
                            New comment
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your comment"
                            onChange={handleChangeInInput}
                            className="block ml-4 mb-2"
                        />
                        <button className="block ml-4 text-white" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                )}

                {isAlertVisible && alertType ? (
                    <SuccessAlert message={message} />
                ) : isAlertVisible && !alertType ? (
                    <FailureAlert message={message} />
                ) : null}

                <div>
                    <CreateCommentButton
                        isVisible={isCreateCommentButtonVisible}
                        onClick={() => {
                            setCreateCommentSectionVisible(true);
                            setCreateCommentButtonVisible(false);
                        }}
                    />
                    <GoBackButton onClick={handleGoBack} />
                </div>
            </div>
        </div>
    );
};

export default ViewPostPage;
