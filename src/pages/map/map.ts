import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, LatLng} from '@ionic-native/google-maps'
import { GeolocationService } from '../../services/geolocation.service';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private geolocator: GeolocationService) {
  }

  loadMap(lat, lng) {
    let location: LatLng = new LatLng(lat, lng);
    // Enviamos el id #map a GoogleMap
    new GoogleMap("map", {
      'controls': {
        'compass': true,
        'myLocationButton': true,
        'indoorPicker': true,
        'zoom': true
      },
      'gestures': {
        'scroll': true,
        'tilt': true,
        'rotate': true,
        'zoom': true
      },
      'camera': {
        'target': location,
        'tilt': 30,
        'zoom': 15,
        'bearing': 50
      }
    });
  }

  ionViewDidLoad() {
    // Obtener coordendas del usuario para centrar el mapa
    this.geolocator.get()
      .then(resultados => {
        //Cargar mapa
        this.loadMap(resultados.coords.latitude, resultados.coords.longitude);
      }).catch( err => {
        console.error(err);
      })
  }

}
