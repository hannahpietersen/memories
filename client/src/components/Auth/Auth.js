import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core'
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { GoogleLogin } from 'react-google-login';


import useStyles from './styles'
import { AUTH } from '../../constants/actionTypes';
import { signin, signup } from '../../actions/auth'
import Input from './Input'
import Icon from './Icon'


const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Auth = () => {
   const classes = useStyles() 
   const navigate = useNavigate()
   const dispatch = useDispatch()
    

   const [form, setForm] = useState(initialState)
   const [isSignup, setIsSignup] = useState(false); 
   const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

              //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 client secret
    

  const handleSubmit = (e) => {
    e.preventDefault();
            
      if (isSignup) {
          dispatch(signup(form, navigate));
      } else {
          dispatch(signin(form, navigate));
          }
      }

      const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const switchMode = () => {
        //setForm(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
      };


    const googleSuccess = async (res) => {
      const result = res?.profileObj
      const token = res?.tokenId

      try {
        dispatch({ type: AUTH, data: { result, token } });
  
        navigate.push('/');
      } catch (error) {
        console.log(error);
      }
    }
      
      
      const googleError = () => console.log('Google Sign In was unsuccessful. Try again later');
    
 
    return (
        <Container component="main" maxWidth="xs">
          <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                { isSignup && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
                )}
                <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
              </Grid>
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                { isSignup ? 'Sign Up' : 'Sign In' }
              </Button>
              <GoogleLogin clientId= "707050532629-0l140ec8fq37ql1l83m3adg8sjbc40pj.apps.googleusercontent.com"
               render={(renderProps) => (
                <Button className={classes.googleButton} color="primary" 
                fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} 
                startIcon={<Icon />} variant="contained">
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleError}
              cookiePolicy="single_host_origin"
              />
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Button onClick={switchMode}>
                    { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                  </Button>
                </Grid>
             </Grid>

           </form>
        </Paper>


    </Container>
  )
}

export default Auth
