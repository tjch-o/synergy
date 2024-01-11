"use client";

import FailureAlert from "@/components/Alert/FailureAlert";
import SuccessAlert from "@/components/Alert/SuccessAlert";
import axios from "axios";
import FormData from "form-data";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

interface CreatePostPageProps {
    userId: string;
}

const CreatePostPage = ({ userId }: CreatePostPageProps) => {
    const [createPostStatus, setCreatePostStatus] = useState(false);
    const [isAlertVisible, setAlertVisible] = useState(false);
    const [message, setMessage] = useState("");

    const router = useRouter();

    const urlParams = useParams();
    const id = urlParams.id;

    const [postData, setPostData] = useState({
        title: "",
        content: "",
    });

    const handleChangeInData = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPostData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const formData = new FormData();

        console.log(id);

        const data = {
            ...postData,
            userId: id,
            time: Date.now(),
            likeCount: 0,
            commentCount: 0,
            comments: [],
        };

        try {
            const res = await axios.post(
                "http://localhost:5000/createPost",
                data,
            );

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
            <h1 className="text-3xl">Create Post Page</h1>

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

                {/* <label className="block font-bold">Image</label>
                <input
                    className="block mt-2 mb-4 w-1/2 h-8"
                    type="accept"
                    accept="image/*"
                    onChange={handleChangeInData}
                ></input> */}

                <button
                    className="block font-2xl py-2 px-4 bg-blue-800 text-white rounded shadow-md"
                    type="submit"
                >
                    Submit
                </button>
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
