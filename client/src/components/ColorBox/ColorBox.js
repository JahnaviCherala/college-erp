import { Typography } from "@material-ui/core";
import Login from "../Login/Login";
import useStyles from "./styles";

const ColorBox = ({ user, color, register }) => {
  const classes = useStyles();

  let info;

  if (user === "Admin")
    info =
      "Admin will be responsible for storing all the information of the college. For example, maintaining the information of student, teacher and subjects. Adding the information of student, teacher when they enter into college, etc. Admin is the main building block to create this application much more useful.";
  else if (user === "Student")
    info =
      "Student can view their test results and check their attendance. The best feature for student is the chatbox. Any student of the college can talk with any teacher and any student of that particular college. This helps them to reach out to their seniors and teachers for help.";
  else
    info =
      "Teachers has the options to mark attendance on the appliction. They can give marks to the students for particular exams. Not only this, to show the students their result, they can download the pdf and send it to the class";

  let firstDiv = (
    <div className={classes.loginContainer}>
      <Login user={user} register={register} />
    </div>
  );
  let secondDiv = (
    <div className={classes.infoContainer}>
      <Typography
        className={color === "blue" ? classes.blueTitle : classes.whiteTitle}
        variant="h1"
        gutterBottom
      >
        {user}
      </Typography>
      <Typography
        className={color === "blue" ? classes.blueInfo : classes.whiteInfo}
        variant="h6"
      >
        {info}
      </Typography>
    </div>
  );

  if (user === "Teacher") {
    const temp = secondDiv;
    secondDiv = firstDiv;
    firstDiv = temp;
  }

  return (
    <div
      data-aos={register ? "zoom-in" : "fade-up"}
      data-aos-duration="2000"
      className={
        color === "blue" ? classes.blueContainer : classes.whiteContainer
      }
      style={register ? { minHeight: "100vh" } : {}}
    >
      {firstDiv}
      {secondDiv}
    </div>
  );
};

export default ColorBox;
