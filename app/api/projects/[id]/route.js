import Project from "@/models/project";
import { connectToDB } from "@/utils/database";

export async function GET(req, { params }) {
    const { id } = params; // Get the project ID from URL parameters

    try {
        await connectToDB();
        const project = await Project.findById(id); // Fetch the project by ID

        if (!project) {
            return new Response(
                JSON.stringify({ error: "Project not found" }),
                { status: 404 }
            );
        }

        return new Response(JSON.stringify(project), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}

// PUT method
export async function PUT(req) {
    const id = req.headers.get("id");

    try {
        await connectToDB();
        const { title, description } = await req.json();
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { title, description },
            { new: true }
        );
        return new Response(JSON.stringify(updatedProject), { status: 200 });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Failed to update project" }),
            { status: 401 }
        );
    }
}

// DELETE method
export async function DELETE(req) {
    const id = req.headers.get("id");
    console.log("id")
    console.log(id)
    try {
        await connectToDB();
        await Project.findByIdAndDelete({ _id: id });
        return new Response(null, { status: 204 }); // No content
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Failed to delete project" }),
            { status: 401 }
        );
    }
}
