import React from 'react';
import ReactDOM from 'react-dom';
import YandexMap from '../components/yandexMap/yandexMap.jsx';
import TabsList from '../components/tabsList/tabsList.jsx';
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

        tabStore.trigger('change');
    },
    dispatch: function (payload) {
        this.register(payload);
    }
};

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