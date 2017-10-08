import React from "react";
import { connect } from "react-redux";
import Map from "./Map";
import {
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Col,
  Button,
  Well,
  Row
} from "react-bootstrap";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";

const mapStateToProps = state => {
  return {
    markers: state.mapsReducer.markers,
    directions: state.mapsReducer.directions
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getRoute(directions) {
      dispatch({
        type: "GET_DIRECTIONS",
        payload: directions
      });
    }
  };
};

class HomePage extends React.Component {
  constructor() {
    super();
    this.findRoute = this.findRoute.bind(this);
  }

  findRoute() {
    var tourStops = [];
    for (var i = 0; i < this.props.markers.length; i++) {
      tourStops.push({
        location: this.props.markers[i].position,
        stopover: true
      });
    }

    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route(
      {
        origin: {
          lat: 29.424122,
          lng: -98.493629
        },
        destination: {
          lat: 29.424122,
          lng: -98.493629
        },
        waypoints: tourStops,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log(result);
          this.props.getRoute(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  render() {
    return (
      <div>
        <Row>
          <Col lg={10} lgOffset={1}>
            <Map
              containerElement={<div style={{ height: `500px` }} />}
              mapElement={<div style={{ height: `500px` }} />}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={10} lgOffset={1}>
            <div>
              <Button onClick={this.findRoute}>Find Quickest Route</Button>
            </div>
            <div>
              <Button>Save Route</Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={10} lgOffset={1}>
            <div>
              <h4>Directions</h4>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
