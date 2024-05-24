import { createContext ,useState} from "react";

export const ProjectDetailsContext=createContext({
    openProjectDetailsModal:false,
    openProjectDetailsModalHandler:()=>{},
    closeProjectDetailsModalHandler:()=>{}
});

const ProjectDetailsModalProvider=({children})=>{
    const [openProjectDetailsModal,setOpenProjectDetailsModal]=useState(false);
    const openProjectDetailsModalHandler=()=>{
        setOpenProjectDetailsModal(true)
    }
    const closeProjectDetailsModalHandler=()=>{
        setOpenProjectDetailsModal(false);
    }
    const value={openProjectDetailsModal,openProjectDetailsModalHandler,closeProjectDetailsModalHandler}
    return <ProjectDetailsContext.Provider value={value}>{children}</ProjectDetailsContext.Provider>
}
export default ProjectDetailsModalProvider;