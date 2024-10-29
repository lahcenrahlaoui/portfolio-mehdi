import { useEffect, useState , useLayoutEffect , useRef } from "react";

export default function About() {
    const [firstVisit, setFirstVisit] = useState(false);

    useEffect(() => {
        const hasVisited = window.localStorage.getItem("hasVisitedAbout");
        if (!hasVisited) {
            setFirstVisit(true);
            window.localStorage.setItem("hasVisitedAbout", "true");
        }
    }, []);

    const [marginValue, setMarginValue] = useState();

    const marginTop = useRef(null);

    useLayoutEffect(() => {
        setTimeout(() => {
            setMarginValue(window.innerWidth); 
        }, 0);

        window.addEventListener("resize", () => {
            setTimeout(() => {
                setMarginValue(window.innerWidth);
                console.log("window.innerWidth");
                console.log(window.innerWidth);
            }, 100);
        });

        return window.removeEventListener("resize", () => {
            setTimeout(() => {
                setMarginValue(window.innerWidth);
                console.log("window.innerWidth");
                console.log(window.innerWidth);
            }, 100);
        });
    }, []);

    return (
        <>
            <div ref={marginTop} style={{
                marginTop: 
                marginValue > 400 ? `${marginValue / 20}px` : // Case 1: less than 500
                marginValue > 500 ? `${marginValue / 50}px` : // Case 1: less than 500
                marginValue > 1000 ? `${marginValue / 15}px` : // Case 2: 500 to less than 1000
                marginValue > 1500 ? `${marginValue / 12}px` : // Case 3: 1000 to less than 1500
                `${marginValue / 10}px`, // Default case: 1500 or more
                backgroundColor: marginValue < 400 ? "bg-red-200 p-20 " :"bg-green-200 p-20"
            }} 
            className="   grid grid-cols-1 md:grid-cols-2  transition-all   ease-in-out">
                <img
                    src="/assets/images/About-Mehdi-1.jpg"
                    className="  border-gray-200  md:h-screen object-contain transition-transform  ease-in-out transform "
                />
                <img
                    src="/assets/images/About-Mehdi-2.jpg"
                    className="md:h-screen object-contain transition-transform   ease-in-out transform  "
                />
            </div>
        </>
    );
}
