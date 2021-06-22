import React, { Component } from "react";
import axios from 'axios';
import UserService from "../services/user.service";
import PostListingByUser from "./home/PostListingByUser";
import AuthService from '../services/auth.service';
import { ListGroup } from 'bootstrap-4-react';

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      followed:[]
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    this.setState({user_id:currentUser.id})
    axios.get(`https://csci4140-group1.herokuapp.com/api/follow/${currentUser.id}`)
    .then((response) => {
        console.log(response.data);
        this.setState({
            followed : response.data
        })
    });
    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    const { match: { params } } = this.props;
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
          {/* <p>Followers</p>
          <ListGroup mb="3">
            <ListGroup.Link href="#">{}</ListGroup.Link>
        </ListGroup>
          {this.state.followed.map((user) =>{
            return 
          })} */}
          <PostListingByUser username={params.id} />
        </header>
      </div>
    );
  }
}
