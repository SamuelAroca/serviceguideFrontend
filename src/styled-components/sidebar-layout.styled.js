import styled from "styled-components";
import { GrayPaleteColors } from "../palete-colors/gray-colors.palete";

export const SidebarLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 1.5rem 0.5rem 1.5rem;
  background-color: white;
  border-right: 1px solid ${GrayPaleteColors.C100};
  box-sizing: border-box;

  .top_sidebar {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;
    height: 10%;
    width: 100%;
    position: relative;
    padding-left: 3.5rem;
    img {
      position: absolute;
      left: -1rem;
      width: 5rem;
    }
    p {
      font-weight: bold;
      max-width: 80%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  a {
    display: flex;
    align-items: center;
    font-size: 1rem;
    height: 3rem;
    font-weight: 500;
    box-sizing: border-box;
    border-radius: 0.5rem;
    transition: 0.3s all;
    .arrow_icon {
      width: 3rem;
      font-size: 0.7rem;
    }
    .icon {
      display: flex;
      width: 3rem;
      font-size: 1.5rem;
    }
    p {
      display: flex;
      align-items: center;
      justify-content: left;
      height: 100%;
      width: 75%;
    }
  }

  // Menu items

  .middle_sidebar {
    height: 80%;
  }

  .sessions_list {
    margin: 0;
    list-style: none;
    padding: 0;
  }

  // Logout button

  .bottom_sidebar {
    height: 10%;
    .logout_button {
      display: flex;
      align-items: center;
      font-size: 0.9rem;
      gap: 0.5rem;
      height: 3rem;
      font-weight: 500;
      box-sizing: border-box;
      padding: 0.5rem 1rem;
      border-radius: 0.8rem;
      transition: 0.3s all;
      color: gray;
      .icon {
        font-size: 1.2rem;
      }
      &:hover {
        color: black;
        cursor: pointer;
      }
    }
  }
`;
