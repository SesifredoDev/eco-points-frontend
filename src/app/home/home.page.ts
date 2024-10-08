import { AfterViewInit, Component, OnInit } from '@angular/core';
import { IonPullUpFooterState} from 'ionic-pullup';
import * as L from 'leaflet';
import { LocationService } from '../shared/services/location/location.service';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiService } from '../shared/services/api/api.service';
import { TicketComponent } from './ticket/ticket.component';

@Component({
selector: 'app-home',
templateUrl: 'home.page.html',
styleUrls: ['home.page.scss']
})
export class HomePage implements AfterViewInit {
    footerState: IonPullUpFooterState;
    isDragged: boolean = false;
    
    private centroid?: L.LatLngExpression; //

    constructor( private ls: LocationService, private toastCtrl: ToastController, private apiService: ApiService, private modalCtrl: ModalController) {
      this.footerState = IonPullUpFooterState.Collapsed;

    }

    // ngOnInit() {
       
    private map: any = undefined;
    
    private initMap(): void {
        this.map = L.map('map', {
        center: [ 39.8282, -98.5795 ],
        zoom: 3
        });
    
        const tiles = L.tileLayer('https://tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
            accessToken: "AmXW5tm4Hyi0EiAB16rJImUAQikEecBfBJvf5b0x3yaoNNEvVkzlGCkULxsteqEi",
      
        maxZoom: 18,
        minZoom: 3,
        });

        
    
        tiles.addTo(this.map);
        
        this.loadPins(); // Load pins on map after map is ready
    }
    
    
    ngAfterViewInit(): void {
        this.initMap();
        this.onMapReady()
    }

    onMapReady() {
        setTimeout(async () => {

            const location = await this.ls.getCurrentCoords();
            if(location) this.centroid = [location.coords.latitude , location.coords.longitude];
            else{
                this.toastCtrl.create({message: 'Unable to retrieve your current location', duration: 2000}).then(toast => toast.present());
                this.centroid = [54.5973, 5.9301];
            }

            
      
            // this.map = L.map('map', {
            //   center: this.centroid,
            //   maxZoom: 15,
            //   minZoom: 13
      
      
            // })
            // this.centroid = [51.5775, 0.1786];

           
      
            this.map.invalidateSize();
            this.map.setZoom(15);
            this.map.panTo(this.centroid)

      
            
          }, 1000);
      
      
        }

    loadPins(){
        let busIcon : any = {
            icon: L.icon({
              iconSize: [ 15, 15 ],
              iconAnchor: [ 13, 0 ],
              // specify the path here
              iconUrl: 'assets/icon/bus-icon.png',
           })
        };

        let bikeIcon : any = {
            icon: L.icon({
                iconSize: [ 15, 15 ],
                iconAnchor: [ 13, 0 ],
                // specify the path here
                iconUrl: 'assets/icon/bike-icon.png',
            })
        }

        let trainIcon : any = {
            icon: L.icon({
                iconSize: [ 15, 15 ],
                iconAnchor: [ 13, 0 ],
                // specify the path here
                iconUrl: 'assets/icon/train-icon.png',
            })
        }


        // Fetch data from API and add pins to the map
        this.apiService.getBusObservable().subscribe(data => {
            data.forEach(bus => {
                 L.marker([bus.Latitude, bus.Longitude], busIcon).addTo(this.map).on('mouseover', (data)=>{
                    this.iconClick();
                 });
            });
        })

        this.apiService.getBikeObservable().subscribe(bikes => { 
            bikes.forEach(bike => {
                L.marker([bike.Latitude, bike.Longitude], bikeIcon).addTo(this.map);
            });
        })
        this.apiService.getTrainObservable().subscribe(trains => {
            trains.forEach(rail => {
                L.marker([rail.Latitude, rail.Longitude], bikeIcon).addTo(this.map);
            });
        })

        this.apiService.getBike();

        this.apiService.getBuses();

        this.apiService.getRails();
    }

    async iconClick(){
        let modal = await this.modalCtrl.create({
            
            component: TicketComponent,
        })
        modal.present();
    }
    

    // }

    // optional capture events
    footerExpanded() {
        console.log('Footer expanded!');
        this.toggleFooter()
    }

    // optional capture events
    footerCollapsed() {
        console.log('Footer collapsed!');
        this.toggleFooter()
    }

    // toggle footer states
    toggleFooter() {
        this.footerState = this.footerState === IonPullUpFooterState.Collapsed ? IonPullUpFooterState.Expanded : IonPullUpFooterState.Collapsed;
        this.isDragged = this.isDragged === false ? true : false;
    }

}


