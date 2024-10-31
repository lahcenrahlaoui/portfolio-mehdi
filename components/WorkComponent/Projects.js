
import SliderImages from "./SliderImages";

import "swiper/css";
import "swiper/css/effect-cards";
import { useMyContext } from "@/context/heightContext";

const Projects = ({ projects, selectedProject, projectsSections }) => {
    
    const showImages = <SliderImages list={selectedProject?.images} />;

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
export default Projects;
