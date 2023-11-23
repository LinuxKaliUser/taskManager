import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class GoogleMapComponent {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap | undefined;
  center: google.maps.LatLngLiteral = {lat: 40, lng: -20};
  zoom = 4;
}