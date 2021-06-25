import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import  {
  Row,
  Col,
  BHeader,
  BA,
} from 'bootstrap-4-react';
import AuthService from "./services/auth.service";
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/globalStyles";
import { lightTheme, darkTheme } from "./components/Themes"
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import AddPost from "./components/home/NewPost";
import Edit from "./components/home/PostDetails";
const style = {
  h: {
    fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif'
  },
  header: {
    lineHeight: '1',
    logo: {
      fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif',
      fontSize: '2.25rem'
    }
  },
  navigator: {
    position: 'relative',
    zIndex: '2',
    height: '2.75rem',
    overflowY: 'hidden'
  },
  jumbovision: {
    header: {
      fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif',
      fontSize: '3rem'
    }
  },
  featured: {
    card: {
      height: '250px',
      image: {
        borderRadius: '0 3px 3px 0'
      }
    }
  },
  blog: {
    post: {
      marginBottom: '4rem',
      title: {
        fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif',
        fontSize: '2.5rem',
        marginBottom: '0.25rem'
      },
      meta: {
        marginBottom: '1.25rem',
        color: '#999'
      }
    },
    pagination: {
      marginBottom: '4rem',
      button: {
        borderRadius: '2rem'
      }
    }
  },
  footer: {
    padding: '2.5rem 0',
    color: '#999',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    borderTop: '.05rem solid #e5e5e5'
  }
}
const Header = props => (
  <BHeader className="sticky-top" py="3" style={style.header}>
    <Row flex="nowrap" justifyContent="between" alignItems="center">
      {/* <Col col="4" pt="1">
        <BA text="muted" href="#">Subscribe</BA>
      </Col> */}
      <Col justifyContent="center" alignItems="center" text="center">
        <BA text="dark" href="#" style={style.header.logo}>The Explorer Post</BA>
      </Col>
      {/* <Col col="4" display="flex" justifyContent="end" alignItems="center">
        <BA text="muted" href="#"><SearchIcon /></BA>
        <Button sm outline secondary>Sign up</Button>
      </Col> */}
    </Row>
  </BHeader>
)
const PlayfairDisplay = props => (
  <link href="https://fonts.googleapis.com/css?family=Playfair+Display:700,900" rel="stylesheet" />
)
const Footer = props => (
  <footer style={style.footer}>
    <p>The Explorer Post, 2021</p>
    <p>
      <a href="#home">Back to top</a>
    </p>
  </footer>
)

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  //   const [theme, setTheme] = useState('light');
    this.state = {
      theme: 'light',
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }
//   const themeToggler = () => {
//     theme === 'light' ? setTheme('dark') : setTheme('light')
// }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    
    return (
      <div>
      {/* <button onClick={themeToggler}>Switch Theme</button> */}
        {/* {currentUser && (<Header/>)} */}
        <PlayfairDisplay/>
        <nav className="navbar navbar-expand sticky-top navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/feeds"} className="nav-link">
                Feeds
              </Link>
            </li>
            {currentUser && (
            <li className="nav-item">
              <Link to={"/post"} className="nav-link">
                Add Post
              </Link>
            </li>
            )}

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {/* {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )} */}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/feeds"]} component={Home} />
            <Route exact path="/post" component={AddPost} />
            <Route exact path="/p/:id" component={Edit} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user/:id" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
          </Switch>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
