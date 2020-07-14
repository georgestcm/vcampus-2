import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  role:number;
  constructor(public actionSheetController: ActionSheetController, private storage : Storage) { }
  
  ngOnInit() {
    this.storage.get('role').then((val) => {
      this.role = val;
    });
  }
  async showActionItem() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Send To Chat',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Camera',
        role: 'destructive',
        icon: 'camera',
        handler: () => {
          console.log('Camera clicked');
        }
      }, {
        text: 'Photo & Video Library',
        icon: 'images',
        handler: () => {
          console.log('Photo & Video Library clicked');
        }
      }, {
        text: 'Documents',
        icon: 'attach',
        handler: () => {
          console.log('Documents clicked');
        }
      }, {
        text: 'Contacts',
        icon: 'people',
        handler: () => {
          console.log('Contacts clicked');
        }
      }, {
        text: 'Close',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  

  onClickAttachment(){
    this.showActionItem();
  }
  onClickSend(){
    if(this.role<=2){
      //Broadcast
    }else{
      //send message
    }
  }
}
