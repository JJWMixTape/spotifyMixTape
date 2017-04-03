import React, { Component } from 'react';
import $ from 'jQuery';
import Container from './Container.jsx';
//import styles from "./../app.css";
class App extends Component {
  constructor() {  
    super();
    this.state = {
      //test values with energy and then tempo
      playlist: [[.6, 120], [.3, 89], [.9, 200], [.6, 180]],

      // need to grab the playlist from JSON
      //need to grab the songs from JSON

    }
    // this.playlist = this.playlist.bind(this),
    // this.songs = this.songs.bind(this)

  }
  // componentWillMount(){
  //   $.get('https://api.spotify.com/v1/tracks/3n3Ppam7vgaVa1iaRUc9Lp', function (data) {
  //     console.log(data)
  //     this.setState({playlist:data});
  //   }.bind(this));
  // }

  // playlist
  //songs
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Hello World</h1>
        <Container playlist = {this.state.playlist} />
        {/*<Canvas playlist = {/>
        <Tiles />*/}
      </div>);
  }
}

export default App;