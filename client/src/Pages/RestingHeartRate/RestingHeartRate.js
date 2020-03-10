import { __extends } from "tslib";
import React, { Component } from 'react';
import Graph from '../../Components/Graph/Graph.js';
import './RestingHeartRate.css';
import DialogOpener from "../../Components/DialogOpener/DialogOpener";
import NoData from 'src/Components/NoData/NoData.js';
var RestingHeartRate = /** @class */ (function (_super) {
    __extends(RestingHeartRate, _super);
    function RestingHeartRate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            dataAvailable: false,
            data: []
        };
        _this.url = "/api/heartrate";
        _this.getAllData = function (cb) {
            fetch(_this.url + "/getAllUser", {
                method: 'GET',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (data) { return data.json(); }).then(function (data) {
                var formattedData = data.map(function (item) {
                    return { label: new Date(item.date).toLocaleDateString(), value: item.level };
                });
                console.log(formattedData);
                cb(formattedData);
            });
        };
        _this.addNewData = function (date, amount, cb) {
            fetch(_this.url + "/new", {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ date: date, amount: amount })
            }).then(function (data) { return data.json(); }).then(function (data) {
                _this.getAllData(function (entries) {
                    console.log(entries);
                    if (!_this.state.dataAvailable) {
                        _this.setState({ data: entries, dataAvailable: true });
                    }
                    else {
                        _this.setState({ data: entries });
                    }
                    cb();
                });
            });
        };
        return _this;
    }
    RestingHeartRate.prototype.componentDidMount = function () {
        var _this = this;
        this.getAllData(function (data) {
            if (data.length > 0) {
                console.log("there is existing data");
                return _this.setState({ data: data, dataAvailable: true });
            }
            return _this.setState({ data: data });
        });
    };
    RestingHeartRate.prototype.render = function () {
        return (this.state.dataAvailable ?
            (React.createElement(React.Fragment, null,
                React.createElement(Graph, { graphType: "heart rate", caption: "Heart Rate", yAxisLabel: "BPM", suffix: "BPM", inputLabel: "Heart Rate", data: this.state.data }),
                React.createElement(DialogOpener, { graphType: "line", label: "BPM", caption: "Resting Heart Rate", submitNewEntry: this.addNewData }),
                ")"))
            :
                (React.createElement(React.Fragment, null,
                    React.createElement(NoData, null),
                    React.createElement(DialogOpener, { graphType: "line", label: "BPM", caption: "Resting Heart Rate", submitNewEntry: this.addNewData }))));
    };
    return RestingHeartRate;
}(Component));
export default RestingHeartRate;
//# sourceMappingURL=RestingHeartRate.js.map