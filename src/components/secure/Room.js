'use strict';

import React from 'react';

var Firebase = require('firebase');
var forge = "https://dibbl.firebaseio.com/"; //YOUR FIREBASE URL HERE
var ref = new Firebase(forge);
require('styles/secure/Room.scss');

class RoomComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {ticker: 0, callId: ''};
    setInterval(this.counter.bind(this), 1000);
  }

  counter() {
    this.setState({ticker: this.state.ticker + 1});
  }

  componentDidMount() {
    this.createCallId();
  }

  createCallId() {
    var newCallId = ref.child('calls').push({
      startedAt: Firebase.ServerValue.TIMESTAMP,
    });
    this.setState({callId: newCallId.key()});
    this.joinCall();
  }

  joinCall(){
    var webrtc = new SimpleWebRTC({
      localVideoEl: 'localVideo',
      remoteVideosEl: 'remoteVideos',
      autoRequestMedia: true
    });

    webrtc.on('readyToCall', function () {
      webrtc.joinRoom(this.state.callId);
      console.log('joined #', this.state.callId);
    }.bind(this));
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
