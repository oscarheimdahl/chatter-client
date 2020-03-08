import React, { Component } from 'react';
import '../../style/topbar.css';
export class TopBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usersChanged: false
    };
  }

  componentDidUpdate(oldProps) {
    if (this.props.users !== oldProps.users) {
      this.setState({ usersChanged: true });
      setTimeout(() => this.setState({ usersChanged: false }), 600);
    }
  }

  usersPresent = () => {
    let left = '0px';
    if (this.state.usersChanged) {
      left = '15px';
    }
    return <h2 style={{ left }}>Users present: {this.props.users}</h2>;
  };

  render() {
    return (
      <div className="top-bar">
        {this.usersPresent()}
        <input
          className="username-field"
          placeholder="Anonymous"
          maxLength={20}
          onChange={e => this.props.handleUsername(e)}
          type="text"
        />
      </div>
    );
  }
}

export default TopBar;
