/* global google */
import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap
} from "react-google-maps";
import { DrawingManager } from "react-google-maps/lib/components/drawing/DrawingManager";

class Map extends Component {
  constructor() {
    super();
    this.shapes = [];
    this.handleOverlayComplete = this.handleOverlayComplete.bind(this);
  }

  handleOverlayComplete(e) {
    const shape = e.overlay;
    shape.type = e.type;
    google.maps.event.addListener(shape, "click", () => {
      this.deleteShape(shape);
    });
  }

  deleteShape(shape) {
    shape.setMap(null);
  }

  render() {
    return (
      <GoogleMap
        defaultZoom={16}
        defaultCenter={new google.maps.LatLng(42.36, -71.05)}
      >
        <DrawingManager
          defaultDrawingMode={google.maps.drawing.OverlayType.POLYGON}
          defaultOptions={{
            drawingControl: true,
            drawingControlOptions: {
              position: google.maps.ControlPosition.TOP_CENTER,
              drawingModes: [google.maps.drawing.OverlayType.POLYGON]
            }
          }}
          onOverlayComplete={this.handleOverlayComplete}
        />
      </GoogleMap>
    );
  }
}

export default withScriptjs(withGoogleMap(Map));
