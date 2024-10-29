import Project from "@/models/projectSections"; // Assuming you have a Project model
import { connectToDB } from "@/utils/database";
import cloudinary from "@/utils/cloudinary";
//POST method
export async function PATCH(req) {
    const id = req.headers.get("id");
    console.log(id)
    try {
        await connectToDB();
    
        const data = await req.json();
        const images = JSON.parse(data.images)
       
        // Get all Base64 images
       
        const imagesKeys = Object.keys(images)
        const imagesValues = Object.values(images)

    
      
        async function retryCloudinaryUpload(  base64 , key ,  retries = 1,   delay = 1000 ) {
            try {
                const response = await cloudinary.uploader.upload(base64);
               
                return {url : response.secure_url , key  };
            } catch (error) {
                if (retries === 0) {
                   return 
                }
                console.log(`Retrying upload... (${retries} retries left)`);
                await new Promise((resolve) => setTimeout(resolve, delay));
                return retryCloudinaryUpload(base64 , key, retries - 1, delay);
            }
        }

        // Upload Base64 images to Cloudinary
        const imageUploadPromises = imagesValues.map(async (base64 , index ) => {
            try {
                if (!base64.length) return ;  
                return await retryCloudinaryUpload(base64 ,imagesKeys[index]  );
            } catch (err) {
                console.error("Error uploading image to Cloudinary:", err); // Handle Cloudinary errors
                throw err;
            }
        });

        
        const uploadedImages = await Promise.all(imageUploadPromises); // Wait for all uploads to complete
       
    


       const project = await Project.findOne(  { _id :  id}  );







 
 



 
 const inputs =  project.inputs



  

 const urlMapping = {};
 uploadedImages.forEach(item => {
   urlMapping[item.key] = item.url;
 });

 
 // Update inputs by replacing the value with the corresponding URL
 const updatedInputs = inputs.map(item => {
   return {
     type : item.type,
     value: urlMapping[item.value] || item.value // Replace with URL or keep original
   };
 });
 
 


 
 
       

     
       
        // const filterdImages = [...uploadedImages.filter(item => item) , ...oldImages ]
        // console.log("filteredImages")
        // console.log(filterdImages)

        // Create a new project with the uploaded image URLs
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { title : data.title , inputs : updatedInputs },
            { new: true }
        );

        console.log(updatedProject)
        return new Response(JSON.stringify(updatedProject), { status: 201 }); // Return the created project
    } catch (error) {
        console.error("Error creating project:", error); // Log any errors
        return new Response(
            JSON.stringify({ error: "Failed to create project" }),
            { status: 500 }
        );
    }
}
