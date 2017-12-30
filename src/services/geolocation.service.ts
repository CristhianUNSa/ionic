import { Injectable } from "@angular/core";
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

@Injectable()
export class GeolocationService {
    /**
     * Devuelve la ubicación actual del dispositivo
     * 
     * @returns {Promise<Geoposition>} 
     * @memberof GeolocationService
     */
    get() : Promise<Geoposition> {
        return new Geolocation().getCurrentPosition();
    }
}