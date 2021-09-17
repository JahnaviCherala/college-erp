import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import admin from "../../images/admin.svg";
import student from "../../images/student.svg";
import teacher from "../../images/teacher.svg";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { studentLogin, studentRegister } from "../../store/action/student";

const Login = ({ user, register }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    registrationID: "",
    password: "",
    firstName: "",
    lastName: "",
    aadhar: "",
    mobile: "",
    departmentID: "",
    confirmPassword: "",
    email: "",
    year: 0,
    semester: 0,
    type: user,
  });

  let image;
  if (user === "Student") image = student;
  else if (user === "Admin") image = admin;
  else image = teacher;

  const inputChangeHandler = (event) => {
    event.preventDefault();

    setForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(form);

    if (register) {
      dispatch(studentRegister(form));
    } else {
      dispatch(studentLogin(form));
    }
  };

  return (
    <Grid className={classes.mainContainer}>
      <Paper className={classes.paper} elevation={3}>
        <div className={classes.centerDiv}>
          <img className={classes.titleImg} src={image} alt={user} />
          <Typography className={classes.title} variant="h5" gutterBottom>
            {user}
          </Typography>
        </div>

        <form onSubmit={submitHandler}>
          {register && (
            <Fragment>
              <TextField
                className={classes.extraMargin}
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={inputChangeHandler}
                label="First Name"
                fullWidth
              />
              <TextField
                className={classes.extraMargin}
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={inputChangeHandler}
                label="Last Name"
                fullWidth
              />
              <TextField
                className={classes.extraMargin}
                type="email"
                name="email"
                value={form.email}
                onChange={inputChangeHandler}
                label="Email"
                fullWidth
              />
              <TextField
                className={classes.extraMargin}
                type="text"
                name="aadhar"
                value={form.aadhar}
                onChange={inputChangeHandler}
                label="Aadhar"
                fullWidth
              />
              <TextField
                className={classes.extraMargin}
                type="text"
                name="mobile"
                value={form.mobile}
                onChange={inputChangeHandler}
                label="Mobile Number"
                fullWidth
              />
              <FormControl
                style={{ width: "100%" }}
                className={classes.extraMargin}
              >
                <InputLabel id="department">Department</InputLabel>
                <Select
                  labelId="department"
                  name="departmentID"
                  onChange={inputChangeHandler}
                  label="Department"
                  defaultValue=""
                >
                  <MenuItem value="CSE">Computer Science</MenuItem>
                  <MenuItem value="IT">Information Technology</MenuItem>
                  <MenuItem value="EXTC">
                    Electronics And Telecommunication
                  </MenuItem>
                  <MenuItem value="ELEX">Electronics</MenuItem>
                  <MenuItem value="ELEC">Electrical</MenuItem>
                  <MenuItem value="PROD">Production</MenuItem>
                  <MenuItem value="CIV">Civil</MenuItem>
                  <MenuItem value="CHEM">Chemical</MenuItem>
                  <MenuItem value="TEXT">Textile</MenuItem>
                </Select>
              </FormControl>
            </Fragment>
          )}
          {!register && (
            <TextField
              className={classes.extraMargin}
              type="text"
              name="registrationID"
              value={form.registrationID}
              onChange={inputChangeHandler}
              label="Registration ID"
              fullWidth
            />
          )}

          <TextField
            className={classes.extraMargin}
            type="password"
            name="password"
            value={form.password}
            onChange={inputChangeHandler}
            label="Password"
            fullWidth
          />
          {register && (
            <TextField
              className={classes.extraMargin}
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={inputChangeHandler}
              label="Confirm Password"
              fullWidth
            />
          )}
          {user === "Student" && register && (
            <Fragment>
              <FormControl
                style={{ width: "100%" }}
                className={classes.extraMargin}
              >
                <InputLabel id="year">Year</InputLabel>
                <Select
                  labelId="year"
                  name="year"
                  onChange={inputChangeHandler}
                  label="Year"
                  defaultValue={0}
                >
                  <MenuItem value={1}>First Year</MenuItem>
                  <MenuItem value={2}>Second Year</MenuItem>
                  <MenuItem value={3}>Third Year</MenuItem>
                  <MenuItem value={4}>Fourth Year</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                style={{ width: "100%" }}
                className={classes.extraMargin}
              >
                <InputLabel id="semester">Semester</InputLabel>
                <Select
                  labelId="semester"
                  name="semester"
                  onChange={inputChangeHandler}
                  label="Semester"
                  defaultValue={0}
                >
                  <MenuItem value={1}>First Semester</MenuItem>
                  <MenuItem value={2}>Second Semester</MenuItem>
                  <MenuItem value={3}>Third Semester</MenuItem>
                  <MenuItem value={4}>Fourth Semester</MenuItem>
                  <MenuItem value={5}>Fifth Semester</MenuItem>
                  <MenuItem value={6}>Sixth Semester</MenuItem>
                  <MenuItem value={7}>Seventh Semester</MenuItem>
                  <MenuItem value={8}>Eighth Semester</MenuItem>
                </Select>
              </FormControl>
            </Fragment>
          )}
          <div className={classes.centerDiv}>
            <Button
              className={classes.loginButton}
              type="submit"
              style={{ backgroundColor: "#6C63FF" }}
              variant="contained"
            >
              {register ? "Register" : "Login"}
            </Button>
            <Button
              className={classes.clearButton}
              style={{ backgroundColor: "white" }}
              variant="contained"
              component={Link}
              to={register ? "/" : `/${user.toLowerCase()}/register`}
            >
              {register ? "Back" : "Register"}
            </Button>
          </div>
        </form>
      </Paper>
    </Grid>
  );
};

export default Login;
