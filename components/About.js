import { useEffect, useState, useLayoutEffect, useRef } from "react";
import { useMyContext } from "@/context/heightContext";

export default function About() {
    const [firstVisit, setFirstVisit] = useState(false);

    useEffect(() => {
        const hasVisited = window.localStorage.getItem("hasVisitedAbout");
        if (!hasVisited) {
            setFirstVisit(true);
            window.localStorage.setItem("hasVisitedAbout", "true");
        }
    }, []);

    const { valueAboutRef, valueWorksRef, screenSize } = useMyContext();

    console.log("valueAboutRef");
    console.log(valueAboutRef);
    return (
        <>
            <div
                style={{
                    marginTop:
                        screenSize > 768
                            ? `${valueAboutRef * 1.5}px`
                            : `${valueAboutRef * 2}px`,
                }}
                className=" flex flex-col items-center justify-center  gap-4 transition-all ease-in-out px-8 py-4    "
            >
                <img
                    src="/assets/images/Mehdi.jpg"
                    className=" w-64 h-64 md:w-96 md:h-96 transition-transform ease-in-out transform  "
                />
                <div className=" text-xs md:text-lg text-center   flex flex-col justify-center">
                    <p>
                        Beginning his career in photography, Mehdi Hachid
                        quickly turned to other disciplines such as the visual
                        arts, cinema and art direction, abolishing all
                        boundaries between subjects and practices.
                    </p>
                    <p>
                        His protean work oscillates between two distinct but
                        complementary universes. The first produces work of an
                        assumed complexity, in which form, movement and emotion
                        are bril- liantly interwoven, served by an acute sense
                        of graphic design. The second world is one of
                        minimalist, stripped-back abstraction, where only the
                        purest expression of emotion is pre- served, guided by a
                        subtle bundle of connotations.
                    </p>
                    <p>
                        Mehdi Hachid's work constantly seeks to free itself from
                        notions of normalisation. Experi- mentation plays a
                        central role, offering several levels of interpretation
                        in which the creative process counts as much as the
                        final result.
                    </p>
                    <p>
                        The last few years have seen some important milestones
                        in the artist's career. In 2023, he presented Nexus, an
                        immersive audiovisual installation exhibited in
                        Constantine. And in 2024, he participated for the first
                        time in a major international event by exhibiting at the
                        Izmir Design Biennial in Turkey.
                    </p>

                    <p>
                        With a cross-disciplinary approach, Mehdi Hachid
                        continues to explore new avenues of ex- pression at the
                        crossroads of art and science, always seeking to push
                        back the boundaries of his creative practice.
                    </p>
                </div>
            </div>
        </>
    );
}
