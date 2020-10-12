import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  mailSent : boolean = false;
  message : string ="";
  mailModel : any ={};
  constructor(public alertController: AlertController,public translate: TranslateService) { }

  ngOnInit() {
  }
  async presentAlertSent() {
      const alert = await this.alertController.create({
        message: 'Message sent, we will get back to you shortly.',
        buttons: ['OK']
      });

      await alert.present();
    }

    onSubmit(){

    }

}
