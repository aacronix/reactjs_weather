import React from 'react';
import {Map, Marker, MarkerLayout} from 'yandex-map-react';

var YandexMap = React.createClass({
    getInitialState: function () {
        return {
            latitude: 55.754734,
            longitude: 37.583314
        };
    },

    componentDidMount: function () {
        window.PointsList.bind('change', this.changeState);
    },

    changeState: function () {
        this.forceUpdate();
    },

    handleChange: function (evt) {
        console.log(evt);
    },

    handleMapClick: function (event) {
        AppDispatcher.dispatch({eventName: 'map-click', newItem: event.get('coords')});
    },

    render: function () {
        var store = window.PointsList;
        var objectPositionLat = store.objectPosition[0];
        var objectPositionLon = store.objectPosition[1];
        var mapCenterLat = this.state.latitude;
        var mapCenterLon = this.state.longitude;

        var marker;

        if (store.objectPosition.length > 0) {
            marker = <Marker lat={objectPositionLat} lon={objectPositionLon}>
                <MarkerLayout>
                    <div style={markerStyles}>
                        <img src="../images/resized/pin-object-position.png"/>
                    </div>
                </MarkerLayout>
            </Marker>;
        }

        return <Map onClick={this.handleMapClick}
                    onAPIAvailable={function () { console.log('API loaded'); }}
                    width={'100%'}
                    state={mapState}
                    center={[mapCenterLat, mapCenterLon]}
                    zoom={10}>
            {marker}
        </Map>;
    }
});

const markerStyles = {
    width: '40px',
    height: '40px',
    background: 'transparent',
    borderRadius: '50%'
};

const mapState = {
    controls: [] //non controls
};

module.exports = YandexMap;