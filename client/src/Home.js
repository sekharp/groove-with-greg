import React, { Component } from "react";
import {
  Container,
  Header,
  Icon,
  Dimmer,
  Loader,
  Divider,
  Form,
  Select
} from "semantic-ui-react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      artist: "",
      year: null,
      condition: null,
      records: []
    };
    this.getRecords = this.getRecords.bind(this);
    this.createRecord = this.createRecord.bind(this);
    this.handleDeletedRows = this.handleDeletedRows.bind(this);
  }

  componentDidMount() {
    this.getRecords();
  }

  getRecords() {
    window
      .fetch("/api/records")
      .then(response => response.json())
      .then(records => {
        if (records.length) {
          this.setState({ records: records });
        } else {
          this.setState({ records: [] });
        }
      });
  }

  createRecord = () => {
    const { title, artist, year, condition } = this.state;
    const formParams = {
      title: title,
      artist: artist,
      year: year,
      condition: condition
    };
    const request = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formParams)
    };

    window.fetch(`/api/records/`, request).then(() => this.getRecords());
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleDeletedRows(rowKeys) {
    if (rowKeys.length > 0) {
      rowKeys.map(id => {
        const request = {
          method: "DELETE"
        };

        window
          .fetch(`/api/records/${id}`, request)
          .then(() => this.getRecords());
      });
    }
  }

  onAfterSaveCell = formValues => {
    const request = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formValues)
    };

    return window
      .fetch(`/api/records/${formValues.id}`, request)
      .then(() => this.getRecords());
  };

  render() {
    let { records, title, artist, year, condition } = this.state;
    const dropdownOptions = [
      { key: "m", text: "Mint", value: "mint" },
      { key: "g", text: "Good", value: "good" },
      { key: "a", text: "Acceptable", value: "acceptable" },
      { key: "b", text: "Bad", value: "bad" }
    ];
    const selectRow = {
      mode: "checkbox"
    };
    const options = {
      afterDeleteRow: this.handleDeletedRows
    };
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
            <Form.Input
              name="title"
              placeholder="Actually Seitan Park Listicle"
              value={title}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Artist</label>
            <Form.Input
              name="artist"
              placeholder="Gentrify"
              value={artist}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Year</label>
            <Form.Input
              name="year"
              placeholder="1977"
              value={year}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field
            control={Select}
            name="condition"
            label="Condition"
            options={dropdownOptions}
            placeholder="Mint"
            value={condition}
            onChange={this.handleChange}
          />
          <Form.Button type="submit">Submit</Form.Button>
        </Form>
        <Divider hidden section />
        <h3>Record Collection</h3>
        {records && records.length ? (
          <BootstrapTable
            data={records}
            striped={true}
            hover={true}
            deleteRow
            selectRow={selectRow}
            options={options}
            cellEdit={{
              mode: "dbclick",
              blurToSave: true,
              afterSaveCell: this.onAfterSaveCell
            }}
            search
          >
            <TableHeaderColumn
              dataField="id"
              isKey={true}
              dataAlign="center"
              dataSort
              width="80"
            >
              ID
            </TableHeaderColumn>
            <TableHeaderColumn dataField="title" dataSort width="300">
              Title
            </TableHeaderColumn>
            <TableHeaderColumn dataField="artist" dataSort width="100">
              Artist
            </TableHeaderColumn>
            <TableHeaderColumn dataField="year" dataSort width="80">
              Year
            </TableHeaderColumn>
            <TableHeaderColumn dataField="condition" dataSort width="100">
              Condition
            </TableHeaderColumn>
          </BootstrapTable>
        ) : (
          <Container text>
            <Dimmer active inverted>
              <Loader content="Loading" />
            </Dimmer>
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
