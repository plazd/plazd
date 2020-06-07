import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import ListIcon from "@material-ui/icons/List";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { fade, createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import ContactsOutlinedIcon from "@material-ui/icons/ContactsOutlined";
import AccountBalanceOutlinedIcon from "@material-ui/icons/AccountBalanceOutlined";
import Collapse from "@material-ui/core/Collapse";
import ArrowRightOutlinedIcon from "@material-ui/icons/ArrowRightOutlined";
import BeenhereOutlinedIcon from "@material-ui/icons/BeenhereOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import BookOutlinedIcon from "@material-ui/icons/BookOutlined";
import FaceOutlinedIcon from "@material-ui/icons/FaceOutlined";
import FeedbackIcon from "@material-ui/icons/Feedback";
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import { logoutU as Logout, logoutU } from '../../actions/auth';
// import Listing from "./listing";
// import Applied from "./applied";
import Cry from "../elements/cryLottie";
// import LogoD from "../../../public/logod.svg";

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 25
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.1),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 1)
    },
    marginLeft: 20,
    width: 10,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: 5
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 0),
    height: "30%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  leftc: {
    position: "absolute",
    right: "0px",
    padding: "20px"
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    textAlign: "center"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(0, 0, 0, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    height: "20%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "15ch"
      }
    }
  },
  account: {
    position: "absolute",
    right: "10px",
    padding: "20px",
    height: "100%"
    // borderRadius: theme.shape.borderRadius,
    // backgroundColor: fade(theme.palette.common.white, 0.05),
    // "&:hover": {
    //   backgroundColor: fade(theme.palette.common.white, 0.1)
    // }
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  heading: {
    fontSize: "20px"
  }
}));

const DashBoard = ({ auth: {isAuthenticated, loading}, Logout}) =>  {
  const classes = useStyles();
  const theme = useTheme();
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const [open, setOpen] = React.useState(false);
  const [dopen, setDOpen] = React.useState(false);
  const [page, setPage] = React.useState("Listing");
  var widthContent = !isMobile ? "md" : "sm";

  const handleClickOpen = () => {
    setDOpen(true);
  };

  const handleClose = () => {
    setDOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const th = createMuiTheme({
    palette: {
      primary: {
        main: "#00897b"
      },
      secondary: {
        main: "#26a69a"
      }
    }
  });

  const logoutt = () => {
    Logout();
    window.location.href = "/signin";
  }
  // if(!loading) {
  //   return <Redirect to ="/signin" />
  // }  

  return (
    <ThemeProvider theme={th}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="primary"
          elevation={0}
          className={clsx(classes.appBar, { [classes.appBarShift]: open })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open
              })}
            >
              <MenuIcon />
            </IconButton>
            <img src="logod.svg" height="70" width="90" />
            <p className={classes.heading}> | {page} </p>
            {/* <Divider orientation="vertical" /> */}
            <IconButton
              className={classes.account}
              onClick={handleClickOpen}
              color="inherit"
            >
              <ExitToAppOutlinedIcon color="inherit" />
            </IconButton>
            <Dialog
              open={dopen}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {" Please don't go! "}
                <Cry />
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Hey, you made plazd a valuable platform. Please spend more
                  quality time with us.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="outlined"
                  onClick={handleClose}
                  color="primary"
                  disableElevation
                  autoFocus
                  outline
                >
                  Mission Abort
                </Button>
                <Button onClick={logoutt} color="primary" disableElevation>
                  Bye
                </Button>
              </DialogActions>
            </Dialog>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })
          }}
        >
          <div className={classes.toolbar}>
            <List>
              <ListItem key="User">
                <ListItemIcon>
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </ListItemIcon>
                <ListItemText primary="Hi!" />
              </ListItem>
            </List>
            <IconButton onClick={handleDrawerClose} className={classes.leftc}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          {/* <Divider /> */}

          <List>
            {
              <ListItem button>
                <ListItemIcon>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText primary="Listing" />
              </ListItem>
            }

            {
              <ListItem button key="apply">
                <ListItemIcon>
                  <TrackChangesIcon />
                </ListItemIcon>
                <ListItemText primary="Radar" />
              </ListItem>
            }
            {
              <ListItem button key="interviewexp">
                <ListItemIcon>
                  <PeopleAltOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Interview Exp" />
              </ListItem>
            }
            {
              <ListItem button key="friend">
                <ListItemIcon>
                  <ContactsOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Friend's Résume" />
              </ListItem>
            }
            {
              <ListItem button key="stats">
                <ListItemIcon>
                  <AccountBalanceOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Institute's Speaker" />
              </ListItem>
            }
          </List>
          <Divider />
          <List>
            {
              <ListItem button key="erésumé">
                <ListItemIcon>
                  <AccountCircleOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Your Résume" />
              </ListItem>
            }
            {
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button key="profile">
                    <ArrowRightOutlinedIcon />
                    <ListItemIcon>
                      <FaceOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </ListItem>
                  <ListItem button key="experience">
                    <ArrowRightOutlinedIcon />
                    <ListItemIcon>
                      <BeenhereOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Experiences" />
                  </ListItem>
                  <ListItem button key="project">
                    <ArrowRightOutlinedIcon />
                    <ListItemIcon>
                      <BookOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Projects" />
                  </ListItem>                
                <ListItem button key="ach">
                    <ArrowRightOutlinedIcon />
                    <ListItemIcon>
                      <DoneOutlineOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Achievements" />
                  </ListItem>
                </List>
              </Collapse>
            }
            {
              <ListItem button key="feedback">
                <ListItemIcon>
                  <FeedbackIcon />
                </ListItemIcon>
                <ListItemText primary="Feedback" />
              </ListItem>
            }
            
          </List>
          {/* <div class={classes.bottom}>
            <List>
              {
                <ListItem button key="logout" onClick={handleClickOpen}>
                  <ListItemIcon>
                    <ExitToAppOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Log Out" />
                </ListItem>
              }
            </List>
          </div> */}
        </Drawer>

        <main className={classes.content}>
          <Container maxWidth={widthContent}>
            <div className={classes.toolbar} />
            {/* <Listing />
            <Applied /> */}
          </Container>
        </main>
      </div>
    </ThemeProvider>
  );
}

DashBoard.propTypes = {
    Logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProp = state => ({
    auth: state.auth
});

export default connect(mapStateToProp, {Logout})(DashBoard);

// {
//     <ListItem button key="logout" onClick={handleClickOpen}>
//       <ListItemIcon>
//         <ExitToAppOutlinedIcon />
//         {/* <cry /> */}
//       </ListItemIcon>
//       <ListItemText primary="Log Out" />
//     </ListItem>
//   }