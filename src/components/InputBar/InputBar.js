import React, { Component } from 'react';
import '../../style/inputbar.css';
export class InputBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: props.socket,
      message: '',
      canSend: false
    };
  }

  updateText = event => {
    let text = event.target.value;
    let canSend = text.trim().length > 0;
    this.setState({ message: event.target.value, canSend });
  };

  sendMessage = event => {
    event.preventDefault();
    if (!this.state.canSend) return;
    let msg = {
      content: this.state.message,
      username: this.props.username || 'Anonymous',
      id: this.props.id,
      time: Date.now()
    };
    this.state.socket.send(msg);
    msg.own = true;
    this.props.ownMessageToFeed(msg);
    this.setState({ message: '', canSend: false });
  };

  render() {
    return (
      <div className="inputbar">
        <form>
          <input
            type="text"
            value={this.state.message}
            onChange={e => this.updateText(e)}
          />
          <button
            className={
              this.state.canSend ? 'button-enabled' : 'button-disabled'
            }
            onClick={event => this.sendMessage(event)}
          >
            Send
          </button>
        </form>
      </div>
    );
  }
}

export default InputBar;
