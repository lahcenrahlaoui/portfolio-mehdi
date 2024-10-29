"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const data = [
   ` 11111 >>> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Illa tamen simplicia, vestra versuta. Quibusnam praeteritis? Hunc vos beatum; Polycratem Samium felicem appellabant. Idem iste, inquam, de voluptate quid sentit? Duo Reges: constructio interrete. 
Hoc loco tenere se Triarius non potuit. Minime vero istorum quidem, inquit. Sed haec omittamus; A mene tu? Iam id ipsum absurdum, maximum malum neglegi. Bork `,
   ` 22222 >>> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Illa tamen simplicia, vestra versuta. Quibusnam praeteritis? Hunc vos beatum; Polycratem Samium felicem appellabant. Idem iste, inquam, de voluptate quid sentit? Duo Reges: constructio interrete. 
Hoc loco tenere se Triarius non potuit. Minime vero istorum quidem, inquit. Sed haec omittamus; A mene tu? Iam id ipsum absurdum, maximum malum neglegi. Bork `,
   ` 33333 >>> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Illa tamen simplicia, vestra versuta. Quibusnam praeteritis? Hunc vos beatum; Polycratem Samium felicem appellabant. Idem iste, inquam, de voluptate quid sentit? Duo Reges: constructio interrete. 
Hoc loco tenere se Triarius non potuit. Minime vero istorum quidem, inquit. Sed haec omittamus; A mene tu? Iam id ipsum absurdum, maximum malum neglegi. Bork `,
   ` 44444 >>> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Illa tamen simplicia, vestra versuta. Quibusnam praeteritis? Hunc vos beatum; Polycratem Samium felicem appellabant. Idem iste, inquam, de voluptate quid sentit? Duo Reges: constructio interrete. 
Hoc loco tenere se Triarius non potuit. Minime vero istorum quidem, inquit. Sed haec omittamus; A mene tu? Iam id ipsum absurdum, maximum malum neglegi. Bork `,
   ` 55555 >>> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Illa tamen simplicia, vestra versuta. Quibusnam praeteritis? Hunc vos beatum; Polycratem Samium felicem appellabant. Idem iste, inquam, de voluptate quid sentit? Duo Reges: constructio interrete. 
Hoc loco tenere se Triarius non potuit. Minime vero istorum quidem, inquit. Sed haec omittamus; A mene tu? Iam id ipsum absurdum, maximum malum neglegi. Bork `,
   ` 66666 >>> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Illa tamen simplicia, vestra versuta. Quibusnam praeteritis? Hunc vos beatum; Polycratem Samium felicem appellabant. Idem iste, inquam, de voluptate quid sentit? Duo Reges: constructio interrete. 
Hoc loco tenere se Triarius non potuit. Minime vero istorum quidem, inquit. Sed haec omittamus; A mene tu? Iam id ipsum absurdum, maximum malum neglegi. Bork `,
];

export default function AddProject() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]); // State to hold Base64 encoded images
    const [error, setError] = useState(""); // State for handling errors
    const router = useRouter();

    const handleClick = async () => {
        const r1 = Math.floor(Math.random() * data.length);
        const r2 = Math.floor(Math.random() * 20 + 20);
        const r3 = Math.floor(Math.random() * 20 + 20);
        const item = data[r1];
        const randomTitle = `Title  ${item.slice(r2, r2 + 10)}`;
        const randomDescription = `Description ${item.slice(r3, r3 + 200)}`;

        setTitle(randomTitle);
        setDescription(randomDescription);
    };

    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files); // Convert FileList to an array
        const base64Images = await Promise.all(files.map(convertToBase64)); // Convert each image to Base64
        setImages(base64Images); // Set the state to the array of Base64 images
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result); // Resolve with the Base64 string
            reader.onerror = (error) => reject(error); // Reject on error
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission
        setError(""); // Clear any previous errors

        // formdata
        const projectData = new FormData(); // Use FormData to send both text and files
        projectData.append("title", title);
        projectData.append("description", description);
        const processImage = images.join("--this-is-indicator-for-images--");
        projectData.append("images", processImage);
        projectData.append("oldImages", JSON.stringify([]));

        try {
            const response = await fetch("/api/projects", {
                method: "POST",
                body: JSON.stringify({
                    title,
                    description,
                }), // Use FormData as the body
            });

            if (response.ok) {
                const json = await response.json();
                const responseUpdate = await fetch(
                    `/api/projects/images/${json._id}`,
                    {
                        method: "PATCH",
                        headers: {
                            id: json._id,
                        },
                        body: projectData, // Use FormData as the body
                    }
                );

                const jsonUpdate = await responseUpdate.json();

                // Redirect to the dashboard after successful project creation
                router.push("/dashboard");
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
            <button className="px-4 py-2 bg-red-200" onClick={handleClick}>
                Generate
            </button>
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
                <div className="mb-4">
                    <label className="block mb-2">Project Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full h-32 sm:h-24 p-4 sm:p-2 border rounded text-base sm:text-sm lg:text-lg resize-none"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Upload Images</label>
                    <input
                        type="file"
                        accept="image/*" // Accept only images
                        onChange={handleImageChange} // Handle file selection
                        multiple // Allow multiple files to be selected
                        className="w-full p-2 border rounded text-base sm:text-sm lg:text-lg"
                    />
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
