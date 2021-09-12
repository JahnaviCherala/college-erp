import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  blueContainer: {
    display: "flex",
    backgroundColor: "#6C63FF",
    width: "100vw",
    height: "70vh",
  },

  loginContainer: {
    width: "40vw",
    padding: "20px",
    margin: "auto",
  },

  infoContainer: {
    width: "60vw",
    padding: "50px",
    margin: "auto",
  },

  blueTitle: {
    fontWeight: "700",
    fontSize: "4rem",
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
    color: "white",
  },

  blueInfo: {
    fontWeight: "400",
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
    fontSize: "1.1rem",
    color: "#ffffff",
  },

  whiteContainer: {
    display: "flex",
    width: "100vw",
    height: "70vh",
  },

  whiteTitle: {
    fontWeight: "700",
    fontSize: "4rem",
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
    color: "black",
  },

  whiteInfo: {
    fontWeight: "400",
    fontSize: "1.1rem",
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
    color: "#444444",
  },
}));

export default useStyles;
