import React, { Component } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./table.css";

// went with class component to display my easy to use table and control state
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      list: [],
    };
  }
  async componentDidMount() {
    //Get hiring.json to use as data for our table, and set the state
    const url = "https://fetch-hiring.s3.amazonaws.com/hiring.json";
    const response = await fetch(url);
    const data = await response.json();
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

    //GridData, was chosen becuase I think it provides an easy to use table that has built in sort and serach options. for more informaiton on it please see readme.
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
        <h4>Sorted data for fetch rewards front-end challenge</h4>
        <h5>click on table head to search and sort data</h5>
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

export default Table;
