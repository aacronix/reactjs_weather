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

window.providersInfo = {
    ru: {
        "openweather": {
            name: "Open Weather",
            link: "https://openweathermap.org/"
        },
        "apixu": {
            name: "Apixu",
            link: "http://www.apixu.com/"
        },
        "weathertrigger": {
            name: "Weather Trigger",
            link: "http://www.weatherunlocked.com/"
        },
        "yahooweather": {
            name: "Yahoo Weather",
            link: "https://developer.yahoo.com/weather/"
        }
    }
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
                "name": "openweather",
                "api_key": "3856eec20ac69363422392a1f2ce262f",
                "app_key": ""
            },
            {
                "name": "apixu",
                "api_key": "b813f52733db4348bfc140812161409",
                "app_key": ""
            },
            {
                "name": "weathertrigger",
                "api_key": "safb813f52733db4348bfc140812161409",
                "app_key": "aofiuyh387rq48rcfml"
            },
            {
                "name" : "yahooweather",
                "api_key": "",
                "app_key": ""
            }
        ],
        "active_provider_ref": {
            "name": "yahooweather",
            "api_key": "",
            "app_key": ""
        }
    }, {
        "name": "w_1",
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
                "name": "openweather",
                "api_key": "3856eec20ac69363422392a1f2ce262f",
                "app_key": ""
            },
            {
                "name": "apixu",
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
        "name": "w_2",
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
                "name": "openweather",
                "api_key": "3856eec20ac69363422392a1f2ce262f",
                "app_key": ""
            },
            {
                "name": "apixu",
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
            case 'change-provider':
                tabStore.tabsList[payload.newItem[0]].weather_provider = payload.newItem[1];
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