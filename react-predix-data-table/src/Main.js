import React from 'react';
import { DataTable, DataTableColumn } from '@svmx/ui-components-predix';

import { run, runLots, add, update, swapRows, deleteRow } from './utils';

let startTime;
let lastMeasure;
let lastSpend;
const runs = [];
window.runs = runs;
const startMeasure = name => {
  startTime = performance.now();
  lastMeasure = name;
};
const stopMeasure = () => {
  const last = lastMeasure;
  if (lastMeasure) {
    window.setTimeout(() => {
      lastMeasure = null;
      const stop = performance.now();
      const duration = 0;
      lastSpend = stop - startTime;
      runs.push(`${last}: ${lastSpend}`);
      console.log(`${last} took ${lastSpend}`);
    }, 0);
  }
};

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selected: undefined,
      id: 1,
    };
    this.select = this.select.bind(this);
    this.delete = this.delete.bind(this);
    this.add = this.add.bind(this);
    this.run = this.run.bind(this);
    this.update = this.update.bind(this);
    this.runLots = this.runLots.bind(this);
    this.clear = this.clear.bind(this);
    this.swapRows = this.swapRows.bind(this);
    this.start = 0;
  }
  componentDidMount() {
    stopMeasure();
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { data, selected } = this.state;
    const nextData = nextState.data;
    const nextSelected = nextState.selected;
    return (
      !(data.length === nextData.length && data.every((v, i) => v === nextData[i])) ||
      selected !== nextSelected
    );
  }
  componentDidUpdate() {
    stopMeasure(() => {
      runs.push([lastSpend]);
    });
  }
  run() {
    startMeasure('run');
    const { id } = this.state;
    const obj = run(id);
    this.setState({ data: obj.data, id: obj.id, selected: undefined });
  }
  add() {
    startMeasure('add');
    const { id } = this.state;
    const obj = add(id, this.state.data);
    this.setState({ data: obj.data, id: obj.id });
  }
  update() {
    startMeasure('update');
    const data = update(this.state.data);
    this.setState({ data });
  }
  select(id) {
    startMeasure('select');
    this.setState({ selected: id });
  }
  delete(id) {
    startMeasure('delete');
    const data = deleteRow(this.state.data, id);
    this.setState({ data });
  }
  runLots() {
    startMeasure('runLots');
    const { id } = this.state;
    const obj = runLots(id);
    this.setState({ data: obj.data, id: obj.id, selected: undefined });
  }
  clear() {
    startMeasure('clear');
    this.setState({ data: [], selected: undefined });
  }
  swapRows() {
    startMeasure('swapRows');
    const data = swapRows(this.state.data);
    this.setState({ data });
  }

  render() {
    const dataTable = this.state.data.map(d => ({
      id: d.id,
      label: d.label,
      deleteBtn: `
      <px-icon icon="px-utl:close"></px-icon>
  `,
    }));
    return (
      <div className="container">
        <div className="jumbotron">
          <div className="row">
            <div className="col-md-6">
              <h1>React + Polymer</h1>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-sm-6 smallpad">
                  <button
                    type="button"
                    className="btn btn-primary btn-block"
                    id="run"
                    onClick={this.run}
                  >
                    Create 1,000 rows
                  </button>
                </div>
                <div className="col-sm-6 smallpad">
                  <button
                    type="button"
                    className="btn btn-primary btn-block"
                    id="runlots"
                    onClick={this.runLots}
                  >
                    Create 10,000 rows
                  </button>
                </div>
                <div className="col-sm-6 smallpad">
                  <button
                    type="button"
                    className="btn btn-primary btn-block"
                    id="add"
                    onClick={this.add}
                  >
                    Append 1,000 rows
                  </button>
                </div>
                <div className="col-sm-6 smallpad">
                  <button
                    type="button"
                    className="btn btn-primary btn-block"
                    id="update"
                    onClick={this.update}
                  >
                    Update every 10th row
                  </button>
                </div>
                <div className="col-sm-6 smallpad">
                  <button
                    type="button"
                    className="btn btn-primary btn-block"
                    id="clear"
                    onClick={this.clear}
                  >
                    Clear
                  </button>
                </div>
                <div className="col-sm-6 smallpad">
                  <button
                    type="button"
                    className="btn btn-primary btn-block"
                    id="swaprows"
                    onClick={this.swapRows}
                  >
                    Swap Rows
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DataTable
          tableData={dataTable}
          language="en"
          striped
          single-select
          hide-pagination-control
        >
          <DataTableColumn name="id" />
          <DataTableColumn name="label" />
          <DataTableColumn name="deleteBtn" type="html" />
        </DataTable>
        <span className="preloadicon glyphicon glyphicon-remove" aria-hidden="true" />
      </div>
    );
  }
}
