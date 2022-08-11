// we are using imports so we don't have to ship all of the openlayers library, only the components
// we actually use.
import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import OSM from "ol/source/OSM.js";

// wait until Alpine.js is initialized and create our component function called map
document.addEventListener("alpine:init", () => {
    Alpine.data("map", function () {
        return {
            map: {},
            init() {
                // a openlayers map has a target (a html dom element), layers and a view
                // we initialise the map using x-ref="map" on the element and referencing it
                // with the magic method this.$refs.map in our alpine component, this will
                // allow for multiple component on the same page.
                // our map also has a TileLayer (we will see the difference between a TileLayer and
                // a VectorLayer in the next post. for our first map, we will use the OpenStreetMap
                // source for the layer.
                // finally, the maps' view will be centered to [0, 0] coordinates of the EPSG:4326 (WGS84)
                // projection at a zoom level of 2. we use the WGS84 projection because it's the one used
                // by GPSs in Latitude/Longitude. we also use it because we will later store our spatially
                // indexed data in postgis with this projection.
                this.map = new Map({
                    target: this.$refs.map,
                    layers: [
                        new TileLayer({
                            source: new OSM(),
                        }),
                    ],
                    view: new View({
                        projection: "EPSG:4326",
                        center: [0, 0],
                        zoom: 2,
                    }),
                });
            },
        };
    });
});
