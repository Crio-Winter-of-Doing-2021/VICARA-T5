import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { handleKeyPress } from '../../assets/ts/utilities';
import { AuthMode } from './LoginPage';
import { ApiRoot } from '../../assets/ts/api';

const initialState = {
  username: '',
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
    setState({ ...state, [name]: value });
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setErr('');
    setSubmitSuccess(false);

    if (!(!!state.username && !!state.password)) {
      setErrorMsg({
        username: !state.username ? 'Enter a valid username' : '',
        password: 'Enter your password',
      });
      setSubmitting(false);
      return;
    }
    setErrorMsg(initialState);

    let formData = new FormData();

    // for (const name in state) {
    //   formData.append(name, state[name]);
    // }

    formData.append('username', state.username);
    formData.append('password', state.password);

    fetch(ApiRoot + '/login', {
      method: 'POST',
      body: formData,
      // credentials: 'include',
    })
      .then((res) => {
        console.log('Login res: ', res);
        if (res.status === 200) setSubmitSuccess(true);
        return res.json();
      })
      .then((resJson) => console.log('resJson: ', resJson))
      .catch((err) => setErr(err.message))
      .finally(() => setSubmitting(false));
  };

  return (
    <>
      <TextField
        id='login-username'
        name='username'
        error={!!errorMsg.username}
        helperText={errorMsg.username}
        label='Username'
        // type='username'
        value={state.username}
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
        style={{ marginTop: 20 }}
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
