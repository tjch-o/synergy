"use client";

import FailureAlert from "@/components/alerts/FailureAlert";
import SuccessAlert from "@/components/alerts/SuccessAlert";
import DeleteAccountButton from "@/components/buttons/DeleteAccountButton";
import GoBackButton from "@/components/buttons/GoBackButton";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

const DeleteAccountPage = () => {
    const [password, setPassword] = useState("");
    const [deleteAccountStatus, setDeleteAccountStatus] = useState(false);
    const [deleteAccountStatusMsg, setDeleteAccountStatusMsg] = useState("");
    const [isDeleteAccountStatusVisible, setDeleteAccountStatusVisible] = useState(false);

    const username = window.localStorage.getItem("username");
    const router = useRouter();

    const handleChangeInPassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const res = await axios.delete(`http://localhost:5000/user/${username}`, {
                data: {
                    password,
                },
                validateStatus: (status) => status >= 200 && status <= 500,
            });

            if (res.status == 200) {
                setDeleteAccountStatus(true);
                setDeleteAccountStatusMsg(res.data.message);
                setDeleteAccountStatusVisible(true);

                setTimeout(() => {
                    router.push("/");
                }, 200);
            } else {
                setDeleteAccountStatus(false);
                setDeleteAccountStatusMsg(res.data.message);
                setDeleteAccountStatusVisible(true);
            }
        } catch (error) {
            setDeleteAccountStatus(false);
            setDeleteAccountStatusMsg("An error occurred. Please try again.");
            setDeleteAccountStatusVisible(true);
        }
    };

    const handleGoBack = () => {
        router.push("/forum-home");
    };

    return (
        <div>
            <div className="relative flex justify-center items-center h-screen z-10">
                <div className="w-1/3 rounded overflow-hidden border-2 border-purple-600 hover:scale-110 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#8A05BE,0_0_15px_#8A05BE,0_0_30px_#8A05BE]">
                    <form onSubmit={handleSubmit}>
                        <label className="block font-bold mt-4 ml-4 text-white">Password</label>
                        <input
                            className="block mt-2 ml-4 mb-4 w-1/2 h-8"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            onChange={handleChangeInPassword}
                            required
                        />

                        <div className="flex ml-4 mb-4 space-x-4">
                            <DeleteAccountButton onClick={handleSubmit} />
                            <GoBackButton onClick={handleGoBack} />
                        </div>

                        {deleteAccountStatus ? (
                            isDeleteAccountStatusVisible ? (
                                <SuccessAlert message={deleteAccountStatusMsg} />
                            ) : null
                        ) : isDeleteAccountStatusVisible ? (
                            <FailureAlert message={deleteAccountStatusMsg} />
                        ) : null}
                    </form>
                </div>
            </div>
            <div className="absolute inset-0 z-0">
                <Image src="/login.jpg" alt="delete account" layout="fill" objectFit="cover" />
            </div>
        </div>
    );
};

export default DeleteAccountPage;
