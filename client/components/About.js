import React, { PropTypes } from 'react';

const About = (props) => {
  const {loginHandler} = props;
  // <img src="http://i.imgur.com/e0bCjai.png" id="Login_with_spotify" onClick={loginHandler}/>
  return (
    <div id="About_container">
      <div id="header_toolbar">
        <span onClick={loginHandler}><b>Dashboard</b></span>
        <span style={{"color":"#1db954"}} >About</span>
        <span>Logout</span>
      </div>
      <h1>About</h1>
      <div id="metric_info">
        <p>{"The main idea behind Spotify MixTape is to reorganize your Spotify playlist to control the progression of each track according to a given metric. "}
        {"Each metric calculates different quantification of feels of a song, so you can control the mood flow of your playlist. "}
        {"The default metric is set to emotional valence, which quantifies a song's feel of sadness to happiness on a scale from 0 to 1. "}
        {"Other metrics include danceability and energy as well as others calculated by the Spotify team. "}</p>
        <p>{"We have set up 6 progression flows: The Amp Up, The Burn Down, The Big V, The Climax, Manic Mayhem, and Bipolar Blues. "}
        {"Selecting a progression chart will automatically rearrange your playlist in order by sorting the songs by their metric. "}
        {"The resulting arrangement will be that of the progression as modeled by the chart. "}</p>
        <p>{"The export button will save the rearranged playlist to your Spotify. "}</p>
      </div>
      <div id="team_info">
        <h3><a href="https://github.com/JJWMixTape">JJWMixTape</a></h3>
        <p>{'GitHubs: '}<a href="https://github.com/johnnycoyle">Johnny Coyle</a>{', '}
        <a href="https://github.com/jjeffreyma">Jeffrey Ma</a>{', '}
        <a href="https://github.com/willrig">Will Rigsbee</a></p>
      </div>
    </div>
  )
}

About.propTypes = {
  loginHandler: PropTypes.func.isRequired,
};

export default About;