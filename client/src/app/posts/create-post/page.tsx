"use client";

import FailureAlert from "@/components/alerts/FailureAlert";
import SuccessAlert from "@/components/alerts/SuccessAlert";
import CreatePostButton from "@/components/buttons/CreatePostButton";
import GoBackButton from "@/components/buttons/GoBackButton";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

const CreatePostPage = () => {
    const [createPostStatus, setCreatePostStatus] = useState(false);
    const [isAlertVisible, setAlertVisible] = useState(false);
    const [message, setMessage] = useState("");

    const router = useRouter();
    const username = window.localStorage.getItem("username");

    const [postData, setPostData] = useState({
        title: "",
        content: "",
    });

    const handleChangeInData = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPostData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleGoBack = () => {
        router.push("/forum-home");
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const data = {
            ...postData,
            username: username,
            time: Date.now(),
            likeCount: 0,
            commentCount: 0,
            comments: [],
        };

        try {
            const res = await axios.post("http://localhost:5000/post", data);

            if (res.status == 200) {
                setCreatePostStatus(true);
                setAlertVisible(true);
                setMessage(res.data.message);

                setTimeout(() => {
                    router.push("/forum");
                }, 1000);
            } else {
                setCreatePostStatus(false);
                setAlertVisible(true);
                setMessage(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1 className="text-3xl pb-8">Create Post Page</h1>

            <form onSubmit={handleSubmit}>
                <label className="block font-bold">Title</label>
                <input
                    className="block mt-2 mb-4 w-1/2 h-8"
                    name="title"
                    type="text"
                    onChange={handleChangeInData}
                    required
                ></input>

                <label className="block font-bold">Content</label>
                <input
                    className="block mt-2 mb-4 w-1/2 h-8"
                    name="content"
                    type="textarea"
                    onChange={handleChangeInData}
                    required
                ></input>

                <div className="flex flex-row">
                    <CreatePostButton onClick={handleSubmit} />
                    <GoBackButton onClick={handleGoBack} />
                </div>
            </form>

            {createPostStatus ? (
                isAlertVisible ? (
                    <SuccessAlert message={message} />
                ) : null
            ) : isAlertVisible ? (
                <FailureAlert message={message} />
            ) : null}
        </div>
    );
};

export default CreatePostPage;
