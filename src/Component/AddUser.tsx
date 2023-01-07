import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";

function AddUser(props: { setData: any; setPage: any; Data: any; page: any }) {
  const { setData, setPage, Data, page } = props;

  const [open, setOpen] = useState(false);
  const [uName, setUname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const handleClose = () => {
    setOpen(false);
    setPage("table");
  };

  function handleSubmit() {
    handleClose()
    const newData = {
      name: {first:uName},
      email: email,
      cell: phone,
      registered:{date:new Date()},
      picture:{medium:"https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg"}
    };
    console.log(Data)
    setData([...Data, newData]);
  }

  useEffect(() => {
    if (page === "Adduser") {
      setOpen(true);
    }
  }, [page]);

  return (
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
              onChange={(e) => setUname(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>

            <input
              type="email"
              className="form-control"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <button
            type="submit"
            onClick={() => handleSubmit()}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default AddUser;
