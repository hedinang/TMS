import React, { Component, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Collapse from '@material-ui/core/Collapse';
import { Trans } from 'react-i18next';
import { AiOutlineMenu } from 'react-icons/ai'
import { connect } from 'react-redux'
import { action } from '../../redux/actions/actions'
import { faBars, faAngleDown } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { List, ListItem, ListItemIcon, ListItemText, ListSubheader, makeStyles } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import StarBorder from '@material-ui/icons/StarBorder';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
function Sidebar() {


  let [open, setOpen] = useState(false)

  let drawerWidth = 200
  let useStyles = makeStyles((theme) => ({
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
      maxWidth: '1760px'
    },
    nested: {
      paddingLeft: theme.spacing(4)
    },
    primary: {
      paddingLeft: theme.spacing(3)
    }
  }));
  let classes = useStyles()
  return (
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
          // onClick={handleDrawerClose}
          style={{ background: 'white', border: 'none', fontSize: '1.1rem', outlineStyle: 'none' }}>
          <FontAwesomeIcon icon={faBars} className='mr-2' />
        </button>
      </div>
      <List>
        <ListItem button key='text' className={classes.primary} component="a" href="/employee/account">
          <ListItemIcon ><InboxIcon /></ListItemIcon>
          <ListItemText primary='text' />
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Starred" />
              {/* <Link to="/employee/account" id='store' /> */}
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Drawer>
  )

}
function select(state) {
  return {
    state: state.reducer
  }
}
export default withRouter(connect(select)(Sidebar))