//Global context for managing toggle state of mobile navbar

import { createContext,useState } from "react";

export const MobileNavbarContext=createContext({
    show:false,
    showHandler:()=>{}
});

const MobileNavbarProvider=({children})=>{
    const [show,setShow]=useState(false);
    const showHandler=()=>{
        setShow(prevShow=>!prevShow);
    }
    const value={show,showHandler};
    return <MobileNavbarContext.Provider value={value}>{children}</MobileNavbarContext.Provider>
}
export default MobileNavbarProvider;