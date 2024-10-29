import Image from "next/image";
import { useState, useEffect } from "react";
import Loading from "./WorkComponent/Loading";
import SidebarProjects from "./WorkComponent/SidebarProjects";
import Projects from "./WorkComponent/Projects";

// Add missing constant
const PROJECTS_STORAGE_KEY = "projects";
const EXPIRATION_TIME = 1 * 1 * 1000; // 10 m
const Works = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    const [projectsSections, setProjectsSections] = useState([]);

    const [projects, setProjects] = useState([]);

    const [loading, setLoading] = useState(true);

    const [isProjectsSidebarOpen, setIsProjectsSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchProjects = async () => {
            const cachedProjects =
                window.localStorage.getItem(PROJECTS_STORAGE_KEY);
            const cachedData = cachedProjects
                ? JSON.parse(cachedProjects)
                : null;

            if (
                cachedData &&
                Date.now() - cachedData.timestamp < EXPIRATION_TIME
            ) {
                setProjects(cachedData.projects);
                setLoading(false);
                return;
            }

            const response = await fetch("/api/projects", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                const customOrder = [
                    "NEXUS", 
                    "NOAH", 
                    "MORPHEMES", 
                    "BIMAN", 
                    "PLACEBO", 
                    "TINNIT"
                ];

                const customSort = (data, order) => {
                    return data.sort((a, b) => {
                        return order.indexOf(a.title.toUpperCase()) - order.indexOf(b.title.toUpperCase());
                    });
                };
                console.log(data)
                console.log("----")
                console.log(customSort(data, customOrder))
                setProjects(customSort(data ,customOrder ));
             
                window.localStorage.setItem(
                    PROJECTS_STORAGE_KEY,
                    JSON.stringify({ projects: data, timestamp: Date.now() })
                );
            } else {
                console.error("Failed to fetch projects");
            }
            setLoading(false);
        };

        fetchProjects();
        const fetchProjectsSections = async () => {
            const cachedProjects =
                window.localStorage.getItem(PROJECTS_STORAGE_KEY);
            const cachedData = cachedProjects
                ? JSON.parse(cachedProjects)
                : null;

            if (
                cachedData &&
                Date.now() - cachedData.timestamp < EXPIRATION_TIME
            ) {
                setProjects(cachedData.projects);
                setLoading(false);
                return;
            }

            const response = await fetch("/api/project-sections", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setProjectsSections(data);
            } else {
                console.error("Failed to fetch projects");
            }
            setLoading(false);
        };

        fetchProjectsSections();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="flex flex-col h-max  ">
            {/* Mobile Projects Header */}
            <div className="fixed top-0 w-full bg-white z-20 md:hidden">
                <button
                    onClick={() =>
                        setIsProjectsSidebarOpen(!isProjectsSidebarOpen)
                    }
                    className="flex items-center p-4 text-gray-700"
                >
                    <span className="font-semibold">
                        {isProjectsSidebarOpen ? "✕ Close" : "☰ Projects"}
                    </span>
                </button>
            </div>

            {/*  Mobile slide-out  */}
          
                <div
                    className={` md:hidden fixed top-0 left-0 w-72 h-full bg-white transform transition-transform duration-300 ease-in-out z-10 
                  ${
                      isProjectsSidebarOpen
                          ? "translate-x-0"
                          : "-translate-x-full"
                  } 
                  md:translate-x-0`}
                >
                    <SidebarProjects
                        selectedProject={selectedProject}
                        projectsSections={projectsSections}
                        setSelectedProject={(project) => {
                            setSelectedProject(project);
                            setIsProjectsSidebarOpen(false);
                        }}
                        projects={projects}
                    />
                </div>
          

            {/*  Desktop   */}
         
                <div className="hidden md:block   w-fit md:fixed    z-10 ">
                    <SidebarProjects
                        selectedProject={selectedProject}
                        projectsSections={projectsSections}
                        setSelectedProject={setSelectedProject}
                        projects={projects}
                    />
                </div>
         

            {/* Overlay for mobile */}
            {isProjectsSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-[5] md:hidden"
                    onClick={() => setIsProjectsSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            {selectedProject && (
            <Projects
                projects={projects}
                selectedProject={selectedProject}
                projectsSections={projectsSections}
            />
        )
        }
        </div>
    );
};

export default Works;
