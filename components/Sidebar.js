"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useMyContext } from "@/context/heightContext";
import { AiFillYoutube, AiFillLinkedin, AiFillInstagram } from "react-icons/ai";

export default function Sidebar({ activeItem, handleItemClick }) {
    const {
        setValueWorksRef,
        setValueAboutRef,
        screenSize,
        setScreenSize,
        projects,
        setSelectedProject,
        selectedProject,
        projectsSections,
    } = useMyContext();

    const [textSize, setTextSize] = useState(0);

    const aboutRef = useRef(null);
    const worksRef = useRef(null);
    const nameRef = useRef(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const updateScreenSize = () => {
            const screenWidth = window.innerWidth;

            setTextSize(screenWidth);
            setScreenSize(screenWidth);
            setShow(true);
        };

        updateScreenSize(); // Call on initial load
        window.addEventListener("resize", updateScreenSize);

        return () => {
            window.removeEventListener("resize", updateScreenSize);
        };
    }, []);

    useLayoutEffect(() => {
        if (show) {
            const y1 = aboutRef?.current?.offsetLeft;
            const y2 = worksRef?.current?.getBoundingClientRect()?.y;
            console.log(aboutRef);
            setValueAboutRef(y1);
            setValueWorksRef(y2);
            console.log("About offsetLeft:", y1);
            console.log("Works offsetTop:", y2);
        }
    }, [show]);

    return (
        <>
            {screenSize > 768 ? (
                <div
                    className="  fixed pt-10 shadow-lg left-0 h-full bg-white  text-black transition-all duration-100"
                    style={{
                        width: `${textSize / 6}px`, // Dynamically set width based on screen size
                        fontSize: `${textSize / 30}px`,
                    }}
                >
                    {show && (
                        <>
                            {" "}
                            <ul className=" justify-start items-center uppercase pl-4">
                                <li
                                    className="flex flex-col w-full mb-5"
                                    onClick={() => handleItemClick("Home")}
                                >
                                    <div
                                        style={{
                                            fontSize: textSize / 37 + "px",
                                        }}
                                        className="flex gap-2 w-full  "
                                    >
                                        <span
                                            ref={nameRef}
                                            className="font-BigShouldersDisplay tracking-wide font-bold uppercase cursor-pointer"
                                        >
                                            Mehdi
                                        </span>
                                        <span className="font-BigShouldersDisplay tracking-wide font-bold uppercase cursor-pointer">
                                            Hachid
                                        </span>
                                    </div>
                                </li>
                                <li
                                    style={{
                                        fontSize: textSize / 145 + "px",
                                    }}
                                    className="flex flex-col w-full mb-16"
                                >
                                    <div className="flex  w-full">
                                        <span className="      whitespace-nowrap text-gray-700">
                                            Multimedia Artist -
                                        </span>
                                        <span className="      whitespace-nowrap text-gray-700">
                                            Artistic Director
                                        </span>
                                    </div>
                                </li>

                                <li
                                    style={{
                                        fontSize:
                                            textSize / (textSize / 15) + "px",
                                    }}
                                    ref={aboutRef}
                                    className="flex w-full mb-5"
                                >
                                    <button
                                        onClick={() => handleItemClick("About")}
                                        className={`flex w-36 font-BigShouldersDisplay tracking-wide font-bold uppercase cursor-pointer ${
                                            activeItem === "About"
                                                ? "text-black hover:text-gray-700"
                                                : "text-gray-700 hover:text-gray-500"
                                        }`}
                                    >
                                        <a
                                            href="#"
                                            className="group transition duration-200 h-4 md:inline ease-in-out"
                                        >
                                            About
                                            <span className="block w-full h-0 group-hover:h-px transition-all duration-200 bg-gray-600"></span>
                                        </a>
                                    </button>
                                </li>

                                <li
                                    onClick={() => handleItemClick("Works")}
                                    style={{
                                        fontSize:
                                            textSize / (textSize / 15) + "px",
                                    }}
                                    ref={worksRef}
                                    className=" flex w-full mb-5"
                                >
                                    <button
                                        className={`flex font-BigShouldersDisplay tracking-wide font-bold uppercase cursor-pointer
                              ${
                                  activeItem === "Works"
                                      ? "text-black hover:text-gray-700"
                                      : "text-gray-700 hover:text-gray-500"
                              }`}
                                    >
                                        <a
                                            href="#"
                                            className="group transition duration-200 h-4 md:inline ease-in-out"
                                        >
                                            Works
                                            <span className="block w-full h-0 group-hover:h-px transition-all duration-200 bg-gray-600"></span>
                                        </a>
                                    </button>
                                </li>
                            </ul>
                            <div
                                style={{
                                    fontSize: textSize / 37 + "px",
                                }}
                                className="h-full relative "
                            >
                                <div className="fixed bottom-2 w-full flex gap-1 px-4  ">
                                    <a
                                        href="https://www.youtube.com/@mehdihachid"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <AiFillYoutube />
                                    </a>
                                    <a
                                        href="https://dz.linkedin.com/in/mehdi-hachid-45782841"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <AiFillLinkedin />
                                    </a>
                                    <a
                                        href="https://www.instagram.com/mehdi_hachid/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <AiFillInstagram />
                                    </a>
                                    <a
                                        href="https://www.instagram.com/mehdi_hachid/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <AiFillInstagram />
                                    </a>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <div
                    className="  fixed pt-20 shadow-lg px-6 left-0 h-screen text-black transition-all duration-300"
                    style={{
                        // Dynamically set width based on screen size
                        fontSize: `${textSize / 80}px`,
                    }}
                >
                    {show && (
                        <>
                            <ul className="  justify-start items-center uppercase   w-full  ">
                                {/* Removed Multimedia Artist and Artistic Director */}
                                <li
                                    style={{
                                        fontSize:
                                            textSize / (textSize / 15) + "px",
                                    }}
                                    ref={aboutRef}
                                    className="flex w-full mb-5"
                                >
                                    <button
                                        onClick={() => handleItemClick("About")}
                                        className={`flex   font-BigShouldersDisplay tracking-wide font-bold uppercase cursor-pointer ${
                                            activeItem === "About"
                                                ? "text-black hover:text-gray-700"
                                                : "text-gray-700 hover:text-gray-500"
                                        }`}
                                    >
                                        <a
                                            href="#"
                                            className="group transition duration-200 h-4 md:inline ease-in-out"
                                        >
                                            About
                                            <span className="block w-full h-0 group-hover:h-px transition-all duration-200 bg-gray-600"></span>
                                        </a>
                                    </button>
                                </li>
                                <li
                                    onClick={() => handleItemClick("Works")}
                                    style={{
                                        fontSize:
                                            textSize / (textSize / 15) + "px",
                                    }}
                                    ref={worksRef}
                                    className="flex w-full mb-2"
                                >
                                    <button
                                        className={`flex  font-BigShouldersDisplay tracking-wide font-bold uppercase cursor-pointer ${
                                            activeItem === "Works"
                                                ? "text-black hover:text-gray-700"
                                                : "text-gray-700 hover:text-gray-500"
                                        }`}
                                    >
                                        <a
                                            href="#"
                                            className="group transition duration-200 h-4 md:inline ease-in-out"
                                        >
                                            Works
                                            <span className="block w-full h-0 group-hover:h-px transition-all duration-200 bg-gray-600"></span>
                                        </a>
                                    </button>
                                </li>
                                {activeItem === "Works" &&
                                    [...projects].map((project, index) => (
                                        <div className=" " key={project.title}>
                                            <button
                                                onClick={() =>
                                                    setSelectedProject(project)
                                                }
                                                className={`w-full flex text-left py-2   text-base uppercase cursor-pointer
                                                transition-all duration-200 ease-in-out   
                                              
                                            ${
                                                selectedProject?.title ===
                                                project?.title
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
                            </ul>
                            <div
                                style={{
                                    fontSize: textSize / (textSize / 25) + "px",
                                }}
                                className="h-full relative"
                            >
                                <div className="absolute bottom-28 text-4xl  w-full flex flex-col gap-2 px-4 ">
                                    <a
                                        className="flex gap-1 items-center"
                                        href="https://www.youtube.com/@mehdihachid"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <AiFillYoutube />
                                    </a>
                                    <a
                                        className="flex gap-1 items-center"
                                        href="https://dz.linkedin.com/in/mehdi-hachid-45782841"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <AiFillLinkedin />
                                    </a>
                                    <a
                                        className="flex gap-1 items-center"
                                        href="https://www.instagram.com/mehdi_hachid/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <AiFillInstagram />
                                    </a>
                                    <a
                                        className="flex gap-1 items-center"
                                        href="https://www.instagram.com/mehdi_hachid/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <AiFillInstagram />
                                    </a>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
}
