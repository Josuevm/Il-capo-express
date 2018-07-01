import { Component, ViewChild, ElementRef, NgZone, Output, EventEmitter } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular'
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
import { DatabaseMethodsProvider } from '../../providers/database-methods/database-methods';
import firebase from 'firebase';
/**
 * This class handles an input to search a location, a map to select an specific addres
 * and another input to add another signals to send a more specified address.
 */
@Component({
  selector: 'address-selector',
  templateUrl: 'address-selector.html'
})
export class AddressSelectorComponent {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
  

  @Output() addressChanged = new EventEmitter;

  latitude: number;
  longitude: number;
  autocompleteService: any;
  placesService: any;
  query: string = '';
  places: any = [];
  searchDisabled: boolean;
  saveDisabled: boolean;
  location: any;
  markerPosition: any;
  user: any;
  position: any;
  loggedUser = {
    photo: "",
    name: "",
    address: {
      location: "",
      position: {
        lat: "", lng: ""
      },
      otherSigns: ""
    },
    telephone: ""
  }
  userUID: any;
  signs : string = "";

  constructor(public db: DatabaseMethodsProvider,
    public zone: NgZone,
    public maps: GoogleMapsProvider,
    public platform: Platform,
    public geolocation: Geolocation) {

    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.userUID = user.uid;
        this.getUserCoordinates();
      }
      
      let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {
        this.autocompleteService = new google.maps.places.AutocompleteService();
        this.placesService = new google.maps.places.PlacesService(this.maps.map);
        this.searchDisabled = false;
        this.setPosition();
      });

    });
    this.maps.markerChanged.subscribe(data =>{
      this.position = data;
      this.addressChange(data);
    });
    this.searchDisabled = true;
    this.saveDisabled = true;

  }

  /**
   * Sets the initial position of the map
   * In case that there is no user registered position is set on an specific area
   * and if there is a user logged in maps position is going to be the user´s address
   */
  setPosition() {

    let position: any;
    if (!(typeof this.loggedUser.address === "undefined")
      && !(typeof this.loggedUser.address.position === "undefined")
    &&!(this.loggedUser.name === "")) {
        console.log("entra a este if")
      position = {
        lat: this.loggedUser.address.position.lat,
        lng: this.loggedUser.address.position.lng
      }
      this.maps.map.setCenter(position)
      this.maps.setMarker(position)
      this.markerPosition = position;
      this.query = this.loggedUser.address.location;
      this.signs = this.loggedUser.address.otherSigns;
      this.addressChange(this.maps.marker.position);
    }else{
      this.geolocation.getCurrentPosition().then((pos) => {
      position = new google.maps.LatLng(10.0739464, -84.31475720000003);
      this.maps.map.setCenter(position)
      this.maps.setMarker(position)
      this.markerPosition = position;
      });
    }
  }

  /**
   * This method receives a string from the searchbar input and searchs
   * diferent locations related with that string
   * Also, sets the map location based on the specified string.
   */
  selectPlace(place) {
    this.places = [];
    let location = {
      lat: null,
      lng: null,
      name: place.name
    };
    this.placesService.getDetails({ placeId: place.place_id }, (details) => {
      this.zone.run(() => {
        location.name = details.formatted_address;
        location.lat = details.geometry.location.lat();
        location.lng = details.geometry.location.lng();
        this.saveDisabled = false;
        this.maps.map.setCenter({ lat: location.lat, lng: location.lng });
        this.maps.setMarker({ lat: location.lat, lng: location.lng });
        this.markerPosition = { lat: location.lat, lng: location.lng };
        this.location = location;
        this.query = details.formatted_address;
        this.addressChange(this.maps.marker.position);
      });
    });
  }

  /**
   * Based on the string specified on the searchbar input
   * this method shows similar places so the user can choose
   * wich is te correct.
   */
  searchPlace() {
    this.saveDisabled = true;
    if (this.query.length > 0 && !this.searchDisabled) {

      let config = {
        types: ['geocode'],
        input: this.query
      }
      this.autocompleteService.getPlacePredictions(config, (predictions, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK && predictions) {
          this.places = [];
          predictions.forEach((prediction) => {
            this.places.push(prediction);
          });
        }
      });
    } else {
      this.places = [];
    }
  }

  /**
   * In case that there is a logged user this method gets
   * that user addrees coordinates
   */
  getUserCoordinates() {
    let self = this;
    let doc = this.db.getDocument('users', this.userUID);
    doc.on("value", function (snapshot) {
      let data = snapshot.val()
      self.loggedUser.name = data.name;
      self.loggedUser.address = data.address;
      self.loggedUser.telephone = data.telephone;
    })
  }

  //This method sends the addres selected to the parent component
  addressChange(position) {
    let address= {
      location: this.query,
      position: {
        lat: position.lat(),
        lng: position.lng()
      },
      otherSigns: this.signs
    }

    this.addressChanged.emit(address);
  }

  refreshInput(){
    this.addressChange(this.maps.marker.position);
  }

}
