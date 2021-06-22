import React, { Component } from 'react';
import { Container, Row, Col, BDiv } from 'bootstrap-4-react';
import axios from 'axios';

class AddForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
        title: "",
        content: [],
    };
  }
  componentDidMount(){

  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const {title,content} = this.state;
    const authorId = this.props.id;

    const post = {
      title,
      content,
      authorId,
    };

    axios
      .post('https://csci4140-group1.herokuapp.com/api/post/add', post)
      .then(() => console.log('New Post!'))
      .then(() => window.location.reload(false))
      .catch(err => {
        console.error(err);
      });
  };

  render() {
      console.log(this.props.id)
    return (
        <Container>
            <form method="POST" onSubmit={this.handleSubmit}>
                <Row>
                    <BDiv style={{marginTop:'40px'}} w="100">
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        style={{border:"1px solid", margin:'1px'}}
                        placeholder="Title..."
                        onChange={this.handleInputChange}
                    />
                    </BDiv>
                    <BDiv w="100"></BDiv>
                    <BDiv w="100"><textarea 
                        rows="16" 
                        style={{border:"1px solid", width:'100%', margin:'1px', borderRadius:'5px'}}
                        name="content" 
                        form="usrform"
                        placeholder="Write a story..."
                        onChange={this.handleInputChange}
                    ></textarea></BDiv>
                    <Col style={{textAlign:'center', margin:'30px'}}><button class="btn btn-outline-secondary" type="submit">Post it<i class="fas fa-feather-alt"></i></button></Col>
                </Row>
              </form>
        </Container>
    );
  }
}

export default AddForm;