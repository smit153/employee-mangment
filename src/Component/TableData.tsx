import React, { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import "./tableData.css";
import { Modal } from "@mui/material";
const TableData = (props: {
  name: any;
  status: any;
  role: any;
  email: any;
  picture: any;
  Num: any;
  setData: any;
  Data: any;
  cell: any;
}) => {
  let { name, status, role, cell, email, picture, Num, setData, Data } = props;

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [uName,setUname]=useState("")
  const[phone,setPhone]=useState("")
  const handleOpen = () => setOpen(true);
  const handleOpen2 = () => setOpen2(true);

  const handleClose = () => {setOpen(false);handleEdit(email)}
  const handleClose2=()=>{setOpen2(false)}

  const handleDelete = (email: String) => {
    setData(Data.filter((value: { email: String }) => value.email !== email));
    handleClose2();
  };
  const handleEdit = (email: String) => {
    const d = Data.filter((value: { email: String }) => value.email === email);
    const index = Data.indexOf(d[0]);
    let temp = Data;
    temp[index] = {
      ...temp[index],
      name: { ...name, first: uName },
      cell: phone,
    };
    setData([...temp]);
  };

  return (
    <>
      <tr className={`${Num % 2 === 0 ? "" : "TableDataEven"}`}>
        <td className="wrapper d-flex">
          <img className="profile-img" src={picture.medium} alt="Profile pic" />
          <div className="d-flex flex-column">
            <div className=" align-self-start fw-bold">{name.first}</div>
            <div className="col align-self-start fw-light ">{email}</div>
          </div>
        </td>
        <td className="h-100">
          {Math.floor(Math.random() * 2) ? (
            <div className="badge rounded-pill bg-success fs-6"> Active</div>
          ) : (
            <div className="fs-6 badge rounded-pill bg-secondary"> Invited</div>
          )}
        </td>
        <td>{role}</td>
        <td>{cell} </td>
        <td>
          <div className="fw-bold">{new Date(status.date).toDateString()}</div>
          <div className="fw-light">
            {new Date(status.date).toLocaleTimeString()}
          </div>
        </td>
        <td onClick={() => handleOpen2()}>
          <RiDeleteBinLine className="deleteIcon" />
        </td>
        <td onClick={() => handleOpen()}>
          <FiEdit2 className="deleteIcon" />{" "}
        </td>
      </tr>
      <Modal 
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
          }} className="p-2">
        <p className="fs-2">Want to delete user?</p>
        <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-secondary" onClick={()=>handleClose2()}>No</button>
        <button type="button" className="btn btn-danger" onClick={()=>handleDelete(email)}>Delete</button>
        </div>
        </div>

      </Modal>
      <Modal 
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          className="container"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
          }}
        >
          <form >
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                name="name"
                onChange={(e)=>setUname(e.target.value)}
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label" name="phone">
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                onChange={(e)=>setPhone(e.target.value)}
              />
            </div>

            <button
              type="button"
              onClick={() => handleClose()}
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default TableData;
