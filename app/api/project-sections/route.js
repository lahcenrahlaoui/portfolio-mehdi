import ProjectSections from "@/models/projectSections"; // Assuming you have a Project model
import { connectToDB } from "@/utils/database";

// GET method
export async function GET(req) {
    try {
        await connectToDB();
        const projectsSections = await ProjectSections.find({});

        return new Response(JSON.stringify(projectsSections), { status: 200 });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Failed to fetch projects" }),
            { status: 401 }
        );
    }
}

export async function POST(req) {
    console.log("Posting data");
    try {
        await connectToDB();

        const props = await req.json();


        console.log(props)
        const newProject = new ProjectSections({
            title : props.title,
            inputs: props.inputs,
        });
        await newProject.save();

        return new Response(JSON.stringify(newProject), { status: 201 }); // Return the created project
    } catch (error) {
        console.error("Error creating project:", error); // Log any errors
        return new Response(
            JSON.stringify({ error: "Failed to create project" }),
            { status: 500 }
        );
    }
}
