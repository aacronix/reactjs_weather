import React from 'react';
import ProviderItem from '../providerItem/providerItem.jsx';

var ProviderList = React.createClass({
    render: function () {
        var _this = this;
        var props = this.props;
        var activeProvider = props.activeProvider;

        console.log(props);

        return (
            <div className="providers">
                <p className="title">Провайдеры</p>
                {props.providerList.map((element, i) => (
                    <ProviderItem data={element} key={i} activeProvider={activeProvider} providerId={_this.props.providerId}/>
                ))}
            </div>
        );
    }
});

module.exports = ProviderList;