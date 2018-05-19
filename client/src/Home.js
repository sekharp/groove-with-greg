import React, { Component } from "react";
import {
  Container,
  Header,
  Segment,
  Button,
  Icon,
  Dimmer,
  Loader,
  Divider
} from "semantic-ui-react";

class Home extends Component {
  constructor() {
    super();
    this.state = {};
    this.getRecords = this.getRecords.bind(this);
    this.getRecord = this.getRecord.bind(this);
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

  render() {
    let { records, record } = this.state;
    return records ? (
      <Container text>
        <Header as="h2" icon textAlign="center" color="teal">
          <Icon name="unordered list" circular />
          <Header.Content>Records</Header.Content>
        </Header>
        <Divider hidden section />
        {records && records.length ? (
          Object.keys(records).map(key => {
            return (
              <div>
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
            {record.artist && <p>Album: {record.artist}</p>}
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
