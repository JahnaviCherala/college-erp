import { Backdrop, Typography, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "./styles";
import otherActionTypes from "../../store/constants/rest";

import notFound from "../../images/not_found.svg";
import success from "../../images/success.png";

const MessageBox = () => {
  const classes = useStyles();
  const data = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const clickHandler = (event) => {
    event.preventDefault();

    if (data.errorMessage)
      dispatch({ type: otherActionTypes.CLEAR_ERROR_MESSAGE });
    else dispatch({ type: otherActionTypes.CLEAR_SUCCESS_MESSAGE });
  };

  return (
    <div>
      <Backdrop
        className={classes.backdrop}
        open={data.errorMessage || data.successMessage ? true : false}
      >
        <div className={classes.messageDiv}>
          {data.errorMessage && (
            <img className={classes.image} src={notFound} alt="Not Found" />
          )}
          {data.successMessage && (
            <img className={classes.image} src={success} alt="Success" />
          )}
          <Typography variant="subtitle1">
            {data.errorMessage}
            {data.successMessage}
          </Typography>
          <Button
            className={classes.button}
            onClick={clickHandler}
            size="small"
          >
            Close
          </Button>
        </div>
      </Backdrop>
    </div>
  );
};

export default MessageBox;
