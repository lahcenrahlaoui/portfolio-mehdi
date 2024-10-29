"use client";
import { useState } from "react";
import { MyContext } from "@/context/heightContext";
const MyProvider = ({ children }) => {
    const [valueAboutRef, setValueAboutRef] = useState(null);
    const [valueWorksRef, setValueWorksRef] = useState(null);
    const [screenSize, setScreenSize] = useState(0);
    const [selectedProject, setSelectedProject] = useState(null);
    const [projectsSections, setProjectsSections] = useState([]);
    const [projects, setProjects] = useState([]);

    return (
        <MyContext.Provider
            value={{
                valueAboutRef,
                setValueAboutRef,
                valueWorksRef,
                setValueWorksRef,
                screenSize,
                setScreenSize,
                selectedProject,
                setSelectedProject,
                projectsSections,
                setProjectsSections,
                projects,
                setProjects,
            }}
        >
            {children}
        </MyContext.Provider>
    );
};
export { MyProvider };
