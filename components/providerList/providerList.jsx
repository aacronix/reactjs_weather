import React from 'react';
import ProviderItem from '../providerItem/providerItem.jsx';

var ProviderList = React.createClass({
    render: function () {
        var _this = this;
        var props = this.props;

        return (
            <div>
                {props.providerList.map((element, i) => (
                    <ProviderItem data={element.name} key={i}/>
                ))}
            </div>
        );
    }
});

module.exports = ProviderList;