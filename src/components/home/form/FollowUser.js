import React, { Component } from 'react';
import { Container, Row, Col, BDiv } from 'bootstrap-4-react';
import axios from 'axios';

class FollowUser extends Component {

  handleSubmit = e => {
    e.preventDefault();

    axios
      .post('https://csci4140-group1.herokuapp.com/api/follow/add', {
        "from":this.props.from,
        "to":this.props.to
      })
      .then(() => console.log('New friend!'))
      .then(() => window.location.reload(false))
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    return (
            <form method="POST" onSubmit={this.handleSubmit}>
              {this.props.from === this.props.to && <p>Come on, you cannot follow yourself.</p>}
              {this.props.from !== this.props.to && <button className="btn btn-outline-secondary" type="submit">Follow <i class="fas fa-feather-alt"></i></button>}
            </form>
    );
  }
}

export default FollowUser;