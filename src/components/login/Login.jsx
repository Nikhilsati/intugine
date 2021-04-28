import { Paper, Grid, TextField, Button, makeStyles } from '@material-ui/core';
import React, { useState, useContext } from 'react';
import { MyContext } from '../../App';
import { login } from '../../services/auth';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    width: '100vw',
  },
});
const Login = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useContext(MyContext);
  const handleLogin = () => {
    login(user, password).then((res) => setToken(res));
  };
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Grid
        container
        style={{ height: '100%' }}
        alignItems='center'
        spacing={2}
        justify='center'
      >
        <Grid item>
          <TextField
            label='User Name'
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            label='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Button variant='contained' color='primary' onClick={handleLogin}>
            Login
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Login;
