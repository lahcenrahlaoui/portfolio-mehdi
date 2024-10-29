import Image from "next/image";
import SliderImages from "./SliderImages";

import React, { useEffect , useRef, useState } from "react";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

const Projects = ({ projects, selectedProject, projectsSections }) => {
    const project = projects.find(
        (proj) => proj.title === selectedProject.title
    );
 
    // const showImages = project?.images?.map((image, index) => (
    //     <img
    //         key={index}
    //         src={image}
    //         alt={`${selectedProject.title} Image ${
    //             index + 1
    //         }`}
    //         className="w-full mb-2 object-cover rounded-lg"
    //     />
    // ))

    const showImages = <SliderImages list={selectedProject?.images} />;

    // const [screenWidth, setScreenHeight] = useState(() => {
    //     return Math.floor(window.innerWidth / 300) - 1 || 1;
    // });
   

    // const [display, setDisplay] = useState(null);

 

    // const list = project?.images;

    // let details;
    // let content;
    // const handleOpen = async (item) => {
      
    //     if ( item.length < 2 ) {
    //         setDisplay(null);
    //         details = null 
    //     } else {
    //         setDisplay(item);
    //     }
    // };


    // if (1) {
    //     <AnimateSharedLayout>
    //         <AnimatePresence>
    //             {display &&
    //                 (details = (
    //                     <motion.div 

    //                         onClick={() => handleOpen("")}
    //                         className=" flex justify-center items-center inset-0 
    //                                 absolute bg-black bg-opacity-90 transition-opacity 
    //                                 duration-500 ease-in-out z-20 
    //                             "
    //                     >
    //                         <motion.img
    //                             layoutId={display + "image"}
    //                             src={display}
    //                             className="w-2/4 h-4/5"
    //                             alt=""
    //                         />
    //                     </motion.div >
    //                 ))}
    //         </AnimatePresence>

    //         {
    //             (content = (
    //                 <motion.div className=" inset-0 w-full   ">
    //                     <div className="  flex justify-center items-center w-full    h-96 ">
    //                         <Swiper
    //                             className="w-full h-full "
    //                             slidesPerView={screenWidth}
    //                             spaceBetween={5}
    //                             centeredSlides={true}
    //                             pagination={{ clickable: true }}
    //                             modules={[Pagination]}
    //                         >
    //                             {list.map((item, idx) => {
    //                                 console.log("item")
    //                                 console.log("item") 
    //                                 console.log(idx)
    //                                 console.log(item)
    //                                 console.log("item")
    //                                 console.log("item")
    //                                 console.log("item")
    //                                 return (
    //                                     <SwiperSlide className="w-full"> 
    //                                         <motion.img
    //                                             onClick={() => handleOpen(item)}
    //                                             layoutId={item + "image"}
    //                                             className=" w-full h-full object-cover "
    //                                             src={item}
    //                                         /> 
    //                                     </SwiperSlide>
    //                                 );
    //                             })}
    //                         </Swiper>
    //                     </div>
    //                 </motion.div>
    //             ))
    //         }
    //     </AnimateSharedLayout>;
    // }

    return (
        <div className="md:ml-64 flex-grow overflow-hidden mb-20">
            {/* {JSON.stringify(projectsSections)} */}
            {!JSON.stringify(projectsSections).includes(
                JSON.stringify(selectedProject)
            )
                ? !!projects.length && (
                      <div className="w-full px-4 mt-20 md:mt-40 py-2 ">
                          {/* <h2 className="text-2xl font-bold text-black text-center">
                              {selectedProject.title}
                          </h2>
                          <p className="mt-2 mb-14 text-black text-center text-lg px-2 md:px-14">
                              {selectedProject.description}
                          </p> */}

                       {showImages}
                      </div>
                  )
                : !!projectsSections.length && (
                      <div className="w-full px-4 mt-20 md:mt-8 py-2">
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
export default Projects;

{
    /* <Image
    key={index}
    src={image}
    alt={`${selectedProject.title} Image ${index + 1}`}
    width={350}
    height={1100}
    className="w-full mb-2 inset-0 object-cover rounded-lg"
/> */
}
