import { createContext, useState } from "react";

export const EditProjectDetailsContext = createContext({
  openEdit: false,
  id:null,
  data:[],
  openEditHandler: () => {},
  closeEditHandler: () => {},
});

const EditProjectDetailsProvider = ({ children }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [id,setId]=useState(0);
  const [data,setData]=useState([]);
  const openEditHandler = (id,gotData) => {
    setOpenEdit(true);
    setData(()=>gotData.filter((value)=>value?.id==id));
    setId(id)
  };
  const closeEditHandler = () => {
    setOpenEdit(false);
  };
  const value = { openEdit, id,data,openEditHandler, closeEditHandler };
  return (
    <EditProjectDetailsContext.Provider value={value}>
      {children}
    </EditProjectDetailsContext.Provider>
  );
};
export default EditProjectDetailsProvider;
