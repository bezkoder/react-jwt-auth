import React, { Component } from 'react';
import { Container, Row, Col, BDiv } from 'bootstrap-4-react';
import axios from 'axios';

class FollowUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
        from: "",
        to: "",
    };
  }
  componentDidMount() {
    this.setState({
        from:this.props.from,
        to:this.props.to
    })
  }

  handleSubmit = e => {
    e.preventDefault();

    const {from,to} = this.state;

    const follow = {
      from,
      to,
    };

    axios
      .post('https://csci4140-group1.herokuapp.com/api/follow/add', follow)
      .then(() => console.log('New friend!'))
      .then(() => window.location.reload(false))
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    return (
            <form method="POST" onSubmit={this.handleSubmit}>
                    <button className="btn btn-outline-secondary" type="submit">Follow <i class="fas fa-feather-alt"></i></button>
            </form>
    );
  }
}

export default FollowUser;