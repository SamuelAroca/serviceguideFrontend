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
import { RiCustomerService2Line, RiUserSettingsLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useContext } from "react";
import { MyContext } from "../context/UserContext";
import { BluePaleteColors } from "../palete-colors/blue-colors.palete";
import { GrayPaleteColors } from "../palete-colors/gray-colors.palete";
import Logo from "../assets/Logo.png";

const StyledLink = styled(Link)`
  background-color: ${(props) =>
    props.rute === true ? `${BluePaleteColors.C50}` : ""};
  .icon {
    color: ${(props) =>
      props.rute === true
        ? `${BluePaleteColors.C500}`
        : `${GrayPaleteColors.C300}`};
  }
  p {
    color: ${(props) =>
      props.rute === true
        ? `${BluePaleteColors.C500}`
        : `${GrayPaleteColors.C300}`};
  }
  border: ${(props) =>
    props.rute === true ? `1px solid ${BluePaleteColors.C100}` : ""};
`;

const StyledHouseLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0 1.1rem;
  padding: 0;
  font-size: 0.8rem;
  height: 2rem;
  margin-left: 1.8rem;
  transition: 0.2s all;
  p {
    color: ${(props) =>
      props.rute === true
        ? `${BluePaleteColors.C600}`
        : `${GrayPaleteColors.C300}`};
  }
  &::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 4px;
    margin-right: 10px;
    background-color: ${(props) =>
      props.rute === true
        ? `${BluePaleteColors.C600}`
        : `${GrayPaleteColors.C300}`};
    opacity: ${(props) => (props.rute === true ? `100%` : `50%`)};
  }

  &:hover {
    color: ${GrayPaleteColors.C800};
  }
`;

const Sidebar = () => {
  const [isSessionOpen, setIsSessionOpen] = useState(true);

  const { user, houses } = useContext(MyContext);

  const navigate = useNavigate();

  const { pathname } = useLocation();

  return (
    <SidebarLayout>
      <div className="top_sidebar">
        <img src={Logo} alt="logo" loading="lazy" />
        <p>{user}</p>
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
          rute={pathname.includes(`house-detail`)}
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
              <StyledHouseLink
                to={`/private/house-detail/${c.id}`}
                rute={pathname === `/private/house-detail/${c.id}`}
              >
                <p>{c.name}</p>
              </StyledHouseLink>
            </li>
          ))}
        </motion.ul>
        <StyledLink to={``} rute={pathname === ``}>
          <BiUser className="icon" />
          <p>Profile</p>
        </StyledLink>
        <StyledLink to={``} rute={pathname === ``}>
          <RiUserSettingsLine className="icon" />
          <p>Profile Settings</p>
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