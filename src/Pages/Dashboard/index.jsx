import React from "react";
import { useState } from "react";
import "./style.css";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { MdMoreVert } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import axios from "axios";
import { useEffect } from "react";
import Pagination from "../../Components/Pagination";
import { useMemo } from "react";
import { useCallback } from "react";
import Sidebar from "../../Components/Sidebar";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";

let PageSize = 10;

function Dashboard() {
  const [active, setActive] = useState(false);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentDataOfUser, setCurrentDataOfUser] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const getAllUsers = () => {
    const headers = {
      "content-type": "application/json",
      accept: "application/json",
    };
    axios
      .get(
        "https://sociallink-ab726-default-rtdb.firebaseio.com/users.json",

        {
          headers: headers,
        }
      )
      .then((res) => {
        let usersArr = [];
        for (let key in res.data) {
          let expense = res.data[key];
          expense.userId = key;
          usersArr.push(expense);
        }
        setData(usersArr);
        localStorage.setItem("allUsers", JSON.stringify(usersArr));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);

  const fetchData = useCallback(() => {
    const config = {
      headers: {
        Accept: "application/json",
      },
    };
    const response = axios
      .get(
        `https://sociallink-ab726-default-rtdb.firebaseio.com/users/${
          JSON.parse(localStorage.getItem("user")).uid
        }.json`,

        config
      )
      .then((res) => {
        setCurrentDataOfUser(res?.data);
      })
      .catch((err) => console.log(err));

    return response;
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [showButton, setShowButton] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const nodeRef = useRef(null);
  return (
    <div className="dashboard-container">
      <Sidebar
        currentDataOfUser={currentDataOfUser}
        active={active}
        open={open}
      />
      <div className="home_content container-table">
        <div className="nav-container">
          {showButton && (
            <button onClick={() => setShowMessage(true)} size="lg">
              Show Message
            </button>
          )}
          <div
            className="list-icon"
            onClick={() => {
              setActive(!active);
              <CSSTransition
                in={showMessage}
                nodeRef={nodeRef}
                timeout={300}
                classNames="alert"
                unmountOnExit
                onEnter={() => setShowButton(false)}
                onExited={() => setShowButton(true)}
              >
                <Sidebar
                  currentDataOfUser={currentDataOfUser}
                  active={active}
                  open={open}
                  ref={nodeRef}
                />
              </CSSTransition>;
            }}
          >
            <MdMoreVert />
          </div>

          <span>Dashboard</span>
          <div className="menu-mobile" onClick={() => setOpen(!open)}>
            {!open && <AiOutlineMenu />}
            {open && <AiOutlineClose />}
          </div>
        </div>

        <div className="table-container">
          <div className="icon-container">
            <div className="world-icon">
              <TbWorld />
            </div>
            <div className="table-details">
              <table className="content-table table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Type</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTableData.map((user) => (
                    <tr key={user.userId}>
                      <td data-title="Name">{user.username}</td>

                      <td data-title="Email">{user.email}</td>
                      <td data-title="Type">{user.userType}</td>
                      <td data-title="Phone">{user.phone}</td>
                      <td data-title="Address">{user.address}</td>
                      <td data-title="Address">
                        {new Date(user.createdAt * 1000).toLocaleDateString(
                          "en-us",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={data.length}
                pageSize={PageSize}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
