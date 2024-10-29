"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Dashboard() {
    const [projects, setProjects] = useState([]);
    const router = useRouter();
    const [currentImage, setCurrentImage] = useState({});

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch("/api/projects", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setProjects(data);

                // Set initial image for each project
                const initialImageState = data.reduce((acc, project) => {
                    acc[project._id] = 0; // Start from the first image
                    return acc;
                }, {});
                setCurrentImage(initialImageState);
            } else if (response.status === 401) {
                router.push("/login");
            } else {
                console.error("Failed to fetch projects");
            }
        };

        fetchProjects();
    }, [router]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImageState) => {
                const newImageState = { ...prevImageState };
                projects.forEach((project) => {
                    if (project.images.length > 1) {
                        newImageState[project._id] =
                            (newImageState[project._id] + 1) % project.images.length;
                    }
                });
                return newImageState;
            });
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, [projects]);

    const handleEdit = (id) => {
        router.push(`/dashboard/edit-project/${id}`);
    };

    const handleDelete = async (id) => {
        const response = await fetch(`/api/projects/${id}`, {
            method: "DELETE",
            headers: {
                id: id,
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            setProjects(projects.filter((project) => project._id !== id));
        } else {
            console.error("Failed to delete project");
        }
    };

    return (
        <div className="p-6 overflow-scroll">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 p-4 space-y-4 sm:space-y-0">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    My Projects
                </h2>
                <div className="flex flex-col sm:flex-row w-full sm:w-auto space-y-4 sm:space-y-0 sm:space-x-4">
                    <Link
                        href="/dashboard/add-project-sections"
                        className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-3 rounded-lg shadow-sm transition duration-200 w-full sm:w-auto text-center"
                    >
                        Add New Project ( sections )
                    </Link>
                    <Link
                        href="/dashboard/add-project"
                        className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-3 rounded-lg shadow-sm transition duration-200 w-full sm:w-auto text-center"
                    >
                        Add New Project
                    </Link>
                    <button
                        onClick={() => signOut()}
                        className="bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-3 rounded-lg shadow-sm transition duration-200 w-full sm:w-auto text-center"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {projects.map((project) => (
                    <li
                        key={project._id}
                        className="border p-4 rounded-lg bg-white shadow-lg hover:shadow-xl transition duration-200 flex flex-col justify-between h-full"
                    >
                        <div>
                            {project.images.length > 0 && (
                                <div className="relative h-64 w-full mb-4">
                                    {project.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={project.title}
                                            className={`absolute inset-0 w-full h-full object-cover rounded-t-lg transition-opacity duration-1000 ${
                                                currentImage[project._id] === index
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            }`}
                                        />
                                    ))}
                                </div>
                            )}
                            <h3 className="text-xl font-semibold">
                                {project.title}
                            </h3>
                            <p className="text-gray-600">
                                {project.description.slice(0, 60)}
                            </p>
                        </div>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => handleEdit(project._id)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg transition duration-200 hover:bg-blue-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(project._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg transition duration-200 hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
