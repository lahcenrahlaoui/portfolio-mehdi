import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

const SliderImages = ({ list }) => {
    const [display, setDisplay] = useState(null);
    const [layoutId, setLayoutId] = useState(null);
    const swiperRef = useRef(null); // i added this line

    const handleOpen = (item, idx) => {
        setDisplay(item.length < 10 ? "" : item);
        setLayoutId(item + idx + "image");
    };

    useEffect(() => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.setTransition(0); // Disable animation effect
            swiperRef.current.swiper.slideTo(0, 0); // Reset to the first slide with no animation
        }
    }, [list]); // When `list` changes

    let details = display && (
        <motion.div
            onClick={() => handleOpen("", "")}
            className="flex justify-center items-center inset-0 absolute bg-black bg-opacity-80 transition-opacity duration-500 ease-in-out z-20"
        >
            <motion.img layoutId={layoutId} src={display} className="w-9/12 h-9/12 object-cover" alt="" />
        </motion.div>
    );

    let content = (
        <motion.div className="inset-0 w-full h-full ">
            <div className="flex justify-center items-center w-full h-full">
                <Swiper
                    ref={swiperRef} // Attach ref to Swiper - i added this line
                    className="w-full h-full"
                    slidesPerView={2}
                    spaceBetween={5}
                    pagination={{ clickable: true }}
                    modules={[Pagination]}
                >
                    {list.map((item, idx) => (
                        <SwiperSlide key={item + idx} className="w-full">
                            <motion.img
                                onClick={() => handleOpen(item, idx)}
                                layoutId={item + idx + "image"}
                                className="w-full h-full object-cover"
                                src={item}
                            />
                        </SwiperSlide>
                    ))}
                        <SwiperSlide   className=" ">
                            <motion.img
                               
                            />
                        </SwiperSlide>
                </Swiper>
            </div>
        </motion.div>
    );

    return (
        <div className="w-screen h-screen overflow-x-hidden">
            <div className="z-[9999] h-full">
                <div className="flex flex-col md:flex-row gap-5 md:justify-center w-full h-3/5">
                    {details}
                    {content}
                </div>
            </div>
        </div>
    );
};

export default SliderImages;
