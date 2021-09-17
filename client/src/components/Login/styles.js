import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  mainContainer: {
    width: "100%",
  },

  titleImg: {
    width: "25%",
    marginBottom: "10px",
  },

  centerDiv: {
    textAlign: "center",
  },

  paper: {
    padding: "40px",
  },

  extraMargin: {
    marginBottom: "13px",
  },

  title: {
    fontFamily: "Poppins, sans-serif",
    fontWeight: "600",
  },

  loginButton: {
    marginRight: "10px",
    color: "white",
    fontFamily: "Poppins, sans-serif",
  },

  clearButton: {
    fontFamily: "Poppins, sans-serif",
  },
}));

export default useStyles;
