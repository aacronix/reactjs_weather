import React from 'react';
import ReactDOM from 'react-dom';
import YandexMap from '../components/yandexMap/yandexMap.jsx';
import TextInput from '../components/textInput/textInput.jsx';
import {MaterialPicker} from 'react-color';

console.clear();

window.PointsList = {
    objectPosition: [],
    mapCenter: []
};

window.Tabs = {
    tabsList: [{
        "name": "w_0",
        "latitude": 55.55,
        "longitude": 44.45,
        "weather_provider": "yahooweather",
        "widget_title": "Погода в Йошкар-Оле",
        "wunderground_api_key": "",
        "forecastio_api_key": "",
        "weathertrigger_api_key": "",
        "weathertrigger_app_key": "",
        "apixu_api_key": "",
        "openweather_api_key": "",
        "background_color": "rgba(0, 0, 0, 1)",
        "major_text_color": "#ffffff",
        "extra_text_color": "#ffffff",
        "update_interval": 120,
        "show_provider_info": true,
        "measurement_system": "metrical",
        "providers_list": [
            {
                "name": "openweather1",
                "api_key": "3856eec20ac69363422392a1f2ce262f",
                "app_key": ""
            },
            {
                "name": "apixu1",
                "api_key": "b813f52733db4348bfc140812161409",
                "app_key": ""
            }
        ],
        "active_provider_ref": {
            "name": "yahooweather",
            "api_key": "",
            "app_key": ""
        }
    }, {
        "name": "w_0",
        "latitude": 55.55,
        "longitude": 44.45,
        "weather_provider": "yahooweather",
        "widget_title": "Погода в Казани",
        "wunderground_api_key": "",
        "forecastio_api_key": "",
        "weathertrigger_api_key": "",
        "weathertrigger_app_key": "",
        "apixu_api_key": "",
        "openweather_api_key": "",
        "background_color": "rgba(0, 0, 0, 1)",
        "major_text_color": "#ffffff",
        "extra_text_color": "#ffffff",
        "update_interval": 120,
        "show_provider_info": true,
        "measurement_system": "metrical",
        "providers_list": [
            {
                "name": "openweather2",
                "api_key": "3856eec20ac69363422392a1f2ce262f",
                "app_key": ""
            },
            {
                "name": "apixu2",
                "api_key": "b813f52733db4348bfc140812161409",
                "app_key": ""
            }
        ],
        "active_provider_ref": {
            "name": "yahooweather",
            "api_key": "",
            "app_key": ""
        }
    }, {
        "name": "w_0",
        "latitude": 55.55,
        "longitude": 44.45,
        "weather_provider": "yahooweather",
        "widget_title": "Погода в Нижнем Новгороде",
        "wunderground_api_key": "",
        "forecastio_api_key": "",
        "weathertrigger_api_key": "",
        "weathertrigger_app_key": "",
        "apixu_api_key": "",
        "openweather_api_key": "",
        "background_color": "rgba(0, 0, 0, 1)",
        "major_text_color": "#ffffff",
        "extra_text_color": "#ffffff",
        "update_interval": 120,
        "show_provider_info": true,
        "measurement_system": "metrical",
        "providers_list": [
            {
                "name": "openweather3",
                "api_key": "3856eec20ac69363422392a1f2ce262f",
                "app_key": ""
            },
            {
                "name": "apixu3",
                "api_key": "b813f52733db4348bfc140812161409",
                "app_key": ""
            }
        ],
        "active_provider_ref": {
            "name": "yahooweather",
            "api_key": "",
            "app_key": ""
        }
    }],
    activeTabId: 0
};

MicroEvent.mixin(PointsList);
MicroEvent.mixin(Tabs);

window.AppDispatcher = {
    register: function (payload) {
        var store = window.PointsList;
        var tabStore = window.Tabs;

        switch (payload.eventName) {
            case 'map-click':
                tabStore.tabsList[tabStore.activeTabId].latitude = payload.newItem[0];
                tabStore.tabsList[tabStore.activeTabId].longitude = payload.newItem[1];
                break;
            case 'tab-changing':
                tabStore.activeTabId = payload.newItem;
                break;
        }

        store.trigger('change');
        tabStore.trigger('change');
    },
    dispatch: function (payload) {
        this.register(payload);
    }
};

var ProviderItem = React.createClass({
    render: function () {
        var _this = this;
        var props = this.props;

        console.warn(props);

        return (
            <p>{props.data}</p>
        );
    }
});

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

var TabsList = React.createClass({
    componentDidMount: function () {
        window.Tabs.bind('change', this.changeState);
    },

    changeState: function () {
        this.forceUpdate();
    },

    _handleClick: function(tabId){
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

        console.warn(window.Tabs.activeTabId );

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


var App = React.createClass({
    render: function () {
        var _this = this;
        var storage = window.Tabs;
        return (
            <div className="bitrix-frendly">
                <YandexMap/>
                <TabsList data={storage.tabsList}/>
            </div>
        )
    }
});

ReactDOM.render(<App/>, document.getElementById('weather-container'));