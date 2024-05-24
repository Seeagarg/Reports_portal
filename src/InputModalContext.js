import { createContext, useState } from "react";

export const InputModalContext = createContext({
  openInput: false,
  postbackUrl:"",
  service:"",
  partnerName:"",
  openInputHandler: () => {},
  closeInputHandler: () => {},
});

const InputModalProvider = ({ children }) => {
  const [openInput, setOpenInput] = useState(false);
const [postbackUrl,setPostbackUrl]=useState("");
const [service,setService]=useState("");
const [partnerName,setPartnerName]=useState("");
  const openInputHandler = (data) => {
    setOpenInput(true);
    setPostbackUrl(data.postbackUrl);
    setService(data.service);
    setPartnerName(data.partnerName);
};
  const closeInputHandler = () => {
    setOpenInput(false);
    setPostbackUrl("");
    setService("");
    setPartnerName("");
  };
  const value = { openInput,openInputHandler, closeInputHandler,postbackUrl,service,partnerName };
  return (
    <InputModalContext.Provider value={value}>
      {children}
    </InputModalContext.Provider>
  );
};
export default InputModalProvider;
