import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from '../utils/withRouter';

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.router.navigate(`/products?search=${this.state.search}`);
    this.setState({
      ...this.state,
      search: '',
    });
  }

  render() {
    return (
      <Form
        className="d-flex"
        onSubmit={(event) => event.preventDefault()}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            this.handleSubmit(event);
          }
        }}
      >
        <Form.Control
          name="search"
          type="search"
          placeholder="Search"
          className="me-2 d-inline"
          aria-label="Search"
          value={this.state.search}
          onChange={this.handleChange}
        />
        <Button
          type="button"
          variant="outline-success"
          onClick={this.handleSubmit}
        >
          Search
        </Button>
      </Form>
    );
  }
}

export default withRouter(Search);
