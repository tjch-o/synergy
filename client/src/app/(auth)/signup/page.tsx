"use client";

import FailureAlert from "@/components/alerts/FailureAlert";
import SuccessAlert from "@/components/alerts/SuccessAlert";
import axios from "axios";
import Image from "next/image";
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
    const [signupStatusMsg, setSignupStatusMsg] = useState("");
    const [isSignupStatusVisible, setSignupStatusVisible] = useState(false);
    const router = useRouter();

    const handleChangeInData = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const checkPasswordSame = (password: String, confirmPassword: String) => {
        return password === confirmPassword;
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!checkPasswordSame(data.password, data.confirmPassword)) {
            setClientValidationErrorMsg("Passwords do not match.");
            return;
        }

        setClientValidationErrorMsg("");

        // remove confirmPassword to prevent storing duplicate columns
        const { confirmPassword, ...rest } = data;

        try {
            const res = await axios.post("http://localhost:5000/user", rest);
            console.log(res.data);

            if (res.status == 200) {
                setCreateAccountStatus(true);
                setSignupStatusMsg(res.data.message);
                setSignupStatusVisible(true);

                window.sessionStorage.setItem("token", res.data.token);
                window.sessionStorage.setItem("username", res.data.username);
                axios.defaults.headers.common["Authorization"] =
                    `Bearer ${res.data.token}`;

                setTimeout(() => {
                    router.push("/forum-home");
                }, 500);
            } else {
                setCreateAccountStatus(false);
                setSignupStatusMsg(res.data.message);
                setSignupStatusVisible(true);
            }
        } catch (error) {
            setSignupStatusMsg("An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <div className="relative flex justify-center items-center h-screen z-10">
                <div className="w-1/3 rounded overflow-hidden border-2 border-purple-600 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#8A05BE,0_0_15px_#8A05BE,0_0_30px_#8A05BE]">
                    <form onSubmit={handleSubmit}>
                        <label className="block font-bold ml-4 mt-4 text-white">
                            Username
                        </label>
                        <input
                            className="block mt-2 mb-4 ml-4 w-1/2 h-8"
                            name="username"
                            type="text"
                            placeholder="Enter your username"
                            onChange={handleChangeInData}
                            required
                        />

                        <label className="block font-bold ml-4 text-white">
                            Name
                        </label>
                        <input
                            className="block mt-2 ml-4 mb-4 w-1/2 h-8"
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            onChange={handleChangeInData}
                            required
                        />

                        <label className="block font-bold ml-4 text-white">
                            Email
                        </label>
                        <input
                            className="block mt-2 ml-4 mb-4 w-1/2 h-8"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            onChange={handleChangeInData}
                            required
                        />

                        <label className="block font-bold ml-4 text-white">
                            Password
                        </label>
                        <input
                            className="block mt-2 ml-4 mb-4 w-1/2 h-8"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            onChange={handleChangeInData}
                            required
                        />

                        <label className="block font-bold ml-4 text-white">
                            Confirm Password
                        </label>
                        <input
                            className="block mt-2 ml-4 mb-4 w-1/2 h-8"
                            name="confirmPassword"
                            type="password"
                            placeholder="Enter your password again"
                            onChange={handleChangeInData}
                            required
                        />

                        <button
                            type="submit"
                            className="block font-2xl py-2 px-4 ml-4 bg-blue-800 text-white rounded shadow-md"
                        >
                            Create Account
                        </button>

                        <p className="font-xl mt-2 my-4 ml-4 text-red-500">
                            {clientValidationErrorMsg ==
                            "Passwords do not match."
                                ? clientValidationErrorMsg
                                : ""}
                        </p>

                        {createAccountStatus ? (
                            isSignupStatusVisible ? (
                                <SuccessAlert message={signupStatusMsg} />
                            ) : null
                        ) : isSignupStatusVisible ? (
                            <FailureAlert message={signupStatusMsg} />
                        ) : null}
                    </form>

                    <p className="font-xl mt-4 ml-4 pb-4 text-white">
                        {" "}
                        Already have an account?{" "}
                        <Link href="/login">Login</Link>{" "}
                    </p>
                </div>
            </div>
            <div className="absolute inset-0 z-0">
                <Image
                    src="/login.jpg"
                    alt="signup"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
        </div>
    );
};

export default SignupPage;
