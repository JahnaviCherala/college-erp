import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    width: "100vw",
    minHeight: "100vh",
    padding: "50px",
    boxSizing: "border-box",
  },

  title: {
    fontWeight: "700",
    fontSize: "5rem",
    marginLeft: "20px",
    fontFamily: "Poppins, sans-serif",
  },

  info: {
    fontWeight: "400",
    marginLeft: "20px",
    fontFamily: "Poppins, sans-serif",
    color: "#444444",
  },

  titleContainer: {
    width: "40vw",
    margin: "auto",
  },

  imageCointainer: {
    width: "60vw",
    margin: "auto",
  },

  image: {
    width: "100%",
  },
}));

export default useStyles;
