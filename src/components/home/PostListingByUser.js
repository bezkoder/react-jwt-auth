import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  BA,
  BDiv,
  BStrong,
  BH3,
  BImg
} from 'bootstrap-4-react';
import {Link} from 'react-router-dom';
import no_post from "../../no_post.svg";
import axios from 'axios';
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
    },
    card2: {
        padding:'15px',
        alignItems: 'center',
        borderRadius:'10px',
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

const Featured = props => (
  <Row mb="2">
      {props.features.map((feature)=>{
         return <Col key={feature._id}  id={feature._id} md="6">
         <Card flex="md-row" mb="4" shadow="sm" style={style.featured.card}>
           <Card.Body display="flex" flex="column" alignItems="start">
             <BStrong display="inline-block" mb="2" text="primary">{feature.username}</BStrong>
             <BH3 mb="0" style={style.h}>
               <BA text="dark" href="#">{feature.title}</BA>
             </BH3>
             <BDiv text="muted" mb="1">{feature.published}</BDiv>
             <Card.Text mb="auto">
               {feature.content.substring(0,20)}...
             </Card.Text>
             <a href={'/p/'+feature._id}>Continue reading</a>
           </Card.Body>
           <BImg src={feature.photo} flex="auto" display="none lg-block" style={style.featured.card.image} />
         </Card>
       </Col>
      })}
    </Row>
)


const Top = props => (
  <Container>
    <Card  shadow="sm" style={style.featured.card2}>
           <Card.Text display="flex" alignItems="center">
             <BStrong display="inline-block" mb="2" text="primary">Latest posts</BStrong>
           </Card.Text>
    </Card>
    <Featured features={props.data} />
  </Container>
)
const NoPost = props => (
  <Container>
    <Card  shadow="sm" style={style.featured.card2}>
           <Card.Text display="flex" alignItems="center">
             <BStrong display="inline-block" mb="2" text="primary"><Link to="/post">Write your first post</Link></BStrong>
           </Card.Text>
           <img width="50%" src={no_post}/>
    </Card>
  </Container>
)



class PostListingByUser extends Component {
  constructor(){
    super();
    this.state = {
      post:[]
    }
  }
  componentDidMount(){
    axios.get(`https://csci4140-group1.herokuapp.com/api/post/users/${this.props.username}`)
        .then((response) => {
            //console.log(response.data);
            this.setState({
                post : response.data
            })
    });
  }
  render() {
    return (
      <React.Fragment>
    
        {this.state.post.length > 0 &&  <Top data={this.state.post}/> }
        {this.state.post.length === 0 &&  <NoPost/>}
      </React.Fragment>
    );
  }
}

export default PostListingByUser;