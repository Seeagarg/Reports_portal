import { createContext, useState } from "react";

export const EditModalContext = createContext({
  openEdit: false,
  id:0,
  openEditHandler: () => {},
  closeEditHandler: () => {},
});

const EditModalProvider = ({ children }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [id,setId]=useState(0);
  const openEditHandler = (id) => {
    setOpenEdit(true);
    setId(id)
  };
  const closeEditHandler = () => {
    setOpenEdit(false);
  };
  const value = { openEdit, id,openEditHandler, closeEditHandler };
  return (
    <EditModalContext.Provider value={value}>
      {children}
    </EditModalContext.Provider>
  );
};
export default EditModalProvider;
