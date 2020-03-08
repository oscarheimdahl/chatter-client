import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import Feed from '../Feed/Feed';
import InputBar from '../InputBar/InputBar';
import TopBar from '../TopBar/TopBar';
import '../../style/app.css';

const socket = socketIOClient('https://chat-x-server.herokuapp.com/');
const id = Date.now();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ownMessage: null,
      users: 1
    };
    socket.on('users-changed', users => {
      this.setState({ users });
    });
  }

  ownMessageToFeed = ownMessage => {
    this.setState({ ownMessage });
  };

  handleUsername = event => {
    this.setState({ username: event.target.value });
  };
  render() {
    return (
      <div className="app">
        <TopBar
          users={this.state.users}
          handleUsername={this.handleUsername}
        ></TopBar>
        <Feed socket={socket} ownMessage={this.state.ownMessage}></Feed>
        <InputBar
          id={id}
          username={this.state.username}
          socket={socket}
          ownMessageToFeed={this.ownMessageToFeed}
        ></InputBar>
      </div>
    );
  }
}

export default App;
