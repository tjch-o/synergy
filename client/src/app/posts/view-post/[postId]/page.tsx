"use client";

import CreateCommentButton from "@/components/buttons/CreateCommentButton";
import GoBackButton from "@/components/buttons/GoBackButton";
import Comment from "@/components/comments/Comment";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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
    const [isCreateCommentSectionVisible, setCreateCommentSectionVisible] = useState(false);

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
            // console.log(responses)
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

    // const handleSubmit = async () => {
    //     try {

    //     } catch (error) {

    //     }

    // };

    return (
        <div>
            <h1>{postData.title}</h1>
            <p>{postData.content}</p>
            <p>{postData.username}</p>
            <p>{postData.time}</p>
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

            <GoBackButton onClick={handleGoBack} />
        </div>
    );
};

export default ViewPostPage;
