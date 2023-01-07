/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./table.css";
import "font-awesome/css/font-awesome.min.css";
import { CSVLink } from "react-csv";
import TableData from "./TableData.tsx";
import { useState, useEffect } from "react";

import { BsFillCloudArrowDownFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import AddUser from "./AddUser.tsx";
import { AiOutlineArrowDown } from "react-icons/ai";
let url = "https://randomuser.me/api/?results=7";
const roles = [
  "Admin",
  "President",
  "CEO",
  "CFO",
  "CMO",
  "Sales Rep",
  "Web Dev",
  "App Dev",
  "Dev Ops",
  "Marketing Leader",
  "Project Manager",
  "ML Engineer",
  "Receptionist",
  "HR",
];
const Table = () => {
  interface Datatype {
    name: String;
    registered: String;
    role: string;
    country: String;
    cell: String;
    picture: string;
    email: string;
  }

  const initialState = {
    name: "",
    string: "",
    registered: "",
    role: "",
    country: "",
    cell: "",
    email: "",
    picture: "",
  };
  const [Data, setData] = useState<Datatype[]>([initialState]);
  const [page, setPage] = useState("table");
  const [pageNumber, setPageNumber] = useState(1);

  const fetchData = () => {
    let tmpArray: any[] = [];
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Here you need to use an temporary array to store NeededInfo only
        for (var i = 0; i < data.results.length; i++) {
          tmpArray.push(data.results[i]);
        }
        setData(tmpArray);
      });
  };

  const header = [
    {
      label: "Name",
      key: "name",
    },
    {
      label: "Title",
      key: "email",
    },
  ];
  const csvLink = {
    data: Data,
    headers: header,
    filename: "csvFile.csv",
  };

  function NextPage() {
    if (pageNumber < 25) {
      setPageNumber(pageNumber + 1);
      fetchData();
    }
  }
  function PrvPage() {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
      fetchData();
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="nav nav-pills nav tabs  ">
        <li className="nav-item">
          <a className="nav-link tab border font-style" aria-current="page">
            General
          </a>
        </li>
        <li className="nav-item  tab border">
          <a className="nav-link  font-style">User</a>
        </li>
        <li className="nav-item tab border">
          <a className="nav-link  font-style">Plan</a>
        </li>
        <li className="nav-item tab border">
          <a className="nav-link  font-style ">Billing</a>
        </li>
        <li className="nav-item tab border">
          <a className="nav-link  font-style">Integration</a>
        </li>
      </div>

      <div className="header">
        <div className="header-first">
          <div className="Useractivity">
            <span className="usertitle">User</span>
            <span className="active-user">48 Active</span>
          </div>
          <span>Manage Your team and their account permissions here</span>
        </div>
        <div className="Button-style">
          <button className="csv-button">
            <BsFillCloudArrowDownFill />
            <CSVLink {...csvLink} className="CSVdownload">
              {" "}
              Download CSV
            </CSVLink>
          </button>
          <button className="add-user" onClick={() => setPage("Adduser")}>
            {" "}
            <AiOutlinePlus />
            Add User
          </button>
        </div>
      </div>

      <div>
        <div className="table-data">
          <table className="table ">
            <thead>
              <tr>
                <th scope="col">
                  Name <AiOutlineArrowDown />
                </th>
                <th scope="col">
                  Status <AiOutlineArrowDown />
                </th>
                <th scope="col">
                  Role <AiOutlineArrowDown />
                </th>
                <th scope="col">
                  Mob. No. <AiOutlineArrowDown />
                </th>
                <th scope="col">
                  Last Login <AiOutlineArrowDown />
                </th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {Data &&
                Data.length > 0 &&
                Data.map((element, index) => {
                  return (
                    <TableData
                      key={index}
                      picture={element.picture}
                      name={element.name}
                      status={element.registered}
                      role={roles[Math.floor(Math.random() * roles.length)]}
                      cell={element.cell}
                      email={element.email}
                      Num={index}
                      setData={setData}
                      Data={Data}
                      setPage={setPage}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="container1">
          <button
            type="button"
            className="prvbtn table-button"
            onClick={PrvPage}
          >
            {" "}
            &laquo; Previous
          </button>
          <span className="pageRange"> {pageNumber} of 25 </span>
          <button
            type="button"
            className="nextbtn table-button"
            onClick={NextPage}
          >
            Next &raquo;
          </button>
        </div>
      </div>

      {page === "Adduser" && (
        <AddUser setData={setData} setPage={setPage} Data={Data} page={page} />
      )}
    </>
  );
};

export default Table;
