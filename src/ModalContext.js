import { createContext ,useState} from "react";

export const ModalContext=createContext({
    open:false,
    openHandler:()=>{},
    closeHandler:()=>{}
});

const ModalProvider=({children})=>{
    const [open,setOpen]=useState(false);
    const openHandler=()=>{
        setOpen(true)
    }
    const closeHandler=()=>{
        setOpen(false);
    }
    const value={open,openHandler,closeHandler}
    return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}
export default ModalProvider;