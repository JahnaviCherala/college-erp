import { Typography } from "@material-ui/core";
import notFound from "../../images/not_found.svg";
import useStyles from "./styles";

const NotFound = () => {
  const classes = useStyles();

  return (
    <div className={classes.mainDiv}>
      <img className={classes.image} src={notFound} alt="Not Found" />
      <Typography variant="h4" gutterBottom>
        Nothing Found
      </Typography>
      <Typography variant="subtitle1">
        Maybe check the url you wrote or the internet connection. Thank you!
      </Typography>
    </div>
  );
};

export default NotFound;
