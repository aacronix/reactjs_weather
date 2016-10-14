import React from 'react';

var ProviderItem = React.createClass({
    render: function () {
        var _this = this;
        var props = this.props;

        return (
            <p>{props.data}</p>
        );
    }
});

module.exports = ProviderItem;