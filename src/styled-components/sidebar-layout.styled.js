import styled from "styled-components";

export const SidebarLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 2rem 0.5rem 2rem;
  background-color: white;
  border-right: 1px solid gray;
  box-sizing: border-box;

  .active {
    background-color: gray;
  }

  .top_sidebar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    height: 10%;
    width: 100%;
  }

  .sessions_list {
    margin: 0;
    list-style: none;
    padding: 0;
  }

  a {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    height: 2.3rem;
    font-weight: 500;
    box-sizing: border-box;
    border-radius: 0.5rem;
    transition: 0.3s all;
    .arrow_icon {
      width: 3rem;
      font-size: 0.5rem;
    }
    .icon {
      display: flex;
      width: 3rem;
      font-size: 1.1rem;
    }
    p {
      display: flex;
      align-items: center;
      justify-content: left;
      height: 100%;
      width: 75%;
    }
    &:hover {
      color: white;
    }
  }

  // Menu items

  .middle_sidebar {
    height: 80%;
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
      color: white;
      .icon {
        font-size: 1.2rem;
      }
      &:hover {
        color: white;
        cursor: pointer;
      }
    }
  }
`;
