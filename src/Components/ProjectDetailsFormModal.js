import React, { useContext, useEffect, useState } from "react";
import {
  TextField,
  Button,
  Modal,
  Box,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Loading from "./Loading";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ProjectDetailsContext } from "../ProjectDetailsContext";
import { addProjectByAdminApi, addServerByAdminApi, fetchServerByAdminApi } from "../Data/Api";

const style = {
  position: "absolute",
  overflowY: "scroll",
  height: "90vh",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  p: 4,
};

const childStyle = {
  position: "absolute",
  overflowY: "scroll",
  height: "50vh",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  p: 4,
};

function ChildModal({ openChildModal, closeChildModal,fetchServersFromBackend }) {
    const [newServer,setNewServer]=useState("");
  const handleClose = () => {
    closeChildModal();
  };
  const submitHandler=async()=>{
    if(newServer.trim().length<=0){
        toast.error("Input Fields cannot be null");
        return;
    }
        try {
            const data = { server:newServer };
            let token = localStorage.getItem("userToken");
            let headers = { Authorization: "Bearer " + token };
            const res = await axios.post(`${addServerByAdminApi}`, data, {
              headers: headers,
            });
      
            setNewServer("");
            fetchServersFromBackend();            
            toast.success("Server added successfully!");
            closeChildModal();
        } catch (error) {
            toast.error(error?.data?.message || error?.message);
        }
  }
  return (
    <>
      <Modal
        open={openChildModal}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={childStyle}>
          <h2 id="child-modal-title">Add New Server</h2>

          <Box my={2}>
            <TextField
              id="new-server"
              label="Enter Server"
              variant="outlined"
              value={newServer}
              onChange={(e)=>setNewServer(e.target.value)}
              sx={{ width: "100%" }}
            />
          </Box>

          <Box
            my={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Button variant="contained" color="primary" onClick={submitHandler}>
              Add
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

const ProjectDetailsFormModal = (props) => {
  const { openProjectDetailsModal, closeProjectDetailsModalHandler } =
    useContext(ProjectDetailsContext);

    const [servers,setServers]=useState([]);
    const [server,setServer]=useState("");
    const [projectName,setProjectName]=useState("");
    const [ipLink,setIpLink]=useState("");
    const [domain,setDomain]=useState("");
    const [directory,setDirectory]=useState("");
    const [technology,setTechnology]=useState("");
    const [developer,setDeveloper]=useState("");

  const [loading, setLoading] = useState(false);
  const [loader,setLoader]=useState(false);

  const [openChildModal, setOpenChildModal] = useState(false);

  const closeChildModal = () => {
    setOpenChildModal(false);
  };

  const handleOpen = () => {
    setOpenChildModal(true);
  };

  const fetchServersFromBackend = async () => {
    try {
      let token = localStorage.getItem("userToken");
      let headers = { Authorization: "Bearer " + token };
      const res = await axios.post(`${fetchServerByAdminApi}`, null, {
        headers: headers,
      });
      setServers(res?.data?.result);
    } catch (error) {
      toast.error(error?.message || error?.data?.message);
    }
  };
  useEffect(() => {
    fetchServersFromBackend();
  }, [openProjectDetailsModal]);

  const handleServerChange = async (event) => {
    setServer(event.target.value);
  };

  const submitHandler=async(e)=>{
    e.preventDefault();
    try {
        setLoader(true);
        let token = localStorage.getItem("userToken");
      let headers = { Authorization: "Bearer " + token };
      const data = {
        projectName:projectName,
        server:server,
        location:directory,
        IpLink:ipLink,
        domain:domain,
        technology:technology,
        developer:developer
      };
      const response = await axios.post(`${addProjectByAdminApi}`, data, {
        headers: headers,
      });
  
      setLoader(false);
      toast.success("Project Added Successfully...");
      setServers([]);
      setServer("");
      setProjectName("");
      setIpLink("");
      setDomain("");
      setDirectory("");
      setTechnology("");
      setDeveloper("");
      props.fetchDataFromBackend();
      closeProjectDetailsModalHandler();
    } catch (error) {
        toast.error(error?.data?.message || error?.message);
    }
  }

  return (
    <>
      <ToastContainer />

      <Modal
        open={openProjectDetailsModal}
        onClose={closeProjectDetailsModalHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={submitHandler}>
            <Box my={2}>
              <TextField
                id="project-name"
                label="Project Name"
                variant="outlined"
                value={projectName}
                onChange={(e)=>setProjectName(e.target.value)}
                sx={{ width: "100%" }}
              />
            </Box>
            <Box my={2}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="select-server">Select Server</InputLabel>
                  <Select
                    labelId="select-server"
                    id="select-server"
                    label="Select Server"
                    sx={{ width: "100%" }}
                    value={server}
                    onChange={handleServerChange}
                  >
                    {servers?.map((data, i) => {
                      return (
                        <MenuItem key={i} value={data?.server}>
                          {data?.server}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                <IconButton aria-label="add-server" onClick={handleOpen}>
                  <AddCircleIcon sx={{ color: "red" }} />
                </IconButton>
              </div>
            </Box>
            <Box my={2}>
              <TextField
                id="ip-link"
                label="IP Link"
                variant="outlined"
                value={ipLink}
                onChange={(e)=>setIpLink(e.target.value)}
                sx={{ width: "100%" }}
              />
            </Box>
            <Box my={2}>
              <TextField
                id="domain"
                label="Domain"
                variant="outlined"
                value={domain}
                onChange={(e)=>setDomain(e.target.value)}
                sx={{ width: "100%" }}
              />
            </Box>
            <Box my={2}>
              <TextField
                id="directory"
                label="Directory"
                variant="outlined"
                value={directory}
                onChange={(e)=>setDirectory(e.target.value)}
                sx={{ width: "100%" }}
              />
            </Box>
            <Box my={2}>
              <TextField
                id="technology"
                label="Technology"
                variant="outlined"
                value={technology}
                onChange={(e)=>setTechnology(e.target.value)}
                sx={{ width: "100%" }}
              />
            </Box>

            <Box my={2}>
              <TextField
                id="developer"
                label="Developer"
                variant="outlined"
                value={developer}
                onChange={(e)=>setDeveloper(e.target.value)}
                sx={{ width: "100%" }}
              />
            </Box>

            <Button
              type="submit"
              sx={{ width: "100%" }}
              variant="contained"
              color="secondary"
              disabled={loader}
            >
              Submit
            </Button>
          </form>
          <ChildModal
            openChildModal={openChildModal}
            closeChildModal={closeChildModal}
            fetchServersFromBackend={fetchServersFromBackend}
          />
          {loader && <Loading />}
        </Box>
      </Modal>
    </>
  );
};

export default ProjectDetailsFormModal;
