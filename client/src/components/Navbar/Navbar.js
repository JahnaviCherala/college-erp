import React, { Fragment, useState } from "react";
import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import useStyles from "./styles";

const Navbar = () => {
  const classes = useStyles();
  const data = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(false);
  };

  console.log(data);

  const location = useLocation();
  const mobileView = (
    <Menu keepMounted anchorEl={anchorEl} open={anchorEl} onClose={handleClose}>
      <MenuItem onClick={handleClose} component={Link} to="/">
        Add
      </MenuItem>
      <MenuItem onClick={handleClose} component={Link} to="/distributedP2P">
        Update
      </MenuItem>
      <MenuItem onClick={handleClose} component={Link} to="/distributedP2P">
        Delete
      </MenuItem>
    </Menu>
  );

  return (
    <Fragment>
      <AppBar
        style={{ backgroundColor: "white", color: "black" }}
        position="static"
        elevation={0}
      >
        <Toolbar className={classes.extraMargin}>
          <Typography className={classes.title} variant="h6">
            College ERP
          </Typography>
          <Grid className={classes.mobile}>
            <Button
              className={
                location.pathname === "/" ? classes.active : classes.button
              }
              component={Link}
              to="/"
            >
              Add
            </Button>
            <Button
              className={classes.button}
              component={Link}
              to="/admin/register"
            >
              Update
            </Button>
            <Button
              className={classes.button}
              component={Link}
              to="/distributedP2P"
            >
              Delete
            </Button>
          </Grid>
          <IconButton
            className={classes.desktop}
            color="inherit"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {mobileView}
    </Fragment>
  );
};

export default Navbar;
