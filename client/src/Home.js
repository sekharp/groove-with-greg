import React, { Component } from "react";
import {
  Container,
  Header,
  Button,
  Icon,
  Dimmer,
  Loader,
  Divider,
  Form,
  Select
} from "semantic-ui-react";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      submittedTitle: "",
      submittedArtist: "",
      submittedYear: 1980,
      submittedCondition: "mint"
    };
    this.getRecords = this.getRecords.bind(this);
    this.getRecord = this.getRecord.bind(this);
    this.createRecord = this.createRecord.bind(this);
  }

  componentDidMount() {
    this.getRecords();
  }

  fetch(endpoint) {
    return window
      .fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error));
  }

  getRecords() {
    this.fetch("/api/records").then(records => {
      if (records.length) {
        this.setState({ records: records });
        this.getRecord(records[0].id);
      } else {
        this.setState({ records: [] });
      }
    });
  }

  getRecord(id) {
    this.fetch(`/api/records/${id}`).then(record =>
      this.setState({ record: record })
    );
  }

  createRecord = () => {
    debugger;
    this.fetch(`/api/records/`, {
      method: "post",
      body: JSON.stringify({})
    }).then(record => this.setState({ record: record }));
  };

  render() {
    let { records, record } = this.state;
    const options = [
      { key: "m", text: "Mint", value: "mint" },
      { key: "g", text: "Good", value: "good" },
      { key: "a", text: "Acceptable", value: "acceptable" },
      { key: "b", text: "Bad", value: "bad" }
    ];
    return records ? (
      <Container text>
        <Header as="h2" icon textAlign="center" color="red">
          <Icon name="sound" circular />
          <Header.Content>Records</Header.Content>
        </Header>
        <Divider hidden section />
        <Form onSubmit={this.createRecord}>
          <h3>Add New Record to Collection</h3>
          <Form.Field>
            <label>Record Title</label>
            <input name="title" placeholder="Actually Seitan Park Listicle" />
          </Form.Field>
          <Form.Field>
            <label>Artist</label>
            <input name="artist" placeholder="Gentrify" />
          </Form.Field>
          <Form.Field>
            <label>Year</label>
            <input name="year" placeholder="1977" />
          </Form.Field>
          <Form.Field
            control={Select}
            name="condition"
            label="Condition"
            options={options}
            placeholder="Mint"
          />
          <Button type="submit">Submit</Button>
        </Form>
        <Divider hidden section />
        <h3>Record Collection</h3>
        {records && records.length ? (
          Object.keys(records).map(key => {
            return (
              <div key={key}>
                <Button
                  active={record && record.id === records[key].id}
                  fluid
                  key={key}
                  onClick={() => this.getRecord(records[key].id)}
                  color="red"
                >
                  {records[key].title}
                </Button>
                <br />
              </div>
            );
          })
        ) : (
          <Container textAlign="center">No records found.</Container>
        )}
        <Divider section />
        {record && (
          <Container>
            <Header as="h2">Record: {record.title}</Header>
            {record.artist && <p>Artist: {record.artist}</p>}
            {record.year && <p>Year: {record.year}</p>}
            {record.condition && <p>Condition: {record.condition}</p>}
          </Container>
        )}
      </Container>
    ) : (
      <Container text>
        <Dimmer active inverted>
          <Loader content="Loading" />
        </Dimmer>
      </Container>
    );
  }
}

export default Home;
