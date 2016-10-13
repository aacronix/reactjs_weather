import React from 'react';
import ReactDOM from 'react-dom';
import YandexMap from '../components/yandexMap/yandexMap.jsx';
import Input from '../components/input/input.jsx';

console.clear();

window.PointsList = {
    objectPosition: [],
    mapCenter: []
};

MicroEvent.mixin(PointsList);

window.AppDispatcher = {
    register: function (payload) {
        var store = window.PointsList;

        switch (payload.eventName) {
            case 'map-click':
                store.objectPosition = payload.newItem;
                store.mapCenter = payload.newItem;
                break;
            case 'user-position':
                store.userPosition = payload.newItem;
                store.mapCenter = payload.newItem;
                break;
        }
        store.trigger('change');
    },
    dispatch: function (payload) {
        this.register(payload);
    }
};


ReactDOM.render(
    <div className="bitrixFrendly">
        <YandexMap/>
        <Input />
    </div>,
    document.getElementById('weather-container')
);
