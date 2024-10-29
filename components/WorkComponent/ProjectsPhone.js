import Image from "next/image";
import SliderImages from "./SliderImages";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import { useMyContext } from "@/context/heightContext";

const ProjectsPhone = ({ projects, selectedProject, projectsSections }) => {
    const project = projects.find(
        (proj) => proj.title === selectedProject.title
    );

    const showImages = project.images.map((image)=>{
        console.log(image)
        return <img className="w-full h-40   px-2 m-2 " src={image } />
    })

    const { valueAboutRef, valueWorksRef } = useMyContext();

    return (
        <div
            style={{
                marginTop: `${valueAboutRef * 4}px`,
            }}
            className="  overflow-hidden flex items-center justify-center "
        >
            {/* {JSON.stringify(projectsSections)} */}
            {!JSON.stringify(projectsSections).includes(
                JSON.stringify(selectedProject)
            )
                ? !!projects.length && (
                      <div className="w-full px-4    ">{showImages}</div>
                  )
                : !!projectsSections.length && (
                      <div className="w-full px-4  ">
                          <h2 className="text-2xl font-bold text-black text-center">
                              {selectedProject.title}
                          </h2>
                          <div>
                              {selectedProject?.inputs?.map((input, index) =>
                                  input.type === "text" ? (
                                      <div classnName="bg-red-200">
                                          {input.value}
                                      </div>
                                  ) : (
                                      <img
                                          key={index}
                                          src={input.value}
                                          alt={`${
                                              selectedProject.title
                                          } Image ${index + 1}`}
                                          className="w-40 h-40 mb-2 object-cover rounded-lg"
                                      />
                                  )
                              )}
                          </div>
                      </div>
                  )}
        </div>
    );
};
export default ProjectsPhone;
