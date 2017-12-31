import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  Marker,
  MarkerOptions
} from "@ionic-native/google-maps";
import { GeolocationService } from "../../services/geolocation.service";
import { Transaction } from "../../database";
import { Subscription } from "rxjs/Subscription";

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-map",
  templateUrl: "map.html"
})
export class MapPage {
  mapSubscription: Subscription;
  map: GoogleMap;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocator: GeolocationService
  ) {}

  loadMarkers() {
    Transaction.all().then(results => this.loadTransactionMarkers(results));
  }

  loadTransactionMarkers(transactions) {
    for (let i = 0; i < transactions.length; i++) {
      debugger;
      const tran = transactions[i];
      let markerLocation: LatLng = new LatLng(tran.lat, tran.lng);
      let markerOptions: MarkerOptions = {
        position: markerLocation,
        title: tran.title,
        icon: "blue"
      };
      this.map
        .addMarker(markerOptions)
        .then((marker: Marker) => {
          marker.showInfoWindow();
        })
        .catch(err => console.error(err));
    }
  }

  loadMap(lat, lng) {
    let location: LatLng = new LatLng(lat, lng);
    let mapOptions = {
      controls: {
        compass: true,
        myLocationButton: true,
        indoorPicker: true,
        zoom: true
      },
      gestures: {
        scroll: true,
        tilt: true,
        rotate: true,
        zoom: true
      },
      camera: {
        target: location,
        tilt: 30,
        zoom: 15,
        bearing: 50
      }
    };
    // Enviamos el id #map a GoogleMap
    this.map = new GoogleMap("map", mapOptions);

    // Wait the MAP_READY before using any methods.
    this.mapSubscription = this.map
      .on(GoogleMapsEvent.MAP_READY)
      .subscribe(() => this.loadMarkers());
  }

  ionViewWillEnter() {
    // Obtener coordendas del usuario para centrar el mapa
    this.geolocator
      .get()
      .then(resultados => {
        console.log("resultados coord ionViewWillEnter: ", resultados);
        //Cargar mapa
        this.loadMap(resultados.coords.latitude, resultados.coords.longitude);
      })
      .catch(err => {
        console.error(err);
      });
  }
  // ionViewWillLeave() {
  //   try {
  //     if (this.map) {
  //       this.mapSubscription.unsubscribe();
  //       this.map.remove();
  //       this.map = null;
  //       console.log("ionViewWillLeave this.map", this.map);
  //     }
  //   } catch (error) {
  //     console.warn("El mapa no existía aún");
  //   }
  // }
}
