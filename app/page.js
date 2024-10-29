"use client";
import About from "@/components/About";

import Sidebar from "@/components/Sidebar";
import Home from "@/components/Home";
import Works from "@/components/Works";
import { useState, useEffect, useRef, useLayoutEffect } from "react";

export default function App() {
    const [activeItem, setActiveItem] = useState("Works");

    // Effect to load the last selected item from local storage on the client

    // Effect to save the active item to local storage
    useEffect(() => {
        if (typeof window !== "undefined" && activeItem) {
            window.localStorage.setItem("activeItem", activeItem);
        }
    }, [activeItem]);

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    const [textSize, setTextSize] = useState();
    const [screenSize, setScreenSize] = useState();

    const nameRef = useRef(null);

    useLayoutEffect(() => {
        setTimeout(() => {
            setTextSize(window.innerWidth);
            const x = window.innerWidth / 100;
            setScreenSize(x);
        }, 0);

        window.addEventListener("resize", () => {
            setTimeout(() => {
                setTextSize(window.innerWidth);
                const x = window.innerWidth / 100;
                setScreenSize(x);
            }, 100);
        });

        return window.removeEventListener("resize", () => {
            setTimeout(() => {
                setTextSize(window.innerWidth);
                const x = window.innerWidth / 100;
                setScreenSize(x);
            }, 100);
        });
    }, []);

    return (
        <div className={` flex justify-between w-full md:px-5`}>
        
            <div className="z-50 basis-3/12 md:basis-2/12  ">
                <Sidebar
                    activeItem={activeItem}
                    handleItemClick={handleItemClick}
                />
            </div>
            <div
                style={{width: screenSize * 75 + "px"}}
                className="  flex flex-col justify-center items-center -z-1 basis-9/12 md:basis-10/12  " >
                <div
                    className={`flex sticky top-0 right-10  bg-white flex-col w-full  px-5 md:hidden py-2 z-20`}
                    onClick={() => handleItemClick("Home")}
                >
                    <div
                        style={{
                            fontSize:  textSize / (textSize/25) + "px" 
                        }}
                        className="flex justify-end gap-2 w-full  "
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
                </div>
                {/* {activeItem === "Home" && <Home />} */}

                {activeItem === "Works" && <Works />}
                {activeItem === "About" && <About />}
            </div>
        </div>
    );
}
