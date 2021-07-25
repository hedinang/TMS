import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import StarBorder from '@material-ui/icons/StarBorder';
import Collapse from '@material-ui/core/Collapse';
import { connect } from 'react-redux'
import {
  faBars, faEnvelope, faBell, faTv, faTruckMoving, faSignOutAlt,
  faUser, faIdCard, faRulerVertical, faAngleDown, faAngleUp, faCog
} from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AppRoutes from './AppRoutes'
import { InputBase, MenuItem, TextField, MenuList, ClickAwayListener, Grow, Paper, Button, Popper } from '@material-ui/core';
import Sidebar from './components/shared/Sidebar';
import { Link } from "react-router-dom";
import CookieService from './services/CookieService';
const drawerWidth = 220
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '32px',
    "& .MuiPaper-root": {

      // borderRadius: "100px",
      boxShadow: "none",
      borderRight: "none",
    },
    "& .MuiToolbar-regular": {

      minHeight: 'none'
    },
  },
  appBar: {

    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    fontSize: '15px',
    border: 'none',
    flexGrow: 1,
    paddingTop: theme.spacing(8),
    overflow: 'hiden',
    maxWidth: '1600px'
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  primary: {
    paddingLeft: theme.spacing(3.4)
  }
}))
function UpDownAction(event) {
  let [open, setOpen] = useState(false)
  useEffect(() => {
    setOpen(event.open)
  }, [event.open])
  if (open)
    return <FontAwesomeIcon icon={faAngleUp} className='mr-2' style={{ marginLeft: 'auto' }} />
  return <FontAwesomeIcon icon={faAngleDown} className='mr-2' style={{ marginLeft: 'auto' }} />
}

function App() {
  const classes = useStyles()
  const theme = useTheme()
  const anchorRef = React.useRef(null)
  const [open, setOpen] = useState(false)
  let [openUser, setOpenUser] = useState(false)
  let [openNotify, setOpenNotify] = useState(false)
  let [openMessage, setOpenMessage] = useState(false)
  let [downAccount, setDowAccount] = useState(false)
  let cookieService = new CookieService()

  let handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  let status = [
    { id: 0, name: 'Đang chờ' },
    { id: 1, name: 'Đang khóa' },
    { id: 2, name: 'Đã kích hoạt' }
  ]
  let closeMessage = event => {
    setOpenMessage(false)
  }
  let closeNotify = event => {
    setOpenNotify(false)
  }
  let closeUser = event => {
    setOpenUser(false)
  }
  let logOut = event => {
    let cookieService = new CookieService()
    cookieService.delete('token')
    setOpenUser(false)
  }
  let toggleMessage = () => {
    setOpenMessage(!openMessage)
  }
  let toggleNotify = () => {
    setOpenNotify(!openNotify)
  }
  let toggleUser = () => {
    setOpenUser(!openUser)
  }
  let downClick = () => {
    setDowAccount(!downAccount)

  }
  if (cookieService.read('token') === '')
    return (
      <div className='content-wrapper' style={{ background: 'white' }}>
        <AppRoutes access={false} />
      </div>
    )
  else
    return (
      <div className={classes.root} style={{ boxShadow: "none" }}>
        <AppBar
          style={{ background: 'white' }}
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar >
            <button
              style={{ background: 'white', border: 'none', fontSize: '1.2rem', outlineStyle: 'none' }}
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <FontAwesomeIcon icon={faBars} className='mr-2' />
            </button>
            <div className='row col-12'>
              <div className='col-3'>
              </div>
              <div className='col-3' >
                <InputBase placeholder='Tìm kiếm' />

              </div>
              <div className='col-3'></div>
              <div className='col-3'>
                <div >
                  <Button
                    style={{ outlineStyle: 'none', fontSize: '1.1rem' }} ref={anchorRef}
                    onClick={toggleMessage}
                  >
                    <FontAwesomeIcon icon={faEnvelope} />
                    <div className="count bg-success"
                      style={{ fontSize: '15px', color: 'white', borderRadius: '50%', width: '24px', height: '24px', marginBottom: '20px' }}
                    >7</div>
                  </Button>
                  <Popper
                    open={openMessage}
                    anchorEl={anchorRef.current}
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === "bottom" ? "center top" : "center bottom"
                        }}
                      >
                        <Paper style={{ border: '1px solid #d1d3d5', borderTop: 'none', borderRadius: '5px' }}>
                          <ClickAwayListener onClickAway={closeMessage}>
                            <MenuList
                              autoFocusItem={openMessage}
                              id="menu-list-grow"
                              onKeyDown={handleListKeyDown}
                            >
                              <MenuItem
                                // onClick={closeMessage} 
                                style={{ width: '24rem' }}>
                                <TextField style={{ fontSize: '15px' }} placeholder="Tìm kiếm"
                                  InputProps={{ disableUnderline: true }} />
                              </MenuItem>
                              <MenuItem onClick={closeMessage} style={{ width: '24rem' }}>
                                <img src={require('../assets/images/faces/face4.jpg')}
                                  style={{ maxHeight: '60px', maxWidth: '60px' }} className="rounded-circle" />
                                <div className="ml-2">
                                  <div style={{ fontSize: '15px' }}>Mạnh cccccccccc</div>
                                  <div className="text-muted" style={{ fontSize: '12px' }}>
                                    <span>Hôm qua đi đâu vậy - 1 ngày trước</span>
                                  </div>
                                </div>
                              </MenuItem>
                              <MenuItem onClick={closeMessage} style={{ width: '24rem' }}>
                                <img src={require('../assets/images/faces/face3.jpg')}
                                  style={{ maxHeight: '60px', maxWidth: '60px' }} className="rounded-circle" />
                                <div className="ml-2">
                                  <div style={{ fontSize: '15px' }}>Mạnh HùngCCC</div>
                                  <div className="text-muted" style={{ fontSize: '12px' }}>
                                    <span>Hôm qua đi đâu vậy - 1 ngày trước</span>
                                  </div>
                                </div>
                              </MenuItem>
                              <MenuItem onClick={closeMessage} style={{ width: '24rem' }}>
                                <img src={require('../assets/images/faces/face2.jpg')}
                                  style={{ maxHeight: '60px', maxWidth: '60px' }} className="rounded-circle" />
                                <div className="ml-2">
                                  <div style={{ fontSize: '15px' }}>Mạnh Hùng</div>
                                  <div className="text-muted" style={{ fontSize: '12px' }}>
                                    <span>Hôm qua đi đâu vậy - 1 ngày trước</span>
                                  </div>
                                </div>
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                  <Button
                    style={{ outlineStyle: 'none', fontSize: '1.1rem' }} ref={anchorRef}
                    onClick={toggleNotify}
                  >
                    <FontAwesomeIcon icon={faBell} />
                    <div className="count bg-success"
                      style={{ fontSize: '15px', color: 'white', borderRadius: '50%', width: '24px', height: '24px', marginBottom: '20px' }}
                    >10</div>
                  </Button>
                  <Popper
                    open={openNotify}
                    anchorEl={anchorRef.current}
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === "bottom" ? "center top" : "center bottom"
                        }}
                      >
                        <Paper style={{ border: '1px solid #d1d3d5', borderTop: 'none', borderRadius: '5px' }}>
                          <ClickAwayListener onClickAway={closeNotify}>
                            <MenuList
                              autoFocusItem={openNotify}
                              id="menu-list-grow"
                              onKeyDown={handleListKeyDown}
                            >
                              <MenuItem style={{ width: '24rem' }}>
                                <TextField style={{ fontSize: '15px' }} placeholder="Tìm kiếm"
                                  InputProps={{ disableUnderline: true }} />
                              </MenuItem>
                              <MenuItem onClick={closeNotify} style={{ width: '24rem' }}>
                                <img src={require('../assets/images/faces/face4.jpg')}
                                  style={{ maxHeight: '60px', maxWidth: '60px' }} className="rounded-circle" />
                                <div className="ml-2">
                                  <div style={{ fontSize: '15px' }}>Mạnh Hùng</div>
                                  <div className="text-muted" style={{ fontSize: '12px' }}>
                                    <span>Hôm qua đi đâu vậy - 1 ngày trước</span>
                                  </div>
                                </div>
                              </MenuItem>
                              <MenuItem onClick={closeNotify} style={{ width: '24rem' }}>
                                <img src={require('../assets/images/faces/face3.jpg')}
                                  style={{ maxHeight: '60px', maxWidth: '60px' }} className="rounded-circle" />
                                <div className="ml-2">
                                  <div style={{ fontSize: '15px' }}>Mạnh Hùng</div>
                                  <div className="text-muted" style={{ fontSize: '12px' }}>
                                    <span>Hôm qua đi đâu vậy - 1 ngày trước</span>
                                  </div>
                                </div>
                              </MenuItem>
                              <MenuItem onClick={closeNotify} style={{ width: '24rem' }}>
                                <img src={require('../assets/images/faces/face2.jpg')}
                                  style={{ maxHeight: '60px', maxWidth: '60px' }} className="rounded-circle" />
                                <div className="ml-2">
                                  <div style={{ fontSize: '15px' }}>Mạnh Hùng</div>
                                  <div className="text-muted" style={{ fontSize: '12px' }}>
                                    <span>Hôm qua đi đâu vậy - 1 ngày trước</span>
                                  </div>
                                </div>
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                  <Button
                    style={{ outlineStyle: 'none', fontSize: '1.1rem' }} ref={anchorRef}
                    onClick={toggleUser}
                  >
                    <FontAwesomeIcon icon={faBell} />
                    <div
                      style={{ fontSize: '15px', color: 'black', height: '24px', marginLeft: '20px' }}
                    >Trần Dũng</div>
                  </Button>
                  <Popper
                    open={openUser}
                    anchorEl={anchorRef.current}
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === "bottom" ? "center top" : "center bottom"
                        }}
                      >
                        <Paper style={{ border: '1px solid #d1d3d5', borderTop: 'none', borderRadius: '5px' }}>
                          <ClickAwayListener
                            onClickAway={closeUser}
                          >
                            <MenuList
                              autoFocusItem={openUser}
                              id="menu-list-grow"
                              onKeyDown={handleListKeyDown}
                            >
                              <MenuItem onClick={closeUser} style={{ width: '15rem' }}>
                                <img src={require('../assets/images/faces/face4.jpg')}
                                  style={{ maxHeight: '40px', maxWidth: '40px' }} className="rounded-circle" />
                                <div className="ml-2">
                                  <div style={{ fontSize: '15px', marginLeft: '2rem' }}>Chuyển tài khoản</div>

                                </div>
                              </MenuItem>
                              <MenuItem onClick={closeUser} style={{ width: '15rem' }}>
                                <FontAwesomeIcon style={{ fontSize: '2.5rem' }} icon={faCog} />
                                <div className="ml-2">
                                  <div style={{ fontSize: '15px', marginLeft: '2rem' }}>Cài đặt tài khoản</div>

                                </div>
                              </MenuItem>
                              <MenuItem onClick={logOut} style={{ width: '15rem' }}>
                                <FontAwesomeIcon style={{ fontSize: '2.5rem' }} icon={faSignOutAlt} />
                                <div className="ml-2">
                                  <div style={{ fontSize: '15px', marginLeft: '2rem' }}>Đăng xuất</div>

                                </div>
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </div>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <button
              onClick={handleDrawerClose}
              style={{ background: 'white', border: 'none', fontSize: '1.2rem', outlineStyle: 'none' }}>
              <FontAwesomeIcon icon={faBars} className='mr-2' />
            </button>
          </div>
          <List>
            <ListItem button key='text' className={classes.primary} component={Link} to="/dashboard">
              <ListItemIcon >
                <FontAwesomeIcon icon={faTv} />
              </ListItemIcon>
              <ListItemText primary='Trang chủ' />
            </ListItem>
            <ListItem button key='text' className={classes.primary} component={Link} to="/booking">
              <ListItemIcon >
                <FontAwesomeIcon icon={faTruckMoving} className='mr-2' />
              </ListItemIcon>
              <ListItemText primary='Đặt chuyến' />
            </ListItem>
            <ListItem button key='text' className={classes.primary} onClick={downClick}>
              <ListItemIcon >
                <FontAwesomeIcon icon={faIdCard} className='mr-2' />
              </ListItemIcon>
              <ListItemText primary='Nhân sự' />
              <ListItemIcon >
                <UpDownAction open={downAccount} />
              </ListItemIcon>
            </ListItem>
            <Collapse in={downAccount} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested} component={Link} to="/employee/account">
                  <ListItemIcon>
                    <FontAwesomeIcon icon={faUser} className='mr-2' />
                  </ListItemIcon>
                  <ListItemText primary="Tài khoản" />
                </ListItem>
                <ListItem button className={classes.nested} component={Link} to="/employee/role">
                  <ListItemIcon>
                    <FontAwesomeIcon icon={faRulerVertical} className='mr-2' />
                  </ListItemIcon>
                  <ListItemText primary="Quyền hạn" />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div>
            <AppRoutes access={true} />
          </div>
        </main>
      </div>
    )
}
function select(state) {
  return {
    state: state.reducer
  }
}
export default connect(select)(App)
