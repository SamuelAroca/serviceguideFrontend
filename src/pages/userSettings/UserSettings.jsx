import React from "react";
import UserUpdateForm from "../userSettings/Components/UserUpdateForm";
import styles from "./styles/UserSettings.module.css"

const UserSettings = () => {
  return (
    <div className={styles.div_main}>
      <UserUpdateForm />
    </div>
  );
};

export default UserSettings;