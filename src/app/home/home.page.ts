import { AfterViewInit, Component, OnInit } from '@angular/core';
import { IonPullUpFooterState} from 'ionic-pullup';
import * as L from 'leaflet';
import { LocationService } from '../shared/services/location/location.service';
import { ToastController } from '@ionic/angular';

@Component({
selector: 'app-home',
templateUrl: 'home.page.html',
styleUrls: ['home.page.scss']
})
export class HomePage implements AfterViewInit {
    footerState: IonPullUpFooterState;
    isDragged: boolean = false;
    
    private centroid?: L.LatLngExpression; //

    constructor( private ls: LocationService, private toastCtrl: ToastController) {
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
            this.map.setZoom(14);
            this.map.panTo(this.centroid)
      
            
          }, 1000);
      
      
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


