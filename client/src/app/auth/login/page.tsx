"use client";

import FailureAlert from "@/components/Alert/FailureAlert";
import SuccessAlert from "@/components/Alert/SuccessAlert";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

const LoginPage = () => {
    const [data, setData] = useState({
        username: "",
        password: "",
    });
    const [loginStatus, setLoginStatus] = useState(false);
    const [serverStatusMsg, setServerStatusMsg] = useState("");
    const [isVisible, setVisible] = useState(false);

    const router = useRouter();

    const handleChangeInData = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const { username, password } = data;

        try {
            const res = await axios.post("http://localhost:5000/login", data, {
                validateStatus: (status) => {
                    return status < 500 || status == 401 || status == 404;
                },
            });

            if (res.status === 200) {
                setLoginStatus(true);
                setVisible(true);
                setServerStatusMsg(res.data.message);

                window.localStorage.setItem("userId", res.data.loggedUserId);
                window.localStorage.setItem(
                    "username",
                    res.data.loggedUsername,
                );
                window.localStorage.setItem("token", res.data.token);
                console.log(res.data.loggedUsername);
                console.log(res.data.loggedUserId);

                router.push("/forum");
            } else {
                setLoginStatus(false);
                setVisible(true);
                setServerStatusMsg(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
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

                <label className="block font-bold">Password</label>
                <input
                    className="block mt-2 mb-4 w-1/2 h-8"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    onChange={handleChangeInData}
                    required
                />

                <button
                    type="submit"
                    className="block font-2xl py-2 px-4 bg-blue-800 text-white rounded shadow-md"
                >
                    Login
                </button>

                {loginStatus ? (
                    isVisible ? (
                        <SuccessAlert message={serverStatusMsg} />
                    ) : null
                ) : isVisible ? (
                    <FailureAlert message={serverStatusMsg} />
                ) : null}
            </form>

            <p className="font-xl mt-4">
                {" "}
                Do not have an account? <Link href="/auth/signup">
                    Sign up
                </Link>{" "}
            </p>
        </div>
    );
};

export default LoginPage;
