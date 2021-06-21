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
    // this.handleChange = this.handleChange.bind(this);
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
      .post('http://localhost:8080/api/post/add', post)
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
                    <BDiv w="100">
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        style={{border:"none", margin:'10px'}}
                        placeholder="..."
                        onChange={this.handleInputChange}
                    />
                    </BDiv>
                    <BDiv w="100"></BDiv>
                    <BDiv w="100"><textarea 
                        rows="16" 
                        style={{border:"none", width:'100%', margin:'10px'}}
                        name="content" 
                        form="usrform"
                        onChange={this.handleInputChange}
                    >Enter text here...</textarea></BDiv>
                    <Col><button class="btn btn-outline-secondary" type="submit">Post it<i class="fas fa-feather-alt"></i></button></Col>
                </Row>
              </form>
        </Container>
    );
  }
}

export default AddForm;