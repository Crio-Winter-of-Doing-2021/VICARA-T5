import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Login from './Login';
import Register from './Register';

export enum AuthMode {
  Login,
  Register,
}

const LoginPage = () => {
  const [authMode, setAuthMode] = useState(AuthMode.Login);
  return (
    <div className='flex' style={{ height: '100vh' }}>
      <Card style={{ width: 'fit-content', margin: 'auto' }}>
        <form>
          <div className='flex flex-column ma4'>
            {authMode === AuthMode.Login ? (
              <Login setAuthMode={setAuthMode} />
            ) : (
              <Register setAuthMode={setAuthMode} />
            )}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
