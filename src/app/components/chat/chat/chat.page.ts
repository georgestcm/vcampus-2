import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { Socket } from 'ngx-socket-io';
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
  txtMessage : string='';
  messages  : Array<any> =[];

  constructor(public actionSheetController: ActionSheetController, private storage : Storage, 
    private chatService : ChatService, private route : ActivatedRoute, 
    private toastCtrl: ToastController, private socket: Socket) {

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
    this.socket.connect();

    this.socket.fromEvent('user-changed').subscribe( data  =>{
      console.log(data);
      const user = data['user'];
       if(data['event']=='left'){
        this.presentToast(`User Left: ${user}`)
       }else{
        this.presentToast(`User Joined: ${user}`)
       }
    });

     this.socket.fromEvent('message').subscribe((data : any) => {
      console.log(data);
      this.messages.push(data);
      console.log(this.messages);
    });
  }

  ionViewWillLeave(){
    this.socket.disconnect();
  }
   
  presentToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    }).then((toastData) =>{
      toastData.present();
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
   
    this.chatService.sendMessage({text : this.txtMessage, sendTo : this.username});
    this.txtMessage='';
   
    if(this.role<=2){
      //Broadcast
    }else{
      //send message
    }
  }
}
