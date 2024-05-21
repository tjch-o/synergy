"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ViewPostPage = () => {
    const urlParams = useParams();
    const postId = urlParams.postId;

    const [postData, setPostData] = useState({});

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

    return (
        <div>
            <h1>{postData.title}</h1>
            <p>{postData.content}</p>
            <p>{postData.username}</p>
            <p>{postData.time}</p>
        </div>
    );
};

export default ViewPostPage;
