import Paper from '@material-ui/core/Paper';
import { action } from '../../redux/actions/actions'
import { connect } from 'react-redux'
import { faTrashAlt, faPencilAlt } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react';
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Dialog } from '@material-ui/core';
import Draggable from 'react-draggable';
class DialogCustom extends Component {
    state = {
        isOpen: false,
        setOpen: true
    }
    PaperComponent = (props) => {
        return (
            <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
                <Paper {...props} />
            </Draggable>
        );
    }

    // handleClickOpen = () => {
    //     setOpen(true);
    // };

    handleClose = () => {
        this.setState({
            isOpen: false
        })
    };
    handleOpen = () => {

    }
    componentWillReceiveProps() {
        this.setState({
            isOpen: this.props.open
        })
    }
    render() {


        return <Dialog
            open={this.state.isOpen}
            onClose={this.handleClose}
            PaperComponent={this.PaperComponent}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                Subscribe
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We will send updates
                    occasionally.
                 </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={this.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={this.handleClose} color="primary">
                    Subscribe
                </Button>
            </DialogActions>
        </Dialog>
    }
}
export default DialogCustom