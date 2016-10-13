import React from 'react';

var Input = React.createClass({
    getInitialState: function () {
        return {
            value: "Hello!"
        };
    },

    handleChange: function (evt) {
        this.setState({
            value: evt.target.value
        });
    },

    componentDidMount: function () {
        
    },

    changeState: function () {
        this.forceUpdate();
    },

    render: function () {
        return <input value={this.state.value} onChange={this.handleChange}/>;
    }
});

module.exports = Input;