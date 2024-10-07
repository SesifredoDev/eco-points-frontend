import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { CodeComponent } from './code/code.component';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {

  constructor(private popoverController: PopoverController ) { }

  ngOnInit() {
  }

  async presentCode() {
    const popover = await this.popoverController.create({
      component: CodeComponent,
      translucent: true,
    });
    return await popover.present();
  }

}
