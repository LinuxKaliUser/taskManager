import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { GeolocatorService } from '../services/geolocator.service';
import { MapInfoWindow, MapMarker, GoogleMap, GoogleMapsModule } from '@angular/google-maps';


@Component({
  selector: 'app-geolocator',
  templateUrl: './geolocator.component.html',
  styleUrls: ['./geolocator.component.scss'],
  standalone: true,
  imports: [IonicModule, GoogleMapsModule]
})

export class GeolocatorComponent  implements OnInit {
  @ViewChild(GoogleMap, { static: false })
  map!: GoogleMap;
  center!: google.maps.LatLngLiteral;
  zoom = 15;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];

  latitude : number = 0
  longitude : number = 0
  altitude : number | null = 0

  constructor( public geolocationService : GeolocatorService) {  }

  getCurrentPosition = async () => {
    const position = await this.geolocationService.getCurrentPosition()

    this.latitude = position.coords.latitude
    this.longitude = position.coords.longitude
    this.altitude = position.coords.altitude
  }

  resetPosition () {
    this.latitude = 0
    this.longitude = 0
    this.altitude = 0
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      const markerPosition: google.maps.LatLngLiteral = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
      this.markerPositions.push(markerPosition);
    }
  }
   
  removeLastMarker() {
    this.markerPositions.pop();
  }

}
