import React, { Component } from "react";
import axios from 'axios';
import UserService from "../services/user.service";
import PostListingByUser from "./home/PostListingByUser";
import AuthService from '../services/auth.service';
import { ListGroup } from 'bootstrap-4-react';
import FollowUser from "./home/form/FollowUser"
import UnFollowUser from "./home/form/UnfollowUser"

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      followed:[],
      user_id:"",
      follow_id:"",
      username:""
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    currentUser && this.setState({user_id:currentUser.id})
    currentUser && this.setState({username:currentUser.username})
    this.checkFollow();
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

  checkFollow =()=>{
    axios.get(`https://csci4140-group1.herokuapp.com/api/follow/${this.props.match.params.id}`)
    .then((response) => {
        console.log(response.data);
        this.setState({
            followed : response.data
        })
    });
  }

  render() {
    var follow = this.state.followed[0];
    console.log(follow);
    const { match: { params } } = this.props;
    return (
      <div>
        <header >
          <h3>{this.state.content}</h3>
          {this.state.followed.map((data, i)=>{
            return <UnFollowUser id={data._id}/>
          })}
          {this.state.followed.length ===0 && <FollowUser from={this.state.username} to={this.props.match.params.id} />}
          <PostListingByUser username={params.id} />
        </header>
      </div>
    );
  }
}
