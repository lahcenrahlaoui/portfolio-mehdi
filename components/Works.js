import Image from "next/image";
import { useState, useEffect } from "react";
import Loading from "./WorkComponent/Loading";
import SidebarProjects from "./WorkComponent/SidebarProjects";
import Projects from "./WorkComponent/Projects";
import ProjectsPhone from "./WorkComponent/ProjectsPhone";
import { useMyContext } from "@/context/heightContext";

// Add missing constant
const PROJECTS_STORAGE_KEY = "projects";
const EXPIRATION_TIME = 60 * 60 * 1000; // 10 m

const Works = () => {
    const [loading, setLoading] = useState(true);

    const {
        setProjects,
        screenSize,
        projects,
        setSelectedProject,
        selectedProject,
        projectsSections,
    } = useMyContext();

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
                    "TINNIT",
                ];

                const customSort = (data, order) => {
                    return data.sort((a, b) => {
                        return (
                            order.indexOf(a.title.toUpperCase()) -
                            order.indexOf(b.title.toUpperCase())
                        );
                    });
                };
                console.log(data);
                console.log("----");
                console.log(customSort(data, customOrder));
                setProjects(customSort(data, customOrder));

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

        // fetchProjectsSections();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="flex flex-row w-full overflow-hidden ">
            {/* Main Content */}
            {/*  Desktop   */}
            {screenSize > 768 ? (
                <div className=" basis-2/12  z-10    ">
                    <SidebarProjects
                        selectedProject={selectedProject}
                        projectsSections={projectsSections}
                        setSelectedProject={setSelectedProject}
                        projects={projects}
                    />
                </div>
            ) : (
                <div className=" basis-2/12 w-fit z-10   "></div>
            )}

            {screenSize > 768 ? (
                selectedProject ? (
                    <div className="basis-10/12  ">
                        <Projects
                            projects={projects}
                            selectedProject={selectedProject}
                            projectsSections={projectsSections}
                        />
                    </div>
                ) : (
                    <div className="basis-10/12  "></div>
                )
            ) : selectedProject ? (
                <div className="basis-9/12  ">
                    <ProjectsPhone
                        projects={projects}
                        selectedProject={selectedProject}
                        projectsSections={projectsSections}
                    />
                </div>
            ) : (
                <div className="basis-10/12  "></div>
            )}
        </div>
    );
};

export default Works;
