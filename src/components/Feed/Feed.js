import React, { Component } from 'react';
import Message from '../Message/Message';
import '../../style/feed.css';

export class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feed: []
    };
    this.allowScrollDown = true;
    this.feed = React.createRef();
    props.socket.on('message', message => {
      this.setState({ feed: [...this.state.feed, message] });
      this.scrollToBottom();
    });
  }

  componentDidUpdate(oldProps) {
    if (oldProps.ownMessage !== this.props.ownMessage) {
      this.setState({ feed: [...this.state.feed, this.props.ownMessage] });
      this.scrollToBottom();
    }
  }

  scrollToBottom = () => {
    if (this.allowScrollDown)
      setTimeout(() => {
        this.feed.current.scrollTop = this.feed.current.scrollHeight;
      }, 100);
  };

  buildMessages = () => {
    let lastSenderID = null;
    return this.state.feed.map((message, i) => {
      if (lastSenderID === message.id) message.hideName = true;
      lastSenderID = message.id;
      return <Message key={i} message={message}></Message>;
    });
  };

  render() {
    return (
      <div className="feed" ref={this.feed}>
        <p
          style={{ display: this.state.feed.length === 0 ? '' : 'none' }}
          className="no-messages"
        >
          No messages yet...
        </p>
        {this.buildMessages()}
      </div>
    );
  }
}

export default Feed;
