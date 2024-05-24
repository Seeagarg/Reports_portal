import React, { useContext, useState, useEffect } from "react";
import { EditModalContext } from "../EditModalContext";
import {
  TextField,
  Button,
  Modal,
  Box,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  IconButton,
} from "@mui/material";
import axios from "axios";
import {
  editAdvertiser,
  editPublisher,
  fetchCountryApi,
  fetchOperatorApi,
  fetchPublishersInAdvertiser,
  addPublisherInAdvertiser,
  fetchServerByAdminApi,
  addServerByAdminApi,
  editProjectByAdminApi,
} from "../Data/Api";
import { toast, ToastContainer } from "react-toastify";
import Loader from "./Loader";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { EditProjectDetailsContext } from "../EditProjectDetailsContext";
import Loading from "./Loading";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  overflowY: "scroll",
  height: "90vh",
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

function ChildModal({ openChildModal, closeChildModal, getServers }) {
  const [newServer, setNewServer] = useState("");

  const handleClose = () => {
    closeChildModal();
  };

  const submitHandler = async () => {
    if (newServer.trim().length <= 0) {
      toast.error("Input Fields cannot be null");
      return;
    }
    try {
      const data = { server: newServer };
      let token = localStorage.getItem("userToken");
      let headers = { Authorization: "Bearer " + token };
      const res = await axios.post(`${addServerByAdminApi}`, data, {
        headers: headers,
      });

      setNewServer("");
      getServers();
      toast.success("Server added successfully!");
      closeChildModal();
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };

  return (
    <>
      {/* <ToastContainer /> */}
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
              id="new-publisher"
              label="Enter Server"
              variant="outlined"
              value={newServer}
              onChange={(e) => setNewServer(e.target.value)}
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

const EditProjectDetailsFormModal = (props) => {
  const { openEdit, closeEditHandler, id, data } = useContext(
    EditProjectDetailsContext
  );

  const [projectName, setProjectName] = useState("");
  const [server, setServer] = useState("");
  const [servers, setServers] = useState([]);
  const [ipLink, setIpLink] = useState("");
  const [directory, setDirectory] = useState("");
  const [domain, setDomain] = useState("");
  const [technology, setTechnology] = useState("");
  const [developer, setDeveloper] = useState("");
  const [loader,setLoader]=useState(false);

  const [loading, setLoading] = useState("block");
  const [openChildModal, setOpenChildModal] = useState(false);

  const closeChildModal = () => {
    setOpenChildModal(false);
  };

  const getServers = async () => {
    try {
        setLoader(true);
      let token = localStorage.getItem("userToken");
      let headers = { Authorization: "Bearer " + token };
      const res = await axios.post(`${fetchServerByAdminApi}`, null, {
        headers: headers,
      });
      setServers(res?.data?.result);
      setLoader(false);
    } catch (error) {
        toast.error(error?.message || error?.data?.message);
        setLoader(false);
    }
  };

  useEffect(() => {
    getServers();
    if (data && data[0]?.server) {
      setProjectName(data[0]?.projectName);
      setServer(data[0]?.server);
      setIpLink(data[0]?.IpLink);
      setDirectory(data[0]?.location);
      setDomain(data[0]?.domain);
      setTechnology(data[0]?.technologyUsed);
      setDeveloper(data[0]?.developerName);
      setLoading("none");
    }
  }, [id, data]);

  const handleOpen = () => {
    setOpenChildModal(true);
  };

  const handleServerChange = (event) => {
    setServer(event.target.value);
  };

  const sendDataToBackend = async () => {
    const data = {
      id,
      projectName: projectName,
      server: server,
      location: directory,
      IpLink: ipLink,
      domain: domain,
      technology: technology,
      developer: developer,
    };
    let token = localStorage.getItem("userToken");
    let headers = { Authorization: "Bearer " + token };
    try {
        setLoader(true);
      await axios.post(`${editProjectByAdminApi}`, data, { headers: headers });
      setLoader(false);
      props.fetchDataFromBackend();
      toast.success("Project Edited successfully");
      setServers([]);
      setServer("");
      setProjectName("");
      setIpLink("");
      setDomain("");
      setDirectory("");
      setTechnology("");
      setDeveloper("");
      closeEditHandler();
    } catch (error) {
        setLoader(false);
      toast.error(error?.data?.message || error?.message);
    }
  };

  const submitHandlerParent=(e)=>{
    e.preventDefault();
    sendDataToBackend();
  }

  return (
    <>
      <ToastContainer />

      <Modal
        open={openEdit}
        onClose={closeEditHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Loader value={loading} />
          <form onSubmit={submitHandlerParent}>
            <Box my={2}>
              <TextField
                id="project-name"
                label="Project Name"
                value={projectName}
                onChange={(e)=>setProjectName(e.target.value)}
                variant="outlined"
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
                    label="Select Publisher"
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
                onChange={(e) => setIpLink(e.target.value)}
                sx={{ width: "100%" }}
              />
            </Box>
            <Box my={2}>
              <TextField
                id="domain"
                label="Domain"
                variant="outlined"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                sx={{ width: "100%" }}
              />
            </Box>
            <Box my={2}>
              <TextField
                id="directory"
                label="Directory"
                variant="outlined"
                value={directory}
                onChange={(e) => setDirectory(e.target.value)}
                sx={{ width: "100%" }}
              />
            </Box>

            <Box my={2}>
              <TextField
                id="technology"
                label="Technology"
                variant="outlined"
                value={technology}
                onChange={(e) => setTechnology(e.target.value)}
                sx={{ width: "100%" }}
              />
            </Box>

            <Box my={2}>
              <TextField
                id="developer"
                label="Developer"
                variant="outlined"
                value={developer}
                onChange={(e) => setDeveloper(e.target.value)}
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
              Save Changes
            </Button>
          </form>
          <ChildModal
            openChildModal={openChildModal}
            closeChildModal={closeChildModal}
            getServers={getServers}
          />
          {loader && <Loading />}

        </Box>
      </Modal>
    </>
  );
};

export default EditProjectDetailsFormModal;
