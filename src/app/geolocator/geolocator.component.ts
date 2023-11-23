import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment'; // Adjust the path as necessary for your project structure
import { GoogleMap } from '@capacitor/google-maps';


@Component({
  selector: 'app-geolocator',
  templateUrl: './geolocator.component.html',
  styleUrls: ['./geolocator.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
 

})

export class GeolocatorComponent  implements AfterViewInit {
  @ViewChild('map')

  mapRef!: ElementRef<HTMLElement>;
  newMap!: GoogleMap;
  markerPositions: any;

  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.mapsApiKey,
      config: {
        center: {
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8,
      },
    });
  }

  ngAfterViewInit() {
    this.createMap();
  }

  addMarker(event : Event) {
    const target = event.target as any;
    if (target.latLng) {
      const markerPosition: google.maps.LatLngLiteral = {
        lat: target.latLng.lat(),
        lng: target.latLng.lng()
      };
      this.markerPositions.push(markerPosition);
    }
  }

  onMapReady() {
    console.log('Map is ready');
    // You can now interact with the map via the map instance
    this.createMap();
  }

}


