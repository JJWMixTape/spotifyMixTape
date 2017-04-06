import React, { Component } from 'react';
import Visualizer from './Visualizer.js';
import TrackList from './TrackList.js';
import Login from './Login.js';
import About from './About.js';
import Sidebar from './Sidebar';


class App extends Component {
  constructor(props) {
    super(props);

    this.StoryPreset_images = ["http://i.imgur.com/FZf4EHe.png", "http://i.imgur.com/D54NtdL.png", "http://i.imgur.com/mJhMPXw.png", "http://i.imgur.com/QXOfKGc.png", "http://i.imgur.com/1r27WoE.png", "http://i.imgur.com/xka4ynT.png"];

    //AJAX CALL TO CHECK FOR AUTHENTICATION COOKIE HERE!!

    this.clickCassetteFuncArray = this.clickCassetteStoryGenerator();
    console.log(this.clickCassetteFuncArray);

    this.clickButtonFuncArray = this.clickButtonGenerator();

    this.state = {
      page_state: 'login',
      //page_states: 'dashboard', 'login', 'about'
      username: 'Johnny',
      playlists: [],
      selectedPlaylist: [],
      selectedPlaylistName: '',
      reorderedPlaylist: [],
      valenceVals: [],
      storiesHidden: false,
      metric: "Valence",
      type: 0,
    }
    this.aboutHandler = this.aboutHandler.bind(this);
  }

  componentDidMount() {
    const xhttp = new XMLHttpRequest();
    const that = this;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          // console.log(this.status);
          const playlists = JSON.parse(xhttp.responseText);
          that.setState({ 
              playlists,
              page_state: 'dashboard',
              selectedPlaylist: playlists[0],
              selectedPlaylistName: playlists[0].name,
            });
        }
    }
    xhttp.open("GET", "/playlists", true);
    xhttp.send();
  }

  //------Login Methods---------//

  loginHandler(){
    this.setState({page_state: 'dashboard'});
  }

  //------About Methods---------//

  aboutHandler(){
    this.setState({page_state: 'about'});
  }

  //------Visualizer Methods----//

  enableStoryVisualizers(){
    // console.log('Toggling story visualizers...');
    this.setState({storiesHidden: !this.state.storiesHidden});
  }

  clickCassetteStoryGenerator(){
    let buildClickFuncs = (i) => {
      let clickFunc = () => {
        console.log("Clicked:",i);
        this.setState({type: i});
      }
      return clickFunc;
    }

    let clickCassetteFuncArray = [];
    for(let i = 1; i < 7; i += 1){
      clickCassetteFuncArray.push(buildClickFuncs(i).bind(this));
    }
    return clickCassetteFuncArray;
  }

  clickButtonGenerator(){
    let buildClickFuncs = (metric) => {
      this.setState({metric});
    }
    let metrics = ["Valence", "Danceability", "Energy"];
    let funcArray = [];

    for(let i = 0; i < metrics.length; i += 1){
      funcArray.push(buildClickFuncs(i));
    }
    return funcArray;
  }

  metricButtonFuncGenerator(){
    let buildClickFuncs = (array, i)  => {
      let clickFunc = () => {
        console.log("Clicked:",i);
        this.setState({metric: array[i]});
      }
      return clickFunc;
    }

    let clickCassetteFuncArray = [];
    for(let i = 1; i < 7; i += 1){
      clickCassetteFuncArray.push(buildClickFuncs(i).bind(this));
    }
    return clickCassetteFuncArray;
  }

  // -----TrackList Methods-----//
  selectorOnChange(name, playlist){
    console.log("Selector:", name);
    this.setState({
      selectedPlaylistName: name,
      selectedPlaylist: playlist,
    });
  }
  updateNewPlaylist(name, playlist){
    if (playlist.tracks[0].name !== this.state.selectedPlaylist.tracks[0].name) {
      console.log("Update Playlist:", name);
      this.setState({
        selectedPlaylistName: name,
        selectedPlaylist: playlist,
      });
    }
  }

  // ----------------------------//
  export(){
    const xhttp = new XMLHttpRequest();
    const that = this;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log('playlist saved!');
        }
    }
    xhttp.open("POST", "/export", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify({ 
      playlist: that.state.selectedPlaylist, 
      metric: that.state.metric,
      type: that.state.type,
    }));
  }

  render(){
    // console.log(this.state.page_state);
    if(this.state.page_state === "login") { 
      return(
        <Login loginHandler={this.loginHandler.bind(this)}/>
      )
    }
    if(this.state.page_state === "about") { 
      return(
        <About loginHandler={this.loginHandler.bind(this)}/>
      )
    }
    //else page_state = "dashboard"
    return(
    <div id="app_container">
      <div id="header_toolbar">
        <span style={{"color":"#1db954"}} ><b>Dashboard</b></span>
        <span onClick={this.aboutHandler}>About</span>
        <span>Logout</span>
      </div>
      
      <Sidebar selectedPlaylist = {this.state.selectedPlaylist} />
      
      <Visualizer storiesHidden={this.state.storiesHidden} storySelectorMethods={['hello']} enableStoryVisualizers={this.enableStoryVisualizers.bind(this)} StoryPreset_images={this.StoryPreset_images} playlist = {this.state.selectedPlaylist} metric = {this.state.metric} type = {this.state.type} updateNewPlaylist={this.updateNewPlaylist.bind(this)} clickCassetteFuncArray = {this.clickCassetteFuncArray}/>
      
      <TrackList playlists={this.state.playlists} selectorOnChange={this.selectorOnChange.bind(this)} selectedPlaylistName={this.state.selectedPlaylistName} selectedPlaylist={this.state.selectedPlaylist} export={this.export.bind(this)}/>

    </div>
    );
  }
}
    








export default App;