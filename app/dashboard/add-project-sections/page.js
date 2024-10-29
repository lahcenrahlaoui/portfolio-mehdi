"use client"; 
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProjectSections() {
    const [title, setTitle] = useState("");
    const [inputs, setInputs] = useState([]); // State to hold mixed inputs
    const [imageData, setImageData] = useState({}); // State to hold images as key-value pairs
    const [error, setError] = useState(""); // State for handling errors
    const router = useRouter();

    const handleAddText = () => {
        setInputs((prevInputs) => [...prevInputs, { type: "text", value: "" }]); // Add new text input
    };

    const handleAddImage = () => {
        const newKey = `image-`+Math.random().toString(36).substring(2, 15); // Generate a random key for the image
        setInputs((prevInputs) => [
            ...prevInputs,
            { type: "image", value: newKey },
        ]); // Add new image input with the key
    };

    const handleImageChange = async (index, e) => {
        const file = e.target.files[0]; // Get the selected file
        const base64Image = await convertToBase64(file); // Convert to Base64
        const newInputs = [...inputs];
        const key = newInputs[index].value; // Get the key of the image input
        setImageData((prevData) => ({ ...prevData, [key]: base64Image })); // Store the image data with the key
        setInputs(newInputs); // Update the state
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result); // Resolve with the Base64 string
            reader.onerror = (error) => reject(error); // Reject on error
        });
    };

    const handleTextChange = (index, value) => {
        const updatedInputs = [...inputs];
        updatedInputs[index].value = value; // Update the specific text input
        setInputs(updatedInputs);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission
        setError(""); // Clear any previous errors

        // Prepare the project data with the order maintained
        const data = {  title,  inputs  };


        const dataWithImage = {
            title  , 
            inputs , 
            images : JSON.stringify(imageData)
        }
   

        try {
            
            const response = await fetch("/api/project-sections", {
                method: "POST",
                body: JSON.stringify(data), // Use JSON.stringify to send the project data
                headers: {
                    "Content-Type": "application/json",
                },
            });
            
            if (response.ok) {
                const json = await response.json()
                console.log(json)
                const responseUpdate = await fetch(
                    `/api/project-sections/images/${json._id}`,
                    {
                        method: "PATCH",
                        headers: {
                            id: json._id,
                        },
                        body: JSON.stringify(dataWithImage), // Use FormData as the body
                    }
                );
                console.log(responseUpdate)


                // Handle success
                // router.push("/dashboard");
            } else {
                const errorData = await response.json();
                setError("Failed to create project: " + errorData.message);
            }
        } catch (error) {
            setError("An error occurred: " + error.message);
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-6">Add New Project</h2>

            {error && (
                <div className="mb-4 p-4 text-white bg-red-500 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="mb-4">
                    <label className="block mb-2">Project Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded text-base sm:text-sm lg:text-lg"
                        required
                    />
                </div>

                {inputs.map((input, index) => (
                    <div key={index} className="mb-4">
                        {input.type === "text" ? (
                            <>
                                <label className="block mb-2">
                                    Text Area {index + 1}
                                </label>
                                <textarea
                                    value={input.value}
                                    onChange={(e) =>
                                        handleTextChange(index, e.target.value)
                                    }
                                    className="w-full h-24 p-4 sm:p-2 border rounded text-base sm:text-sm lg:text-lg resize-none"
                                    required
                                />
                            </>
                        ) : (
                            <>
                                <label className="block mb-2">
                                    Image {index + 1}
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        handleImageChange(index, e)
                                    }
                                    className="w-full p-2 border rounded text-base sm:text-sm lg:text-lg"
                                />
                                {imageData[input.value] && (
                                    <img
                                        src={imageData[input.value]}
                                        alt={`Uploaded image ${index + 1}`}
                                        className="w-24 h-24 object-cover rounded mt-2"
                                    />
                                )}
                            </>
                        )}
                    </div>
                ))}

                <div className="flex justify-end mb-4 space-x-2">
                    <button
                        type="button"
                        onClick={handleAddText}
                        className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                        Add Text
                    </button>
                    <button
                        type="button"
                        onClick={handleAddImage}
                        className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                    >
                        Add Image
                    </button>
                    <button
                        type="button"
                        onClick={()=>{console.log(inputs) ; console.log(imageData)}}
                        className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                    >
                       console
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    Add Project
                </button>
            </form>
        </div>
    );
}
