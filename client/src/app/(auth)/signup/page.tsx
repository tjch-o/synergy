"use client";

import FailureAlert from "@/components/alerts/FailureAlert";
import SuccessAlert from "@/components/alerts/SuccessAlert";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

const SignupPage = () => {
    const [data, setData] = useState({
        username: "",
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [clientValidationErrorMsg, setClientValidationErrorMsg] =
        useState("");
    const [createAccountStatus, setCreateAccountStatus] = useState(false);
    const [message, setMessage] = useState("");
    const [isVisible, setVisible] = useState(false);

    const router = useRouter();

    const handleChangeInData = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const checkPasswordSame = (password: String, confirmPassword: String) => {
        return password === confirmPassword;
    };

    const checkPasswordLength = (password: String) => {
        return password.length >= 8;
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!checkPasswordSame(data.password, data.confirmPassword)) {
            setClientValidationErrorMsg("Passwords do not match.");
            return;
        }

        if (!checkPasswordLength(data.password)) {
            setClientValidationErrorMsg(
                "Password must be at least 8 characters long.",
            );
            return;
        }

        setClientValidationErrorMsg("");

        // remove confirmPassword to prevent storing duplicate columns
        const { confirmPassword, ...rest } = data;

        try {
            const res = await axios.post("http://localhost:5000/signup", rest, {
                validateStatus: (status) => {
                    // resolve only if the status code is less than 500 or equals 409
                    return status < 500 || status === 409;
                },
            });

            if (res.status == 200) {
                setCreateAccountStatus(true);
                setVisible(true);
                setMessage(res.data.message);

                window.localStorage.setItem("userId", res.data.loggedUserId);
                window.localStorage.setItem(
                    "username",
                    res.data.loggedUsername,
                );
                window.localStorage.setItem("token", res.data.token);

                axios.interceptors.request.use((config) => {
                    config.headers.authorization = `Bearer ${res.data.token}`;
                    return config;
                });

                try {
                    const res = await axios.get(
                        "http://localhost:5000/access-forum",
                    );
                    if (res.status == 200) {
                        router.push("/forum");
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                setCreateAccountStatus(false);
                setVisible(true);
                setMessage(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-1/2 rounded overflow-hidden shadow-lg">
                <form onSubmit={handleSubmit}>
                    <label className="block font-bold">Username</label>
                    <input
                        className="block mt-2 mb-4 w-1/2 h-8"
                        name="username"
                        type="text"
                        placeholder="Enter your username"
                        onChange={handleChangeInData}
                        required
                    />

                    <label className="block font-bold">Name</label>
                    <input
                        className="block mt-2 mb-4 w-1/2 h-8"
                        name="name"
                        type="text"
                        placeholder="Enter your name"
                        onChange={handleChangeInData}
                        required
                    />

                    <label className="block font-bold">Email</label>
                    <input
                        className="block mt-2 mb-4 w-1/2 h-8"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        onChange={handleChangeInData}
                        required
                    />

                    <label className="block font-bold">Password</label>
                    <input
                        className="block mt-2 mb-4 w-1/2 h-8"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        onChange={handleChangeInData}
                        required
                    />
                    <p className="font-xl mt-2 my-4 text-red-500">
                        {clientValidationErrorMsg ==
                        "Password must be at least 8 characters long."
                            ? clientValidationErrorMsg
                            : ""}
                    </p>

                    <label className="block font-bold">Confirm Password</label>
                    <input
                        className="block mt-2 mb-4 w-1/2 h-8"
                        name="confirmPassword"
                        type="password"
                        placeholder="Enter your password again"
                        onChange={handleChangeInData}
                        required
                    />
                    <p className="font-xl mt-2 my-4 text-red-500">
                        {clientValidationErrorMsg == "Passwords do not match."
                            ? clientValidationErrorMsg
                            : ""}
                    </p>

                    <button
                        type="submit"
                        className="block font-2xl py-2 mt-4 px-4 bg-blue-800 text-white rounded shadow-md"
                    >
                        Sign Up
                    </button>

                    {createAccountStatus ? (
                        isVisible ? (
                            <SuccessAlert message={message} />
                        ) : null
                    ) : isVisible ? (
                        <FailureAlert message={message} />
                    ) : null}
                </form>

                <p className="font-xl mt-4">
                    {" "}
                    Already have an account? <Link href="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
