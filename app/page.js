"use client";
import About from "@/components/About";

import Sidebar from "@/components/Sidebar";
import Home from "@/components/Home";
import Works from "@/components/Works";
import { useState, useEffect, useRef, useLayoutEffect } from "react";

export default function App() {
    const [activeItem, setActiveItem] = useState("Home");

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

    const nameRef = useRef(null);

    useLayoutEffect(() => {
        setTimeout(() => {
            setTextSize(window.innerWidth); 
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

    return (
        <div className=" grid  h-max   grid-cols-12 divide-x ">
            <div className="col-span-3 md:col-span-2   ">
                <Sidebar
                    activeItem={activeItem}
                    handleItemClick={handleItemClick}
                />
            </div>
            <div className="  col-span-9 md:col-span-10 ">
                <div
                    className="flex   bg-white flex-col w-full  px-5 md:hidden   py-4"
                    onClick={() => handleItemClick("Home")}
                >
                    <div
                        style={{
                            fontSize: textSize < 150 ? textSize / 30 + "px" : textSize / 20 + "px",  
                          }}
                        className="flex justify-end gap-2 w-full"
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
                {activeItem === "Home" && <Home />}

                {activeItem === "Works" && <Works />}
                {activeItem === "About" && <About />}
            </div>
        </div>
    );
}
