import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import DeleteBtn from "../components/DeleteBtn";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import API from "../utils/API.js";

class Books extends Component {
  // Initialize this.state.books as an empty array
  state = {
    books: [],
    title: '',
    author: '',
    synopsis: ''
  };

  // Add code here to get all books from the database and save them to this.state.books
  componentWillMount(){
    this.loadBooks(this);
  };

  loadBooks = () => {
    console.log('books loaded');
    API.getBooks()
    .then(books => {
      this.setState({
        books: books.data,
        title: '',
        author: '',
        synopsis: ''
      });
    })
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.saveBook({
      title: this.state.title,
      author: this.state.author,
      synopsis: this.state.synopsis
    })
    .catch(err => {
      console.log(err)
    });
    this.loadBooks();
  };

  handleOnChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input onChange={this.handleOnChange} name="search" placeholder="Title (required)" />
              <FormBtn onClick={this.handleFormSubmit}>Submit Book</FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <a href={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </a>
                    <DeleteBtn />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;