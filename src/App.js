import React, { Component } from "react";
import GraphicplotCSV from "./components/GraphicplotCSV";
import CSVReader from "react-csv-reader";
import GraphicplotRealTime from "./components/GraphicplotRealTime";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      inputValue: "",
      isData: false,
    };
  }
  handleInputSubmit = (data) => {
    this.setState({
      inputValue: data,
      isData: true,
    });
  };

  statusInput = () => {
    const { inputValue, isData } = this.state;
    if (isData) {
      return <GraphicplotCSV inputCSV={inputValue}></GraphicplotCSV>;
    }
    return (
      <p className="text-4xl pb-4 m-4">Insira o CSV para plotar o gráfico</p>
    );
  };

  render() {
    const papaparseOptions = {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
    };

    return (
      <div className="container mx-auto flex justify-center flex-col">
        {this.statusInput()}
        <CSVReader
          className=""
          onFileLoaded={(data) => {
            this.handleInputSubmit(data);
          }}
          parserOptions={papaparseOptions}
        />
        <GraphicplotRealTime></GraphicplotRealTime>
      </div>
    );
  }
}
