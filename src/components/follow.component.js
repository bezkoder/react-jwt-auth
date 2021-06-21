import React, { Component } from 'react';
import { ListGroup} from 'bootstrap-4-react';
import axios from 'axios';
import {Link} from 'react-router-dom';



class Follows extends Component {
  constructor(){
    super();
    this.state = {
      post:[]
    }
  }
  componentDidMount(){
    axios.get('http://localhost:8080/api/users')
        .then((response) => {
            //console.log(response.data);
            this.setState({
                post : response.data
            })
    });
  }
  render() {
    return (
        <ListGroup>
            {this.state.post.map((user) =>{
                return (
                    <ListGroup.Item id={user._id} key={user._id} ><Link to={`/user/${user.username}`}>@{user.username}</Link></ListGroup.Item>
                    )
            })}
      </ListGroup>
    );
  }
}

export default Follows;