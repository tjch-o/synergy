"use client";

import FailureAlert from "@/components/alerts/FailureAlert";
import SuccessAlert from "@/components/alerts/SuccessAlert";
import CreateCommentButton from "@/components/buttons/CreateCommentButton";
import GoBackButton from "@/components/buttons/GoBackButton";
import Comment from "@/components/comments/Comment";
import PostTitleComment from "@/components/comments/PostTitleComment";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

const ViewPostPage = () => {
    const urlParams = useParams();
    const postId = urlParams.postId;
    const username = localStorage.getItem("username");

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
    const className = `flex ${pos}`;

    const getPostData = async () => {
        const res = await axios.get(`http://localhost:5000/post/${postId}`);

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
                const res = await axios.get(`http://localhost:5000/comment/${commentId}`);
                return res;
            });

            const responses = await Promise.all(promises);
            const comments = responses.map((response) => response.data);
            console.log(comments);
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
        <div>
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
                            content={comment.content}
                            username={comment.username}
                            time={comment.time}
                        />
                    </div>
                );
            })}

            {isCreateCommentSectionVisible && (
                <div>
                    <label className="block font-bold ml-4 mt-4 mb-2">New comment</label>
                    <input
                        type="text"
                        placeholder="Enter your comment"
                        onChange={handleChangeInInput}
                        className="block ml-4 mb-2"
                    />
                    <button className="block ml-4" onClick={handleSubmit}>
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
    );
};

export default ViewPostPage;
