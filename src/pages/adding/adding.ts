import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { Transaction } from "../../database";
import { GeolocationService } from "../../services/geolocation.service";
import { Camera, CameraOptions } from "@ionic-native/camera";

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
  shouldGeolocate: boolean = false;
  shouldSend: boolean = true;
  longitude: number;
  latitude: number;
  model: Transaction;
  imageData: string;

  constructor(
    public navCtrl: NavController,
    public geolocator: GeolocationService,
    private camera: Camera
  ) {
    this.limpiar();
  }

  getPhoto() {
    const options: CameraOptions = {
      quality: 20,
      allowEdit: false,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 100,
      targetWidth: 100
    };
    this.camera
      .getPicture(options)
      .then(imageData => {
        let base64Image = "data:image/jpeg;base64," + imageData;
        this.imageData = base64Image;
        this.model.imageUrl = base64Image;
      })
      .catch(err => console.error(err));
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
    if (this.shouldGeolocate) {
      this.shouldSend = false;
      this.geolocator
        .get()
        .then(resultado => {
          this.model.setCoords(resultado.coords);
          this.shouldSend = true;
          console.log(this.model);
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      this.model.cleanCoords();
      console.log(this.model);
    }
  }

  ionViewDidLoad() {}
}
