"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProject({ params }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { id } = params;

    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);
        const base64Images = await Promise.all(files.map(convertToBase64));
        setNewImages(base64Images);
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(`/api/projects/${id}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (response.ok) {
                    const project = await response.json();
                    setTitle(project.title);
                    setDescription(project.description);
                    setImages(project.images);
                } else {
                    console.error("Failed to fetch project data");
                }
            } catch (error) {
                console.error("Error:", error);
                setError("Failed to load project data");
            }
        };

        fetchProject();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const projectData = new FormData();
        projectData.append("title", title);
        projectData.append("description", description);
        const processImage = newImages.join("--this-is-indicator-for-images--");
        projectData.append("images", processImage);
        projectData.append("oldImages", JSON.stringify(images));

        try {
            const response = await fetch(`/api/projects/images/${id}`, {
                method: "PATCH",
                headers: { id: id },
                body: projectData,
            });

            if (response.ok) {
                router.push("/dashboard");
            } else {
                const errorData = await response.json();
                setError("Failed to update project");
                console.error("Failed to update project:", errorData);
            }
        } catch (error) {
            setError("An error occurred while updating the project");
            console.error("Error:", error);
        }
    };

    const handleImageDelete = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    return (
<div className="p-4 sm:p-6 lg:p-8">
    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 lg:mb-8">Edit Project</h2>
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
            <label className="block mb-2 text-sm sm:text-base lg:text-lg">Project Title</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded text-sm sm:text-base lg:text-lg"
                required
            />
        </div>
        <div>
            <label className="block mb-2 text-sm sm:text-base lg:text-lg">Project Description</label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-32 sm:h-24 p-4 sm:p-2 border rounded text-base sm:text-sm lg:text-lg resize-none"
                required
            />
        </div>

        <div>
            <label className="block mb-3 text-base lg:text-lg text-gray-600">Existing Images</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {images.map((image, index) => (
                    <div key={index} className="relative">
                        <img src={image} alt={`Image ${index}`} className="w-full h-28 lg:h-36 object-cover rounded-md shadow-md" />
                        <button
                            type="button"
                            onClick={() => handleImageDelete(index)}
                            className="absolute top-2 right-2 bg-red-600 text-white w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition-all duration-200"
                            aria-label="Delete image"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </div>

        <div>
            <label className="block mb-2 text-sm sm:text-base lg:text-lg">Upload New Images</label>
            <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="w-full p-2 border rounded text-sm sm:text-base lg:text-lg"
            />
        </div>

        <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded text-sm sm:text-base lg:text-lg"
        >
            Update Project
        </button>
    </form>

    {error && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg text-center">
                <p className="text-lg text-red-600">{error}</p>
                <button
                    className="mt-4 p-2 bg-red-500 text-white rounded"
                    onClick={() => setError(null)}
                >
                    Close
                </button>
            </div>
        </div>
    )}
</div>


    );
}
