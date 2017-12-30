import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { Transaction } from "../../database";
import { GeolocationService } from "../../services/geolocation.service";

/**
 * Generated class for the AddingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-adding",
  templateUrl: "adding.html"
})
export class AddingPage {
  shouldGeolocate :boolean = false;
  shouldSend: boolean = true;
  longitude: number;
  latitude: number;
  model: Transaction;

  constructor(public navCtrl: NavController, public geolocator: GeolocationService) {
    this.limpiar();
  }

  save() {
    if (this.shouldSend) {
      this.model.save().then(resultado => {
        this.limpiar();
        this.navCtrl.pop();
      });
    }
  }

  limpiar() {
    this.model = new Transaction(null, "");
  }

  getLocation() {
    if(this.shouldGeolocate) {
      this.shouldSend = false;
      this.geolocator.get()
        .then((resultado) => {
          this.model.setCoords(resultado.coords);
          this.shouldSend = true;
          console.log(this.model);
        })
        .catch(err=> {
          console.error(err);
        })
    } else {
      this.model.cleanCoords();
      console.log(this.model);
    }
    
  }

  ionViewDidLoad() {
    
  }
}
