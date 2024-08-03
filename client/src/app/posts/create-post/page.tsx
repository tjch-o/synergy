"use client";

import FailureAlert from "@/components/alerts/FailureAlert";
import SuccessAlert from "@/components/alerts/SuccessAlert";
import CreatePostButton from "@/components/buttons/CreatePostButton";
import GoBackButton from "@/components/buttons/GoBackButton";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

const CreatePostPage = () => {
    const [createPostStatus, setCreatePostStatus] = useState(false);
    const [isAlertVisible, setAlertVisible] = useState(false);
    const [message, setMessage] = useState("");

    const router = useRouter();
    const username = Cookies.get("username");
    // const username = window.localStorage.getItem("username");

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
            likes: [],
            likeCount: 0,
            commentCount: 0,
            comments: [],
        };

        try {
            const res = await axios.post("http://localhost:5000/post", data, {
                validateStatus: (status) => status >= 200 && status <= 500,
                withCredentials: true,
            });

            if (res.status == 200) {
                setCreatePostStatus(true);
                setAlertVisible(true);
                setMessage(res.data.message);

                setTimeout(() => {
                    router.push("/forum-home");
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
            <div className="relative flex justify-center items-center h-screen z-10">
                <div className="w-1/3 rounded overflow-hidden border-2 border-purple-600 hover:scale-110 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#8A05BE,0_0_15px_#8A05BE,0_0_30px_#8A05BE]">
                    <form onSubmit={handleSubmit}>
                        <label className="block font-bold text-white mt-4 ml-4">Title</label>
                        <input
                            className="block mt-2 ml-4 mb-4 w-2/3 h-8"
                            name="title"
                            type="text"
                            onChange={handleChangeInData}
                            required
                        ></input>

                        <label className="block font-bold text-white ml-4">Content</label>
                        <input
                            className="block mt-2 ml-4 mb-4 w-2/3 h-8"
                            name="content"
                            type="textarea"
                            onChange={handleChangeInData}
                            required
                        ></input>

                        <div className="flex flex-row justify-center space-x-8 mt-4 mb-4">
                            <CreatePostButton onClick={handleSubmit} />
                            <GoBackButton onClick={handleGoBack} />
                        </div>

                        <div className="flex justify-center items-center">
                        {createPostStatus ? (
                        isAlertVisible ? (
                            <SuccessAlert message={message} />
                        ) : null
                    ) : isAlertVisible ? (
                        <FailureAlert message={message} />
                    ) : null}
                        </div>
                    </form>  
                </div>
            </div>

            <div className="absolute inset-0 z-0">
                <Image src="/post.jpg" alt="signup" layout="fill" objectFit="cover" />
            </div>
        </div>
    );
};

export default CreatePostPage;
