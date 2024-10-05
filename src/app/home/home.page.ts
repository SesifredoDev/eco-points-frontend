import { Component, OnInit } from '@angular/core';
import { IonPullUpFooterState} from 'ionic-pullup';

@Component({
selector: 'app-home',
templateUrl: 'home.page.html',
styleUrls: ['home.page.scss']
})
export class HomePage {
    footerState: IonPullUpFooterState;
    isDragged: boolean = false;

    constructor() {
      this.footerState = IonPullUpFooterState.Collapsed;

    }

    // ngOnInit() {
        
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


