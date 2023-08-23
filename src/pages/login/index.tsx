
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { checkEmail , checkPassword } from '../../utils/validators'
import { useUser } from '../../context/user-context';

import * as authApis from '../../core/apis/authentication';

import './style.scss';

const Login: React.FC = () => {

  const navigate = useNavigate()
  const { updateUser , updateIsAuth } = useUser();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [emailErrorMsg, setEmailErrorMsg] = useState<boolean>(true);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState<any>("");

  const [loading , setLoading] = useState(false)

  // handle validation for password
  const handleValidators = (pw : any) => {
    const array =  checkPassword(pw)
    if(array.length === 0){
      setPasswordErrorMsg('')
    }
    else{
      const msg = <span className='password-validators-list'>Password have to includes :
                    {array.map(element=> (<div key={element}>{element}</div>))}
                  </span>
      setPasswordErrorMsg(msg)
    }
  }

  // handle login click
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault()
    if(!checkEmail(username) && checkPassword(password).length !== 0){
      setEmailErrorMsg(checkEmail(username))
      handleValidators(password)
      return
    }
    setLoading(true)
    authApis.signIn(username, password).then((result:any) => {
        if(result.success){
            setLoading(false)
            updateIsAuth(true)
            updateUser(result.data)
            navigate('/')
        }
    }).catch((err)=>{
        setLoading(false)
    })
  };


  return (
    <div className="login-container">
        <div className='login-card'>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className='form-input-container'>
              <div className='form-input'>
                <label>Username</label>
                <input
                  className={!emailErrorMsg ? 'error-input' : ""}
                  type="text"
                  value={username}
                  placeholder="Enter your email"
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={(e) => setEmailErrorMsg(checkEmail(e.target.value))}
                />
                {!emailErrorMsg && (<span className='input-error-msg'>Invalid email, please check it again.</span>)}
              </div>
              <div className='form-input'>
                <label>Password</label>
                <input
                  className={passwordErrorMsg !== '' ? 'error-input' : ""}
                  type="password"
                  value={password}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={(e) => handleValidators(e.target.value)}
                />
                {passwordErrorMsg !== '' && (passwordErrorMsg)}
              </div>
            </div>
            <button className='dashing-btn large-btn primary-btn w-100' type="submit" onClick={handleLogin} disabled={loading}>
              Login
              {loading && (<div className="spinner"></div>)}
            </button>
          </form>
        </div>
    </div>
  );
}

export default Login;
