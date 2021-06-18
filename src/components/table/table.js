import React, { Component } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./table.css";

// went with class component to display my easy to use table
export default class Table extends Component {
  constructor(props) {
    super(props);
    //loading is true by default, I could add {<div> loading...</div>} to display while data is loading but in this example i felt it wasnt needed
    this.state = {
      loading: true,
      list: [],
    };
  }
  async componentDidMount() {
    //There is a variety of ways to fetch data in React, including using the built-in Fetch API, Axios, async/await, and more. If I was using higher-order components and render props, I might have called it from a GraphQL backend
    //Got hiring.json and set it to data to use as the data for our table
    const url = "https://fetch-hiring.s3.amazonaws.com/hiring.json";
    //going to use fetch which is async so we'll use await and add async to compDidMount to make fetch syncnous. fetch is a built-in option thats going to allow us to make the HTTP request for the json. (HTTP=> Hypertext Transfer Protocol is an application-layer protocol for transmitting hypermedia documents, such as HTML.)
    const response = await fetch(url);
    //.json is async
    const data = await response.json();
    //chose a try catch to handle any errors (which is why im not use a loading... screen). this.setState is how we update data in list (state)
    try {
      this.setState({
        loading: false,
        list: [...data],
      });
    } catch (e) {
      console.log("Something went wrong, please contact support. Thank you!");
      console.log(e);
    }
  }
  render() {
    // As requested we will filters out 'null' names, sort the data by listId, as well as sort it by name.
    const items = this.state.list
      .filter((item) => item.name)
      .sort(function (a, b) {
        return a.listId - b.listId || +a.name.slice(4) - +b.name.slice(4);
      });
    const sorted = items.filter((item) => item.listId);

    //GridData, was chosen becuase I think it provides an easy to use table that has built-in sort and serach options. for more informaiton on it please see readme.
    const columns = [
      {
        field: "listId",
        headerName: "List Id",
        headerAlign: "center",
        width: 180,
        align: "center",
      },
      {
        field: "name",
        headerName: "Name",
        headerAlign: "center",
        width: 180,
        align: "center",
      },
      {
        field: "id",
        headerName: " Id",
        headerAlign: "center",
        width: 180,
        align: "center",
      },
    ];
    return (
      // Displays items in sorted table by listId and name, also gives a great search function and allows for ascending and descending sort ect
      <div className="dataGrid">
        <h2>Sorted data for fetch rewards front-end challenge</h2>
        <h4>
          You can click on table head of List Id to search and sort data, using
          this for "Name" and "Id" will override the preset sort.
        </h4>
        <DataGrid
          rows={sorted}
          columns={columns}
          pageSize={25}
          loading={this.state.loading}
        />
      </div>
    );
  }
}
