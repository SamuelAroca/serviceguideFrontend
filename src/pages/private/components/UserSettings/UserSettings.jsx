import React from "react";
import UserUpdateForm from "../forms/UserUpdateForm";
import SideNavUser from "./SideNavUser";
import styles from "./styles/UserSettings.module.css"

const UserSettings = () => {
  return (
    <div>
      <div className={styles.div_main}>
        <UserUpdateForm />
      </div>
      <SideNavUser />
    </div>
  );
};

export default UserSettings;
