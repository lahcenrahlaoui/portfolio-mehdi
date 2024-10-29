"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useMyContext } from "@/context/heightContext";
import { AiFillYoutube, AiFillLinkedin, AiFillInstagram } from "react-icons/ai";

export default function Sidebar({ activeItem, handleItemClick }) {
    const { setValue } = useMyContext();
    const [textSize, setTextSize] = useState();
    const liRef = useRef(null);
    const nameRef = useRef(null);
    const [show, setShow] = useState(false);

    useLayoutEffect(() => {
        setTimeout(() => {
            setTextSize(window.innerWidth);
            setShow(true);
            console.log("window.innerWidth");
            console.log(window.innerWidth);
        }, 0);

        window.addEventListener("resize", () => {
            setTimeout(() => {
                setTextSize(window.innerWidth);
                console.log("window.innerWidth");
                console.log(window.innerWidth);
            }, 100);
        });

        return window.removeEventListener("resize", () => {
            setTimeout(() => {
                setTextSize(window.innerWidth);
                console.log("window.innerWidth");
                console.log(window.innerWidth);
            }, 100);
        });
    }, []);

    useEffect(() => {
        const y = liRef?.current?.getBoundingClientRect()?.y;
        setValue(y);
    }, [liRef?.current]);

    return (
        <>
            <div className="fixed hidden md:flex flex-col h-screen bg-white text-black   pt-10 ">
                {show && (
                    <>
                        {" "}
                        <ul className="block justify-start items-center uppercase pl-4">
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
                                style={{ fontSize: textSize / 85 + "px" }}
                                ref={liRef}
                                className=" flex w-full mb-8"
                            >
                                <button
                                    onClick={() => handleItemClick("About")}
                                    className={`flex    font-BigShouldersDisplay tracking-wide font-bold uppercase cursor-pointer
                                ${
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
                                style={{ fontSize: textSize / 85 + "px" }}
                                ref={liRef}
                                className=" flex w-full mb-8"
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
            <div className=" fixed flex md:hidden flex-col h-screen bg-white text-black   pt-10">
                {show && (
                    <>
                        <ul className="block justify-start items-center uppercase pl-4 mt-10">
                            {/* Removed Multimedia Artist and Artistic Director */}
                            <li
                                style={{
                                    fontSize:
                                        textSize < 150
                                            ? textSize / 85 + "px"
                                            : textSize / 50 + "px",
                                }}
                                ref={liRef}
                                className="flex w-full mb-2"
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
                                        textSize < 150
                                            ? textSize / 85 + "px"
                                            : textSize / 50 + "px",
                                }}
                                ref={liRef}
                                className="flex w-full mb-2"
                            >
                                <button
                                    className={`flex w-36 font-BigShouldersDisplay tracking-wide font-bold uppercase cursor-pointer ${
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
                            className="h-full relative"
                        >
                            <div className="absolute bottom-4 w-full flex flex-col gap-1 px-4 ">
                                <a
                                    className="flex gap-1 items-center"
                                    href="https://www.youtube.com/@mehdihachid"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <AiFillYoutube />
                                    <span className="text-[6px]">
                                        mehdi.hachid
                                    </span>
                                </a>
                                <a
                                    className="flex gap-1 items-center"
                                    href="https://dz.linkedin.com/in/mehdi-hachid-45782841"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <AiFillLinkedin />
                                    <span className="text-[6px]">
                                        mehdi.hachid
                                    </span>
                                </a>
                                <a
                                    className="flex gap-1 items-center"
                                    href="https://www.instagram.com/mehdi_hachid/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <AiFillInstagram />
                                    <span className="text-[6px]">
                                        mehdi.hachid
                                    </span>
                                </a>
                                <a
                                    className="flex gap-1 items-center"
                                    href="https://www.instagram.com/mehdi_hachid/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <AiFillInstagram />
                                    <span className="text-[6px]">
                                        mehdi.hachid
                                    </span>
                                </a>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
