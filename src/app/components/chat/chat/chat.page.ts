import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { ChatService } from 'src/app/providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  role:number;
  showSearch : boolean = false;
  username : string='';
  fullName : string='Send Message';
  constructor(public actionSheetController: ActionSheetController, private storage : Storage, 
    private chatService : ChatService, private route : ActivatedRoute) {

      if (this.route.snapshot.paramMap.get('username')) {
        this.username = this.route.snapshot.paramMap.get('username');
        this.fullName = this.route.snapshot.paramMap.get('name');
        this.chatService.setUserName(this.username);
      }

     }
  
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
    this.chatService.setUserName("Rajeev");
    //console.log(this.chatService.getMessage());
    if(this.role<=2){
      //Broadcast
    }else{
      //send message
    }
  }
}
