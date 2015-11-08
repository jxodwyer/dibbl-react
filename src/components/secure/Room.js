'use strict';

import React from 'react';

require('styles/secure/Room.scss');

class RoomComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {ticker: 0}
    setInterval(this.counter.bind(this), 1000);
  }

  counter() {
    var newTicker = this.state.ticker + 1
    this.setState({ticker: newTicker})
  }
  componentDidMount() {
    var webrtc = new SimpleWebRTC({
      // the id/element dom element that will hold "our" video
      localVideoEl: 'localVideo',
      // the id/element dom element that will hold remote videos
      remoteVideosEl: 'remoteVideos',
      // immediately ask for camera access
      autoRequestMedia: true
    });

    webrtc.on('readyToCall', function () {
      // you can name it anything
      webrtc.joinRoom('your awesome room name');
    });
  }
  render() {
    return (
      <div className="room-component">
        <h1>{this.state.ticker}</h1>
        <video id="localVideo"></video>
        <div id="remoteVideos"></div>
      </div>
    );
  }
}

RoomComponent.displayName = 'SecureRoomComponent';

// Uncomment properties you need
// RoomComponent.propTypes = {};
// RoomComponent.defaultProps = {};

export default RoomComponent;
