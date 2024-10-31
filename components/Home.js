import { useEffect, useState } from "react";

export default function Home() {
    const [firstVisit, setFirstVisit] = useState(false);

    useEffect(() => {
        const hasVisited = window.localStorage.getItem("hasVisitedHome");
        if (!hasVisited) {
            setFirstVisit(true);
            window.localStorage.setItem("hasVisitedHome", "true");
        }
    }, []);

    return (
        <>
            <div className={"imageContainer   bg-[#1a1a1a] "}>
                <img
                    src="/assets/images/1.png"
                    className={`${"image"} ${"image1"}`}
                    alt="Image 1"
                />
                <img
                    src="/assets/images/2.png"
                    className={`${"image"} ${"image2"}`}
                    alt="Image 2"
                />
                <img
                    src="/assets/images/3.png"
                    className={`${"image"} ${"image3"}`}
                    alt="Image 3"
                />
            </div>
        </>
    );
}
