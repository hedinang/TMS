import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import {
  faBars, faEnvelope, faBell, faTv, faSignOutAlt, faMapMarkerAlt, faTruck, faUsers,
  faUser, faStickyNote, faTrashAlt, faCog, faBalanceScale, faTasks, faCheck, faMoneyBillAlt
} from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AppRoutes from './AppRoutes'
import {
  InputBase, MenuItem, TextField, MenuList, ClickAwayListener, Grow, Paper, Button, Popper,
  ListItemIcon, ListItemText, ListItem, List, Toolbar, AppBar, Drawer
} from '@material-ui/core';
import { Link } from "react-router-dom";
import CookieService from './services/CookieService';
import EventSource from 'eventsource';
import NotificationService from './services/NotificationService';
import Condition from './models/Condition';
import UserService from './services/UserService';
import GroupService from './services/GroupService';
const drawerWidth = 220
let notificationService = new NotificationService()
let userService = new UserService()
let groupService = new GroupService()
let cookieService = new CookieService()
let userId = parseInt(cookieService.read('userId'))
let userName = cookieService.read('userName')
let avatar = cookieService.read('avatar')
let role = cookieService.read('role')
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
    paddingLeft: theme.spacing(7)
  },
  primary: {
    paddingLeft: theme.spacing(3.4)
  }
}))

function NotifyItem(props) {
  let removeInvitation = () => {
    notificationService.delete(props.data.id)
      .finally(() => {
        props.processNotify()
      })
  }
  let acceptInvitation = () => {
    let request = {
      notificationId: props.data.id,
      userId: props.data.userId,
      groupId: props.data.groupId,
    }
    groupService.acceptJoin(request)
      .finally(() => {
        props.acceptJoin()
      })
  }
  switch (props.data.type) {
    case 0:
      return <MenuItem
        style={{ width: '24rem' }}>
        {/* <div className="ml-2" style={{ width: '16rem' }}>
          <div title={props.data.content} style={{ fontSize: '15px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{props.data.content}</div>
        </div> */}
        <Link to="/group" className="btn btn-primary">{props.data.content}</Link>
      </MenuItem>
    case 1:// notification la loi moi gia nhap nh
      return <MenuItem
        style={{ width: '24rem' }}>
        <div className="ml-2" style={{ width: '16rem' }}>
          <div title={props.data.content} style={{ fontSize: '15px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{props.data.content}</div>
        </div>
        <div className="ml-2">
          <button
            onClick={removeInvitation}
            style={{ background: '#fc424a', color: 'white', width: '3rem', height: '1.5rem' }} className="btn btn-rounded btn-icon">
            <FontAwesomeIcon icon={faTrashAlt} style={{ fontSize: '1rem', marginBottom: '5px' }} />
          </button>
        </div>

        <Link to='/group'
          onClick={acceptInvitation}
          style={{ background: '#00d25b', color: 'white', width: '3rem', height: '1.5rem', textAlign: 'center' }}
          className="btn btn-rounded btn-icon">
          <FontAwesomeIcon icon={faCheck} style={{ fontSize: '1rem', marginBottom: '5px' }} />
        </Link>

      </MenuItem>
    case 2:
      return <MenuItem
        style={{ width: '24rem' }}>
        <div className="ml-2" style={{ width: '16rem' }}>
          <div title={props.data.content} style={{ fontSize: '15px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{props.data.content}</div>
        </div>
      </MenuItem>
    default:
      break;
  }
}
function Notification(props) {
  let [notificationWait, setNotificationWait] = useState({
    show: 'none',
    count: 0
  })
  useEffect(() => {
    if (props.access === true) {
      let eventSource = new EventSource('http://localhost:8090/tms/notification/sse/' + props.userId, {
        headers: {
          Authorization: 'Bearer ' + new CookieService().read('token')
        }
      })
      eventSource.onmessage = (event) => {
        let count = parseInt(event.data)
        let notificationWait
        if (count === 0) notificationWait = { show: 'none', count: 0 }
        else if (count > 0 && count < 100) notificationWait = { show: 'inline', count: event.data }
        else notificationWait = { show: 'inline', count: '99+' }
        setNotificationWait(notificationWait)
      }
    }
  }, [props.access])
  let toggleNotify = () => {
    if (notificationWait.count !== 0) {
      userService.updateNotification(props.userId, true)
    }
    props.toggleNotify()
  }
  return <Button
    style={{ outlineStyle: 'none', fontSize: '1.1rem' }} ref={null}
    onClick={toggleNotify}
  >
    <FontAwesomeIcon icon={faBell} />
    <div className="count bg-success"
      style={{
        fontSize: '15px', color: 'white', borderRadius: '50%', display: notificationWait.show,
        width: '24px', height: '24px', marginBottom: '20px'
      }}
    >{notificationWait.count}</div>
  </Button>
}
function SideBar(props) {
  let [link, setLink] = useState('false')
  const classes = useStyles()
  let changeLink = (event) => {
    setLink(event)
  }
  switch (props.role) {
    case 'Root':
      return <List>
        <ListItem button className={classes.primary} component={Link} to="/dashboard" onClick={() => {
          changeLink('/dashboard')
        }}>
          <ListItemIcon >
            <FontAwesomeIcon icon={faTv} className='mr-2' />
          </ListItemIcon>
          <ListItemText primary='Trang chủ' />
        </ListItem>
        {/* <ListItem button className={classes.primary} component={Link} to="/order" onClick={() => {
          changeLink('/order')
        }}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faStickyNote} className='mr-2' />
          </ListItemIcon>
          <ListItemText primary="Đơn hàng" />
        </ListItem> */}
        <ListItem button className={classes.primary} component={Link} to="/truck-group" onClick={() => {
          changeLink('/truck-group')
        }}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faBalanceScale} className='mr-2' />
          </ListItemIcon>
          <ListItemText primary="Nhà thầu" />
        </ListItem>
        <ListItem button className={classes.primary} component={Link} to="/trip" onClick={() => {
          changeLink('/trip')
        }}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faTruck} className='mr-2' />
          </ListItemIcon>
          <ListItemText primary="Chuyến hàng" />
        </ListItem>
        <ListItem button className={classes.primary} component={Link} to="/account" onClick={() => {
          changeLink('/account')
        }}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faUser} className='mr-2' />
          </ListItemIcon>
          <ListItemText primary="Tài khoản" />
        </ListItem>
        <ListItem button className={classes.primary} component={Link} to="/role" onClick={() => {
          changeLink('/role')
        }}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faTasks} className='mr-2' />
          </ListItemIcon>
          <ListItemText primary="Quyền hạn" />
        </ListItem>
        <ListItem button className={classes.primary} component={Link} to="/address" onClick={() => {
          changeLink('/address')
        }}>
          <ListItemIcon >
            <FontAwesomeIcon icon={faMapMarkerAlt} className='mr-2' />
          </ListItemIcon>
          <ListItemText primary='Địa chỉ' />
        </ListItem>
      </List>
    case 'Trucker':
      return <List>
        <ListItem button className={classes.primary} component={Link} to="/dashboard" onClick={() => {
          changeLink('/dashboard')
        }}>
          <ListItemIcon >
            <FontAwesomeIcon icon={faTv} className='mr-2' />
          </ListItemIcon>
          <ListItemText primary='Trang chủ' />
        </ListItem>
        {/* <ListItem button className={classes.primary} component={Link} to="/order" onClick={() => {
          changeLink('/order')
        }}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faStickyNote} className='mr-2' />
          </ListItemIcon>
          <ListItemText primary="Đơn hàng" />
        </ListItem> */}
        <ListItem button className={classes.primary} component={Link} to="/quotation" onClick={() => {
          changeLink('/quotation')
        }}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faMoneyBillAlt} className='mr-2' />
          </ListItemIcon>
          <ListItemText primary="Báo giá" />
        </ListItem>
        {/* <ListItem button className={classes.primary} component={Link} to="/account" onClick={() => {
          changeLink('/account')
        }}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faUser} className='mr-2' />
          </ListItemIcon>
          <ListItemText primary="Tài khoản" />
        </ListItem> */}
        <ListItem button className={classes.primary} component={Link} to='/group' onClick={() => {
          changeLink('/group')
        }}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faUsers} className='mr-2' />
          </ListItemIcon>
          <ListItemText primary="Hội nhóm" />
        </ListItem>
        <ListItem button className={classes.primary} component={Link} to="/address" onClick={() => {
          changeLink('/address')
        }}>
          <ListItemIcon >
            <FontAwesomeIcon icon={faMapMarkerAlt} className='mr-2' />
          </ListItemIcon>
          <ListItemText primary='Địa chỉ' />
        </ListItem>
      </List>
    default:
      return null
  }



}

function App() {
  const classes = useStyles()
  const anchorRef = React.useRef(null)
  const [open, setOpen] = useState(true)
  let [openUser, setOpenUser] = useState(false)
  let [openNotify, setOpenNotify] = useState(false)
  let [openMessage, setOpenMessage] = useState(false)
  let [notification, setNotification] = useState([])
  let [access, setAccess] = useState(false)
  let [link, setLink] = useState(window.location.pathname)

  let pages = [1, 10, "id", 0]
  let conditions = [{
    key: 'userId',
    operation: 0,
    value: userId
  }]
  let condition = new Condition(pages, conditions)
  let handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  }
  const handleDrawerClose = () => {
    setOpen(false);
  }
  let closeMessage = event => {
    setOpenMessage(false)
  }
  let closeNotify = event => {
    setOpenNotify(false)
  }
  let processNotify = event => {
    notificationService.search(condition).then(value => {
      setNotification(value.result)
    })
  }
  let acceptJoin = event => {
    if (link === '/group')
      window.location.reload()
    else
      notificationService.search(condition).then(value => {
        setNotification(value.result)
        return <Link to='/group' />
      })
    setLink('/group')
  }
  let closeUser = event => {
    setOpenUser(false)
  }

  let logOut = event => {
    let cookieService = new CookieService()
    new UserService().clearCache(userId)
    cookieService.clearAll()
    window.location.reload()
  }
  let toggleMessage = () => {
    setOpenMessage(!openMessage)
  }
  let toggleNotify = () => {

    notificationService.search(condition).then(value => {
      setNotification(value.result)
    })
    setOpenNotify(!openNotify)

  }
  let toggleUser = () => {
    setOpenUser(!openUser)
  }

  if (cookieService.read('token') === '') {
    access = false
  }
  else {
    access = true
  }
  useEffect(() => {
    setLink(window.location.pathname)
    if (cookieService.read('token') === '') setAccess(false)
    else setAccess(true)
  }, [access])
  if (access === false)
    return (
      <div className='content-wrapper' style={{ background: 'white' }}>
        <AppRoutes access={access} />
      </div>
    )
  else {

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
                    {/* <div className="count bg-success"
                      style={{ fontSize: '15px', color: 'white', borderRadius: '50%', width: '24px', height: '24px', marginBottom: '20px' }}
                    >7</div> */}
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
                  <Notification toggleNotify={toggleNotify} userId={userId} access={access} />
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
                              {
                                notification.map(e => {
                                  return <NotifyItem data={e} closeNotify={closeNotify} processNotify={processNotify} acceptJoin={acceptJoin} link={link} />
                                })
                              }
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
                    {/* <img src={avatar} /> */}
                    <div
                      style={{ fontSize: '15px', color: 'black', height: '24px', marginLeft: '20px' }}
                    >{userName}</div>
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
                              {/* <MenuItem onClick={closeUser} style={{ width: '15rem' }}>
                                <img src={require('../assets/images/faces/face4.jpg')}
                                  style={{ maxHeight: '40px', maxWidth: '40px' }} className="rounded-circle" />
                                <div className="ml-2">
                                  <div style={{ fontSize: '15px', marginLeft: '2rem' }}>Chuyển tài khoản</div>

                                </div>
                              </MenuItem> */}
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
          <SideBar role={role} />
        </Drawer>
        <div style={{ overflowX: 'hidden', marginTop: '4rem' }}>
          <AppRoutes access={access} />
        </div>
      </div>
    )
  }
}
function select(state) {
  return {
    state: state.reducer
  }
}
export default connect(select)(App)
