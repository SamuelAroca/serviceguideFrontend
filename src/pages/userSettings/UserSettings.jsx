import React from "react";
import UserUpdateForm from "../userSettings/Components/UserUpdateForm";
import styles from "./Styles/UserSettings.module.css";

const UserSettings = () => {
  return (
    <div className={styles.div_main}>
      <UserUpdateForm />
    </div>
  );
};

export default UserSettings;
