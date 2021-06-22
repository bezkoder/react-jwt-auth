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
    this.setState({user_id:currentUser.id})
    axios.get('https://csci4140-group1.herokuapp.com/api/users')
        .then((response) => {
            console.log(response.data);
            this.setState({
                users : response.data
            })
    });
  }
  render() {
    const otherUser = []
    this.state.users.map((user)=>{
      if(!user._id===this.state.user_id){
        return (console.log("Adding these "+user))
      }
    })
    return (
        <ListGroup>
            <p>Top users</p>
            <img src={logo}/>
            {this.state.users.map((user) =>{

                return (
                    <ListGroup.Item id={user._id} key={user._id} ><Link to={`/user/${user.username}`}>@{user.username}</Link></ListGroup.Item>
                    )
            })}
      </ListGroup>
    );
  }
}

export default Follows;