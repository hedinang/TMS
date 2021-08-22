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
import React, { useEffect, useState } from 'react';
function SignIn() {


  let paper = {
    marginTop: createMuiTheme().spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
  let avatar = {
    margin: createMuiTheme().spacing(1),
    backgroundColor: createMuiTheme().palette.secondary.main,
  }
  let form = {
    width: '100%', // Fix IE 11 issue.
    marginTop: createMuiTheme().spacing(1),
  }
  let submit = {
    margin: createMuiTheme().spacing(3, 0, 2),
  }
  let borderBottom = '5px'
  let [disabled, setDisabled] = useState(false)
  let [display, setDisplay] = useState('none')
  let [error, setError] = useState({
    display: 'none',
    message: 'Lỗi mạng',
  })
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')
  let login = (e) => {
    let userService = new UserService()
    let cookieService = new CookieService()
    borderBottom = '5px'
    setDisplay('flex')
    setDisabled(true)
    userService.login(username, password).then(response => {
      cookieService.create('token', response.result.token)
      cookieService.create('userId', response.result.id)
      cookieService.create('userName', response.result.name)
      cookieService.create('role', response.result.roleName)
      cookieService.create('avatar', response.result.avatar)
      window.location.reload();
    }).catch(error => {
      if (error.response.data.message === 'user.not_found') {
        setError({
          display: 'inline',
          message: 'Tài khoản không đúng',
        })
        setDisplay('none')
        setDisabled(false)
      }
    })

  }
  let changeUserName = e => {
    setUsername(e.target.value)
  }
  let changePassword = e => {
    setPassword(e.target.value)
  }
  return (
    <div>
      <Container maxWidth="xs">
        <CssBaseline />
        <div className={paper}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={require('../../../assets/images/icons/logistic_icon.png')}
              style={{ height: '40%', width: '40%' }} />
          </div>
          <form className={form} noValidate>
            <TextField
              onChange={changeUserName}
              disabled={disabled}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Tên đăng nhập"
              autoFocus
            />
            <TextField
              onChange={changePassword}
              disabled={disabled}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Mật khẩu"
              type="password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" disabled={disabled} />}
              label="Giữ đăng nhập"
            />
            <div style={{ display: `${error.display}`, color: 'red' }}>{error.message}</div>
            <Button
              disabled={disabled}
              style={{
                borderTopLeftRadius: '5px', borderTopRightRadius: '5px',
                borderBottomRightRadius: `${borderBottom}`, borderBottomLeftRadius: `${borderBottom}`
              }}
              fullWidth
              variant="contained"
              color="primary"
              className={submit}
              onClick={login}
            >
              Đăng nhập
          </Button>
            <LinearProgress style={{
              display: `${display}`,
              borderBottomRightRadius: '5px',
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
    </div>
  )
}
export default SignIn