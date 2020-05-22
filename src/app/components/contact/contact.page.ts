import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  constructor(public alertController: AlertController) { }

  ngOnInit() {
  }
  async presentAlertSent() {
      const alert = await this.alertController.create({
        message: 'Message was sent',
        buttons: ['OK']
      });

      await alert.present();
    }
}
