import Project from "@/models/project"; // Assuming you have a Project model
import { connectToDB } from "@/utils/database";
import cloudinary from "@/utils/cloudinary";
//POST method
export async function PATCH(req) {
    const id = req.headers.get("id");
    try {
        await connectToDB();
        const formData = await req.formData(); // Get FormData from the request
        const title = formData.get("title"); // Extract title
        const description = formData.get("description"); // Extract description
        const oldImages = await JSON.parse(formData.get("oldImages"));
      console.log("oldImages");
      console.log(oldImages);
      console.log("oldImages");

        // Get all Base64 images
        const base64Images = formData.get("images").split("--this-is-indicator-for-images--");
      
        async function retryCloudinaryUpload(  base64,  retries = 1,   delay = 1000 ) {
            try {
                const response = await cloudinary.uploader.upload(base64);
                console.log(response.secure_url);
                return response.secure_url;
            } catch (error) {
                if (retries === 0) {
                   return 
                }
                console.log(`Retrying upload... (${retries} retries left)`);
                await new Promise((resolve) => setTimeout(resolve, delay));
                return retryCloudinaryUpload(base64, retries - 1, delay);
            }
        }

        // Upload Base64 images to Cloudinary
        const imageUploadPromises = base64Images.map(async (base64) => {
            try {
                if (!base64.length) return ;  
                return await retryCloudinaryUpload(base64);
            } catch (err) {
                console.error("Error uploading image to Cloudinary:", err); // Handle Cloudinary errors
                throw err;
            }
        });

        
        const uploadedImages = await Promise.all(imageUploadPromises); // Wait for all uploads to complete
        const filterdImages = [...uploadedImages.filter(item => item) , ...oldImages ]
        console.log("filteredImages")
        console.log(filterdImages)

        // Create a new project with the uploaded image URLs
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { title, description, images: filterdImages },
            { new: true }
        );

        return new Response(JSON.stringify(updatedProject), { status: 201 }); // Return the created project
    } catch (error) {
        console.error("Error creating project:", error); // Log any errors
        return new Response(
            JSON.stringify({ error: "Failed to create project" }),
            { status: 500 }
        );
    }
}
