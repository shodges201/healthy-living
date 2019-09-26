import React, { Component } from 'react';
import Graph from '../../Components/Graph/Graph.js';
import './RestingHeartRate.css';

class RestingHeartRate extends Component {
    state = {};

    componentDidMount() {
    }

    render() {
        return (
            <>
                <Graph data={this.state.data} caption="Heart Rate Tracking" yAxisLabel="Resting Heart Rate" suffix="BPM" url="api/heartrate" />
            </>
        );
    }
}

export default RestingHeartRate;