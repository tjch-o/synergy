"use client";

import FailureAlert from "@/components/alerts/FailureAlert";
import SuccessAlert from "@/components/alerts/SuccessAlert";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

const DeleteAccountPage = () => {
    const [data, setData] = useState({
        password: "",
    });
    const [deleteAccountStatus, setDeleteAccountStatus] = useState(false);
    const [serverStatusMsg, setServerStatusMsg] = useState("");
    const [isVisible, setVisible] = useState(false);

    const router = useRouter();

    const urlParams = useParams();
    const userId = urlParams.id;

    const handleChangeInData = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const dataWithId = {
            ...data,
            userId: userId,
        };

        try {
            const res = await axios.post(
                "http://localhost:5000/delete-account",
                dataWithId,
            );

            if (res.status == 200) {
                setServerStatusMsg(res.data.message);
                setVisible(true);
                setDeleteAccountStatus(true);

                setTimeout(() => {
                    router.push("/signup");
                    window.localStorage.removeItem("userId");
                    window.localStorage.removeItem("token");
                }, 1000);
            } else {
                setServerStatusMsg(res.data.message);
                setVisible(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="relative flex justify-center items-center h-screen z-10">
                <div className="w-1/3 rounded overflow-hidden border-2 border-purple-600 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#8A05BE,0_0_15px_#8A05BE,0_0_30px_#8A05BE]">
                    <form onSubmit={handleSubmit}>
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

                        <button
                            type="submit"
                            className="block font-2xl py-2 px-4 ml-4 bg-blue-800 text-white rounded shadow-md"
                        >
                            Delete Account
                        </button>

                        {deleteAccountStatus ? (
                            isVisible ? (
                                <SuccessAlert message={serverStatusMsg} />
                            ) : null
                        ) : isVisible ? (
                            <FailureAlert message={serverStatusMsg} />
                        ) : null}
                    </form>

                    <p className="font-xl mt-4 ml-4 pb-4 text-white">
                        {" "}
                        Changed your mind? <Link href="/forum">
                            Go back
                        </Link>{" "}
                    </p>
                </div>
            </div>
            <div className="absolute inset-0 z-0">
                <Image
                    src="/login.jpg"
                    alt="login"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
        </div>
    );
};

export default DeleteAccountPage;
