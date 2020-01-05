import React, { Component } from 'react';
import Graph from './Graph';
import { Button } from 'react-bootstrap';
import '../css/ClauseVisualizer.css';


class ClauseVisualizer extends Component {

  constructor(props){
    super(props);
    this.state = {
      clauseStrs: props.clauseInfo.data.clauses,
      graphStrs: props.clauseInfo.data.graphs,
      graphIndex: 0
    };
  }

  prevDotStr() {
    this.setState(prevState => ({ 
      graphIndex: prevState.graphIndex - 1
    }));
  }

  nextDotStr() {
    this.setState(prevState => ({ 
      graphIndex: prevState.graphIndex + 1
    }));
  }

  render() {
      return (
        <div className="clause-visualizer">
          <div className="edit-clauses-wrapper">
            <div className="edit-clauses-container">
              <Button bsStyle="primary" onClick={this.props.onResetClauseClick}>
                Reset clause
              </Button>
            </div>
          </div>
          <div className="graph-wrapper">
            <div className="graph-container">
              <Graph
                dotStr={this.state.graphStrs[this.state.graphIndex]}
              />
              <div className="graph-steps-container">
                <div className="button-container">
                  <div>
                    <Button bsStyle="primary" onClick={() => this.prevDotStr()} disabled={this.state.graphIndex===0}>
                      Prev step
                    </Button>
                  </div>
                  <div>
                    <Button bsStyle="primary" onClick={() => this.nextDotStr()} disabled={this.state.graphIndex===(this.state.graphStrs.length-1)}>
                      Next step
                    </Button>
                  </div>
                </div>
              </div> 
            </div>
          </div>
        </div>
      );
  }
}

export default ClauseVisualizer;