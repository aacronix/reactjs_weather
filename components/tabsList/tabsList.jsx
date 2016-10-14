import React from 'react';
import ProviderList from '../providerList/providerList.jsx';

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
                   className="tab-element">{data.widget_title}</a>
            </div>
        );
    },

    _renderContent: function (key, data) {
        return (
            <div key={key} id={data.name}>
                <div className="tab-content">
                    <ProviderList providerList={data.providers_list}/>
                </div>
            </div>
        );
    },

    render: function () {
        var _this = this;
        var props = this.props;
        var selected = window.Tabs.activeTabId;

        return (
            <div>
                <div className="tab-list">
                    {window.Tabs.tabsList.map((element, i) => (
                        _this._renderTabs(i, props.data[i])
                    ))}
                </div>
                <div className="content-list">
                    {_this._renderContent(selected, props.data[selected])}
                </div>
            </div>
        );
    }
});

module.exports = TabsList;