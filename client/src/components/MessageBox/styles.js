import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  messageDiv: {
    fontSize: "1.3rem",
    padding: "50px",
    color: "black",
    backgroundColor: "white",
    borderRadius: "7px",
    textAlign: "center",
    width: "50%",
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },

  button: {
    color: "#6C63FF",
  },

  image: {
    width: "50%",
    marginBottom: "20px",
  },
}));

export default useStyles;
