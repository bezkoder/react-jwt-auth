import React, { Component } from 'react';
import { ListGroup} from 'bootstrap-4-react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import logo from '../followers.svg';
import FollowUser from './home/form/FollowUser'
import AuthService from '../services/auth.service';
import UnfollowUser from './home/form/UnfollowUser';



class Follows extends Component {
  constructor(){
    super();
    this.state = {
      users:[],
      followed:[],
      user_id:''
    }
  }
  componentDidMount(){
    const currentUser = AuthService.getCurrentUser();
    currentUser && this.setState({user_id:currentUser.id})
    axios.get('https://csci4140-group1.herokuapp.com/api/users')
        .then((response) => {
            this.setState({
                users : response.data
            })
    });
    axios.get(`https://csci4140-group1.herokuapp.com/api/follow/${currentUser.id}`)
    .then((response) => {
        this.setState({
            followed : response.data
        })
    });


  }
  render() {
    const otherUsers = [];
    const following = [];
    const final = [];
    for (var i = 0; i < this.state.users.length; i++) {
        var counter = this.state.users[i];
        if(counter._id!=this.state.user_id){
          otherUsers.push(counter);
        }
    }
    for(var i = 0; i < this.state.users.length; i++){
      var user = this.state.users[i];
      for(var j = 0; j < this.state.followed.length; j++){
        var follow = this.state.followed[j];
        if( user._id === follow.to){
          final.push(user);
        }
      }
    }
    // for (var i = 0; i < this.state.users.length; i++) {
    //   var counter = this.state.users[i];
    //   //console.log(counter)
    //   if(counter.from===this.state.user_id || counter.to===this.state.user_id){
    //     following.push(counter);
    //     console.log(counter);
    //   }
    // }
    return (
        <ListGroup>
            <p>Top users</p>
            <img src={logo}/>
            {otherUsers.map((user) =>{
                return (
                    <ListGroup.Item id={user._id} key={user._id} ><Link to={`/user/${user.username}`}>@{user.username}</Link></ListGroup.Item>
                    )
            })}
          
      </ListGroup>
    );
  }
}


export default Follows;
