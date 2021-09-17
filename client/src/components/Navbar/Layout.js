import { Fragment } from "react";
import { useLocation } from "react-router";
import Navbar from "./Navbar";

const Layout = (props) => {
  const location = useLocation();

  const navbarVisible =
    location.pathname === "/" ||
    location.pathname === "/admin/register" ||
    location.pathname === "/teacher/register" ||
    location.pathname === "/student/register";

  return (
    <Fragment>
      {!navbarVisible && <Navbar />}
      {props.children}
    </Fragment>
  );
};

export default Layout;
