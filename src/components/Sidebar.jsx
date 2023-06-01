import { useState } from "react";
import { SidebarLayout } from "../styled-components/sidebar-layout.styled";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BiHomeAlt,
  BiAddToQueue,
  BiListUl,
  BiLogOut,
  BiUser,
  BiDownArrow,
} from "react-icons/bi";
import { TbTicket } from "react-icons/tb";
import { RiCustomerService2Line } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useContext } from "react";
import { MyContext } from "../context/UserContext";
import { BluePaleteColors } from "../palete-colors/blue-colors.palete";

const StyledLink = styled(Link)`
  background-color: ${(props) =>
    props.rute === true ? `${BluePaleteColors.C50}` : ""};
  color: ${(props) => (props.rute === true ? `black` : `black`)};
  p {
    color: ${(props) => (props.rute === true ? `black` : `black`)};
  }
  border: ${(props) =>
    props.rute === true ? `1px solid ${BluePaleteColors.C100}` : ""};
`;

const StyledSession = styled(Link)`
  color: ${(props) => (props.rute === true ? `black` : `black`)};
  display: flex;
  align-items: center;
  padding: 0 1.1rem;
  a {
    padding: 0;
    font-size: 0.8rem;
    height: 2rem;
  }
  &::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 4px;
    margin-right: 10px;
    background-color: ${(props) => (props.rute === true ? `white` : `black`)};
    background-color: ${(props) => props.color};
    opacity: ${(props) => (props.rute === true ? `100%` : `50%`)};
  }
`;

const Sidebar = () => {
  const [isSessionOpen, setIsSessionOpen] = useState(true);

  const { user, houses } = useContext(MyContext);
  console.log(houses, "OHSADHSJKD");

  const navigate = useNavigate();

  const { pathname } = useLocation();

  return (
    <SidebarLayout>
      <div className="top_sidebar">
        <h3>Service Guide</h3>
      </div>
      <div className="middle_sidebar">
        <StyledLink
          to={`/private/major/home`}
          rute={pathname === `/private/major/home`}
        >
          <BiHomeAlt className="icon" />
          <p>Home</p>
        </StyledLink>
        <StyledLink
          to={`/private/major/houses/addhouse`}
          rute={pathname === ``}
        >
          <BiAddToQueue className="icon" />
          <p>Add home</p>
        </StyledLink>
        <StyledLink
          onClick={() => setIsSessionOpen(!isSessionOpen)}
          rute={pathname.includes(``)}
        >
          <BiDownArrow
            className="arrow_icon"
            style={{
              rotate: isSessionOpen ? "0deg" : "180deg",
              transition: "0.3s all",
            }}
          />
          <p>Houses</p>
        </StyledLink>
        <motion.ul
          animate={{
            opacity: isSessionOpen ? 1 : 0,
            y: isSessionOpen ? 0 : -20,
          }}
          transition={{ duration: 0.2 }}
          style={{ display: isSessionOpen ? "block" : "none" }}
          className="sessions_list"
        >
          {houses?.map((c) => (
            <li key={c.id}>
              <StyledSession
                color={c.sessionColor}
                to={``}
                rute={pathname === ``}
              >
                {c.name}
              </StyledSession>
            </li>
          ))}
        </motion.ul>
        <StyledLink to={``} rute={pathname === ``}>
          <BiUser className="icon" />
          <p>Profile</p>
        </StyledLink>
      </div>
      <div className="bottom_sidebar">
        <div className="logout_button">
          <BiLogOut className="icon" />
          Logout
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Sidebar;
