import { Grid, Paper, TextField, Button, Typography } from "@material-ui/core";
import admin from "../../images/admin.svg";
import student from "../../images/student.svg";
import teacher from "../../images/teacher.svg";
import useStyles from "./styles";

const Login = ({ user }) => {
  const classes = useStyles();

  let image;
  if (user === "Student") image = student;
  else if (user === "Admin") image = admin;
  else image = teacher;

  return (
    <Grid className={classes.mainContainer}>
      <Paper className={classes.paper} elevation={3}>
        <div className={classes.centerDiv}>
          <img className={classes.titleImg} src={image} alt={user} />
          <Typography className={classes.title} variant="h5" gutterBottom>
            {user}
          </Typography>
        </div>

        <form>
          <TextField
            className={classes.extraMargin}
            type="email"
            variant="outlined"
            label="Email"
            fullWidth
          />
          <TextField
            className={classes.extraMargin}
            type="password"
            variant="outlined"
            label="Password"
            fullWidth
          />
          <div className={classes.centerDiv}>
            <Button
              className={classes.loginButton}
              style={{ backgroundColor: "#6C63FF" }}
              variant="contained"
            >
              Login
            </Button>
            <Button
              className={classes.clearButton}
              style={{ backgroundColor: "white" }}
              variant="contained"
            >
              Register
            </Button>
          </div>
        </form>
      </Paper>
    </Grid>
  );
};

export default Login;
