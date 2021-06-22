import {
    
    Card,
 
    BA,
    BDiv,
    BStrong,
    BH3,
    BImg
  } from 'bootstrap-4-react';
import {Link} from 'react-router-dom'
import React from "react";
import axios from "axios";
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
        height: '100vh',
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


export default class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post:[]
        }
    }
    componentDidMount(){
        const { match: { params } } = this.props;
        axios.get(`https://csci4140-group1.herokuapp.com/api/post/${params.id}`)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    post : response.data
                })
        });
      }
    render() {
        return (
            <div>
                {this.state.post.map((post)=>{
                        return <div>
              
                        <Card flex="md-row" mb="4" shadow="sm" style={style.featured.card}>
                  
                        <Card.Body display="flex" flex="column" alignItems="start">
                        <BStrong display="inline-block" mb="2" text="primary"> <Link style={{fontSize:'20px'}} to={'/'}><i class="fas fa-long-arrow-alt-left"></i> Return home</Link>  </BStrong>
                        <BStrong display="inline-block" mb="2" text="primary">{post.username}</BStrong>
                        <BH3 mb="0" style={style.h}>
                            <BA text="dark" href="#">{post.title}</BA>
                        </BH3>
                        <BDiv text="muted" mb="1">{post.published}</BDiv>
                        <Card.Text mb="auto">
                            <div>
                            {post.content}
                            </div>
                        </Card.Text>
                        </Card.Body>
                        <BImg src={this.props.photo} flex="auto" display="none lg-block" style={style.featured.card.image} />
                        </Card>
                  </div>
                })}
            </div>
        );
    }
}
