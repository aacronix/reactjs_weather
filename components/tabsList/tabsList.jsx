import React from 'react';
import ProviderList from '../providerList/providerList.jsx';
import ViewOptionsList from '../viewOptionsList/viewOptionsList.jsx';

var TabsList = React.createClass({
    componentDidMount: function () {
        window.Tabs.bind('change', this.changeState);
    },

    changeState: function () {
        this.forceUpdate();
    },

    _handleClick: function (tabId) {
        AppDispatcher.dispatch({
            eventName: 'tab-changing',
            newItem: tabId
        });
    },

    _renderTabs: function (key, data) {
        var _this = this;
        var storage = window.Tabs;

        var activeClass = (storage.activeTabId === key ? 'active' : '');
        return (
            <div key={key} id={data.name} className={activeClass}>
                <a href={'#' + data.name} onClick={function(){_this._handleClick(key)}}
                   className="tab-element">{data.widget_name}</a>
            </div>
        );
    },

    _renderContent: function (key, data) {
        return (
            <div key={key} id={data.name}>
                <div className="tab-content clearfix">
                    <ProviderList providerList={data.providers_list} activeProvider={data.weather_provider} providerId={key}/>
                    <ViewOptionsList activeProvider={key}/>
                </div>
            </div>
        );
    },

    render: function () {
        var _this = this;
        var props = this.props;
        var selected = window.Tabs.activeTabId;

        return (
            <div className="tabs-wrapper">
                <div className="tab-list">
                    {window.Tabs.tabsList.map((element, i) => (
                        _this._renderTabs(i, props.data[i])
                    ))}
                </div>
                <div className="content-list">
                    <div className="block">
                        {_this._renderContent(selected, props.data[selected])}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = TabsList;