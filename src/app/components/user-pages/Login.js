import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import UserService from '../../services/UserService';
import CookieService from '../../services/CookieService';
import { LinearProgress } from '@material-ui/core';
import { Redirect } from 'react-router';
export default class SignIn extends Component {
  state = {
    paper: {
      marginTop: createMuiTheme().spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: createMuiTheme().spacing(1),
      backgroundColor: createMuiTheme().palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: createMuiTheme().spacing(1),
    },
    submit: {
      margin: createMuiTheme().spacing(3, 0, 2),
    },
    currentCount: 10,
    borderBottom: '5px',
    disabled: false,
    display: 'none',
    error: {
      display: 'none',
      message: 'Lỗi mạng',
    }
  }
  login = (e) => {
    let username = document.getElementById('username').value
    let password = document.getElementById('password').value
    let userService = new UserService()
    let cookieService = new CookieService()
    this.setState({
      disabled: true,
      borderBottom: '5px',
      display: '',

    })
    userService.login(username, password).then(response => {
      cookieService.create('token', response.result.token)
      window.location.reload();
    }).catch(error => {
      this.setState({
        disabled: false,
        borderBottom: '5px',
        display: 'none',
        error: {
          display: '',
          message: error.message
        }
      })
    })

  }
  render() {
    return (
      <Container maxWidth="xs">
        <CssBaseline />
        <div className={this.state.paper}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={require('../../../assets/images/icons/logistic_icon.png')}
              style={{ height: '40%', width: '40%' }} />
          </div>
          <form className={this.state.form} noValidate>
            <TextField
              disabled={this.state.disabled}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Tên đăng nhập"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              disabled={this.state.disabled}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" disabled={this.state.disabled} />}
              label="Giữ đăng nhập"
            />
            <div style={{ display: `${this.state.error.display}`, color: 'red' }}>{this.state.error.message}</div>
            <Button
              disabled={this.state.disabled}
              style={{
                borderTopLeftRadius: '5px', borderTopRightRadius: '5px',
                borderBottomRightRadius: `${this.state.borderBottom}`, borderBottomLeftRadius: `${this.state.borderBottom}`
              }}
              fullWidth
              variant="contained"
              color="primary"
              className={this.state.submit}
              onClick={this.login}
            >
              Đăng nhập
          </Button>
            <LinearProgress style={{
              display: `${this.state.display}`, borderBottomRightRadius: '5px',
              borderBottomLeftRadius: '5px'
            }} />
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Quên mật khẩu?
              </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  Tạo tải khoản
              </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container >
    );
  }
}