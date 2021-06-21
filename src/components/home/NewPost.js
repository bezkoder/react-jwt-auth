import React, { Component } from 'react';
import AuthService from "../../services/auth.service";
import AddForm from './form/AddPost';
export default class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: "",
            currentUser: undefined,
            username: ""
        }
    }
    componentDidMount() {
        const user = AuthService.getCurrentUser();
    
        if (user) {
          this.setState({
            currentUser: user,
            username: user.username,
            showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
            showAdminBoard: user.roles.includes("ROLE_ADMIN"),
          });
        }
      }
  render() {
    return (
      <div>
          <AddForm id={this.state.username} />
      </div>
    )
  }
}