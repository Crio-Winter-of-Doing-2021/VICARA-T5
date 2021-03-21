import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { handleKeyPress } from '../../assets/ts/utilities';
import { AuthMode } from './LoginPage';

const initialState = {
  email: '',
  password: '',
  confirmPassword: '',
  username: '',
};

const Register = ({
  setAuthMode,
}: {
  setAuthMode: React.Dispatch<React.SetStateAction<AuthMode>>;
}) => {
  const [state, setState] = useState(initialState);
  const [errorMsg, setErrorMsg] = useState(initialState);
  const [err, setErr] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setErr('');
    setSubmitSuccess(false);
    // isPasswordValid
    // isEmailValid
    // doPasswordsMatch

    if (
      !state.email ||
      !state.password ||
      !state.username ||
      !state.confirmPassword
    ) {
      setErrorMsg({
        email: !state.email ? 'Enter a valid email' : '',
        password: 'Enter your password',
        username: 'Enter username',
        confirmPassword: 'Confirm your password',
      });
      setSubmitting(false);
      return;
    }
    setErrorMsg(initialState);
    fetch('', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(state),
    })
      .then(() => {
        setSubmitSuccess(true);
      })
      .catch((err) => setErr(err))
      .finally(() => setSubmitting(false));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) =>
    handleKeyPress(e, handleSubmit);

  return (
    <>
      <TextField
        id='register-username'
        name='username'
        error={!!errorMsg.username}
        helperText={errorMsg.username}
        label='Username'
        value={state.username}
        onChange={handleChange}
        onKeyDown={onKeyDown}
      />
      <TextField
        id='register-email'
        name='email'
        error={!!errorMsg.email}
        helperText={errorMsg.email}
        label='Email'
        type='email'
        value={state.email}
        onChange={handleChange}
        onKeyDown={onKeyDown}
      />
      <TextField
        id='register-password'
        name='password'
        error={!!errorMsg.password}
        helperText={errorMsg.password}
        label='Password'
        type='password'
        value={state.password}
        onChange={handleChange}
        onKeyDown={onKeyDown}
      />
      <TextField
        id='register-confirm-password'
        name='confirmPassword'
        error={!!errorMsg.confirmPassword}
        helperText={errorMsg.confirmPassword}
        label='Confirm Password'
        type='password'
        value={state.confirmPassword}
        onChange={handleChange}
        onKeyDown={onKeyDown}
      />
      <Button
        color='primary'
        variant='contained'
        disabled={submitting}
        onClick={handleSubmit}
        style={{ marginTop: 20, textTransform: 'none' }}
      >
        {submitting ? 'Please wait...' : 'Register'}
      </Button>
      {submitSuccess && <span className='green'>Successfully registered!</span>}
      {!!err && <span className='red'>{err}</span>}
      <span
        className='blue pointer'
        onClick={() => setAuthMode(AuthMode.Login)}
      >
        Already have an account? Login
      </span>
    </>
  );
};

export default Register;
