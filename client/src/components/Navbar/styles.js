import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  desktop: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },

  mobile: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },

  title: {
    flexGrow: 1,
  },

  extraMargin: {
    margin: "5px 50px",
  },

  active: {
    marginRight: "10px",
    padding: "7px",
    backgroundColor: "#6C63FF",
    color: "white",
    "&:hover": {
      backgroundColor: "white",
      color: "black",
    },
  },

  button: {
    marginRight: "10px",
    padding: "7px",
    "&:hover": {
      backgroundColor: "#6C63FF",
      color: "white",
    },
  },
}));

export default useStyles;
