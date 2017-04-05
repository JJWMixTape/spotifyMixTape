import React, { PropTypes } from 'react';

const Login = (props) => {
  const {loginHandler} = props;
  // <img src="http://i.imgur.com/e0bCjai.png" id="Login_with_spotify" onClick={loginHandler}/>
  return (
    <div id="Login_container">
      <img src="http://i.imgur.com/zlLcuiJ.png" id='Login_logo'/>
      <span><i>Every Playlist Tells A Story</i></span>
      <form action='/auth'>
        <input type="image" src="http://i.imgur.com/e0bCjai.png" id="Login_with_spotify" />
      </form>
    </div>
  )
}

Login.propTypes = {
  loginHandler: PropTypes.func.isRequired,
};

export default Login;