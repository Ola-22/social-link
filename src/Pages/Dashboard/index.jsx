import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { AiOutlineClose, AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import Avatar from "./../../assets/img/avatar.jpg";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdMoreVert } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import axios from "axios";
import { useEffect } from "react";
import Pagination from "../../Components/Pagination";
import { useMemo } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import Swal from "sweetalert2";
import { useCallback } from "react";

let PageSize = 10;

function Dashboard() {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [activeLogout, setActiveLogout] = useState(false);
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

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Swal.fire({
          title: "",
          text: "Are you sure you want to logout?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
            localStorage.removeItem("user");
          }
        });
      })
      .catch((error) => {});
  };

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

  return (
    <div className="dashboard-container">
      <div
        className={`sidebar ${active ? "active" : ""} ${open ? "open" : ""}`}
      >
        <div className="logo_content">
          <div className="logo">
            <div className="logo_name">Social</div>
          </div>
        </div>
        <ul className="nav_list">
          <div className="name-container">
            <li
              className="user-container"
              onClick={() => setActiveLogout(!activeLogout)}
            >
              <div>
                <div>
                  <img src={Avatar} alt="avatar" />
                  <span className="links_name">
                    Hi {currentDataOfUser?.displayName}
                  </span>
                </div>
                <IoMdArrowDropdown />
              </div>
            </li>
            <div
              onClick={handleLogout}
              className={`logout ${activeLogout ? "logout active" : ""}`}
            >
              <BiLogOut />
              <span className="links_name">Logout</span>
            </div>
          </div>

          <li>
            <Link to="/dashboard">
              <AiOutlineUser />
              <span className="links_name">Users</span>
            </Link>
            <span className="tooltip">Users</span>
          </li>
        </ul>

        <div className="content">
          <div className="user">
            <div className="user_details">
              <div className="name_job"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="home_content container-table">
        <div className="nav-container">
          <div className="list-icon" onClick={() => setActive(!active)}>
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
