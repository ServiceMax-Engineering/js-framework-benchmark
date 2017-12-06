'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
const { Row } = require('./Row');
const { run, run100, runLots, add, add100, update, swapRows, deleteRow } = require('./utils')
var startTime;
var lastMeasure;
var lastSpend;
const runs = {};
var startMeasure = function (name) {
    startTime = performance.now();
    lastMeasure = name;
}
var stopMeasure = function (cb) {
    var last = lastMeasure;
    if (lastMeasure) {
        window.setTimeout(function () {
            lastMeasure = null;
            var stop = performance.now();
            var duration = 0;
            lastSpend = stop - startTime;
            if (!runs[last]) {
                runs[last] = [];
            }
            runs[last].push(parseInt(lastSpend, 10));
            console.log(last + " took " + (lastSpend));
            cb && cb();
        }, 0);
    }
}
function sum(arr) {
  return arr.reduce((total, item) => total + item);
}
window.genReport = () => {
  Object.keys(runs).forEach(measure => {
    console.log(measure, runs[measure]);
    console.log(measure, 'avg-5', parseInt(sum(runs[measure].slice(0, 5)) / 5, 10));
  });
};
export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selected: undefined,
            id: 1
        };
        this.select = this.select.bind(this);
        this.delete = this.delete.bind(this);
        this.add = this.add.bind(this);
        this.add100 = this.add100.bind(this);
        this.run = this.run.bind(this);
        this.run100 = this.run100.bind(this);
        this.update = this.update.bind(this);
        this.runLots = this.runLots.bind(this);
        this.clear = this.clear.bind(this);
        this.swapRows = this.swapRows.bind(this);
        this.start = 0;
    }
    printDuration() {
        stopMeasure();
    }
    componentDidUpdate() {
        this.printDuration();
    }
    componentDidMount() {
        this.printDuration();
    }
    run() {
        startMeasure("run");
        const { id } = this.state;
        const obj = run(id);
        this.setState({ data: obj.data, id: obj.id, selected: undefined });
    }
    add() {
        startMeasure("add");
        const { id } = this.state;
        const obj = add(id, this.state.data);
        this.setState({ data: obj.data, id: obj.id});
    }  
    run100() {
        startMeasure('run100');
        const { id } = this.state;
        const obj = run100(id);
        this.setState({ data: obj.data, id: obj.id, selected: undefined });
    }
    add100() {
        startMeasure('add100');
        const { id } = this.state;
        const obj = add100(id, this.state.data);
        this.setState({ data: obj.data, id: obj.id });
    }
    update() {
        startMeasure("update");
        const data = update(this.state.data);
        this.setState({ data: data });
    }
    select(id) {
        startMeasure("select");
        this.setState({ selected: id });
    }
    delete(id) {
        startMeasure("delete");
        const data = deleteRow(this.state.data, id);
        this.setState({ data: data });
    }
    runLots() {
        startMeasure("runLots");
        const { id } = this.state;
        const obj = runLots(id);
        this.setState({ data: obj.data, id: obj.id, selected: undefined });
    }
    clear() {
        startMeasure("clear");
        this.setState({ data: [], selected: undefined });
    }
    swapRows() {
        startMeasure("swapRows");
        const data = swapRows(this.state.data);
        this.setState({ data: data });
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { data, selected } = this.state;
        const nextData = nextState.data;
        const nextSelected = nextState.selected;
        return !(data.length === nextData.length && data.every((v, i) => v === nextData[i])) || selected != nextSelected;
    }
    render() {
        let rows = this.state.data.map((d, i) => {
            return <Row key={d.id} data={d} onClick={this.select} onDelete={this.delete} styleClass={d.id === this.state.selected ? 'danger' : ''}></Row>
        });
        return (<div className="container">
            <div className="jumbotron">
                <div className="row">
                    <div className="col-md-4">
                        <h1>React keyed</h1>
                    </div>
                    <div className="col-md-8">
                      <div className="row">
                        <div className="col-sm-4 smallpad">
                          <button
                            type="button"
                            className="btn btn-primary btn-block"
                            id="run100"
                            onClick={this.run100}
                          >
                            Create 100 rows
                          </button>
                        </div>
                        <div className="col-sm-4 smallpad">
                          <button
                            type="button"
                            className="btn btn-primary btn-block"
                            id="run"
                            onClick={this.run}
                          >
                            Create 1,000 rows
                          </button>
                        </div>
                        <div className="col-sm-4 smallpad">
                          <button
                            type="button"
                            className="btn btn-primary btn-block"
                            id="runlots"
                            onClick={this.runLots}
                          >
                            Create 10,000 rows
                          </button>
                        </div>
                        <div className="col-sm-4 smallpad">
                          <button
                            type="button"
                            className="btn btn-primary btn-block"
                            id="add100"
                            onClick={this.add100}
                          >
                            Append 100 rows
                          </button>
                        </div>
                        <div className="col-sm-4 smallpad">
                          <button
                            type="button"
                            className="btn btn-primary btn-block"
                            id="add"
                            onClick={this.add}
                          >
                            Append 1,000 rows
                          </button>
                        </div>
                        <div className="col-sm-4 smallpad">
                          <button
                            type="button"
                            className="btn btn-primary btn-block"
                            id="update"
                            onClick={this.update}
                          >
                            Update every 10th row
                          </button>
                        </div>
                        <div className="col-sm-4 smallpad" />
                        <div className="col-sm-4 smallpad">
                          <button
                            type="button"
                            className="btn btn-primary btn-block"
                            id="clear"
                            onClick={this.clear}
                          >
                            Clear
                          </button>
                        </div>
                        <div className="col-sm-4 smallpad">
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
            <table className="table table-hover table-striped test-data">
                <tbody>
                    {rows}
                </tbody>
            </table>
            <span className="preloadicon glyphicon glyphicon-remove" aria-hidden="true"></span>
        </div>);
    }
}
