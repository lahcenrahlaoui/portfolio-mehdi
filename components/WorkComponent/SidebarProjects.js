import { useMyContext } from "@/context/heightContext";

const SidebarProjects = ({ projects, setSelectedProject, selectedProject , projectsSections  }) => {



    const {  value } = useMyContext();
 
    
    return (
        <div className={` w-48 bg-white   h-screen text-black  border-r border-gray-200 py-3 md:py-0 overflow-y-auto`}>
            <div className={` flex flex-col pt-14 md:pt-0   `} style={{ marginTop: `${value/3.3+"px"}` }}>
                {[...projects , ...projectsSections].map((project, index) => (
                    <div className=" " key={project.title}>
                         <button
                                onClick={() => setSelectedProject(project)}
                                className={`w-full flex text-left py-2 px-4 text-base uppercase cursor-pointer
                                transition-all duration-200 ease-in-out   
                              
                            ${
                                selectedProject?.title === project?.title
                                    ? "text-black hover:text-gray-700 "
                                    : "text-gray-700 hover:text-gray-500 "
                            }`}
                            >
                                <a
                                    href="#"
                                    class="group transition duration-300 h-4 md:inline ease-in-out      "
                                >
                                    {project.title}
                                    
                                    <span class="block w-full h-0 group-hover:h-px transition-all duration-200 bg-gray-600"></span>
                                </a>

                                {/* Show title only on md screens and up */}
                            </button>
                    </div>
                ))}

            </div>
        
        </div> 
    );
};
export default SidebarProjects;
