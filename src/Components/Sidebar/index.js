import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "./../../assets/img/avatar.jpg";
import { AiOutlineUser } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { TbMessageReport } from "react-icons/tb";

function Sidebar({ currentDataOfUser, active, open, ref }) {
  const navigate = useNavigate();

  const [activeLogout, setActiveLogout] = useState(false);

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
  return (
    <div
      ref={ref}
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

        <li>
          <Link to="/posts-reports">
            <TbMessageReport />
            <span className="links_name">Posts Reports</span>
          </Link>
          <span className="tooltip">Posts Reports</span>
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
  );
}

export default Sidebar;
