import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import Feed from '../Feed/Feed';
import InputBar from '../InputBar/InputBar';
import TopBar from '../TopBar/TopBar';
import '../../style/app.css';
import Cookies from 'universal-cookie';

const socket = socketIOClient('https://chat-x-server.herokuapp.com/');
// const socket = socketIOClient('localhost:4444');

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
    this.setID();
  }

  setID = () => {
    const cookies = new Cookies();
    this.userID = cookies.get('chat-id');
    if (!this.userID) {
      this.userID = Date.now();
      cookies.set('chat-id', this.id, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
      });
    }
  };
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
        <Feed
          socket={socket}
          ownMessage={this.state.ownMessage}
          userID={this.userID}
        ></Feed>
        <InputBar
          userID={this.userID}
          username={this.state.username}
          socket={socket}
          ownMessageToFeed={this.ownMessageToFeed}
        ></InputBar>
      </div>
    );
  }
}

export default App;
