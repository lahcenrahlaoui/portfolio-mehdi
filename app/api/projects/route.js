import Project from "@/models/project"; // Assuming you have a Project model
import { connectToDB } from "@/utils/database";

// GET method
export async function GET(req) {
    try {
        await connectToDB();
        const projects = await Project.find({});

        return new Response(JSON.stringify(projects), { status: 200 });
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

        const { title, description } = await req.json();

        const newProject = new Project({
            title,
            description,
            images: [],
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
