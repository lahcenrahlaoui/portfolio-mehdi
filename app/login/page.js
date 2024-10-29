"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import { signIn } from "next-auth/react";
export default function Login() {
    const [email, setEmail] = useState("example@example.com");
    const [password, setPassword] = useState("mehdihachid1990algeria");
    const [error, setError] = useState("");
    const router = useRouter(); // Initialize useRouter

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        const userData = {
            email,
            password,
            redirect: false,
        };

        console.log(userData);
        try {
            const res = await signIn("credentials", userData);
            if (res.error) {
                setError("Invalid Credentials");
                return;
            }

            console.log(res);
            router.replace("dashboard");
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center">
            <form className="w-1/2 p-6" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-6 text-center text-black">
                    Login
                </h2>
                <div className="mb-4 w-full">
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border-b-2 border-gray-300 focus:border-gray-600 outline-none"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border-b-2 border-gray-300 focus:border-gray-600 outline-none"
                    />
                </div>
                {error && (
                    <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
