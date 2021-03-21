import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { handleKeyPress } from '../../assets/ts/utilities';
import { AuthMode } from './LoginPage';

const initialState = {
  email: '',
  password: '',
};

const Login = ({
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
    console.log({ name, value });
    setState({ ...state, [name]: value });
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setErr('');
    setSubmitSuccess(false);

    if (!(!!state.email && !!state.password)) {
      setErrorMsg({
        email: !state.email ? 'Enter a valid email' : '',
        password: 'Enter your password',
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

  return (
    <>
      <TextField
        id='login-email'
        name='email'
        error={!!errorMsg.email}
        helperText={errorMsg.email}
        label='Email'
        // type='email'
        value={state.email}
        onChange={(e) => handleChange(e)}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) =>
          handleKeyPress(e, handleSubmit)
        }
      />
      <TextField
        id='login-password'
        name='password'
        error={!!errorMsg.password}
        helperText={errorMsg.password}
        label='Password'
        type='password'
        value={state.password}
        onChange={(e) => handleChange(e)}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) =>
          handleKeyPress(e, handleSubmit)
        }
      />
      <Button
        color='primary'
        variant='contained'
        disabled={submitting}
        onClick={handleSubmit}
        style={{ marginTop: 20, textTransform: 'none' }}
      >
        {submitting ? 'Logging in...' : 'Login'}
      </Button>
      {submitSuccess && (
        <span className='green tc'>Successfully logged in!</span>
      )}
      {!!err && <span className='tc red'>{err}</span>}

      <span
        className='blue pointer'
        onClick={() => setAuthMode(AuthMode.Register)}
      >
        New user? Create an account
      </span>
    </>
  );
};

export default Login;
