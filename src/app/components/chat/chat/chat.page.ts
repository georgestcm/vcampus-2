import { Component, OnInit, ViewChild,ElementRef, ChangeDetectionStrategy, ViewEncapsulation, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, IonContent, ToastController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { Socket } from 'ngx-socket-io';
import { ChatService } from 'src/app/providers/chat.service';
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss']
})
export class ChatPage implements OnInit {

  role:number;
  showSearch : boolean = false;
  username : string='';
  fullName : string='Send Message';
  txtMessage : string='';
  messages  : Array<any> =[];
  loggedInUser : string='';
  loggedInUserId : string='';
  groupId : string='';
  
  @ViewChild('content',{static :true}) private content: any;

  constructor(public actionSheetController: ActionSheetController, private storage : Storage, 
    private chatService : ChatService, private route : ActivatedRoute, 
    private toastCtrl: ToastController, private socket: Socket,private _auth : AuthService) {

      if (this.route.snapshot.paramMap.get('username')) {
        this.username = this.route.snapshot.paramMap.get('username');
        this.fullName = this.route.snapshot.paramMap.get('name');
        this.groupId = this.route.snapshot.paramMap.get('groupId');
        //this.chatService.setUserName(this.username);
        this.chatService.setGroupUser(this.username);
      }

     }
@HostListener("window:scroll",[])
     
scrollToBottomOnInit() {
  this.content.scrollToBottom(300);
}
  
  ngOnInit() {
    this.storage.get('role').then((val) => {
      this.role = val;
    });
    this.storage.get('user').then((val) => {
      this.loggedInUser = val.first_name+" "+val.last_name;
      this.loggedInUserId =val._id;
    });
    this.socket.connect();

    this.socket.fromEvent('group-join').subscribe( data  =>{
      console.log(data);
      const user = data['user'];
       if(data['event']=='left'){
        //this.presentToast(`User Left: ${user}`)
       }else{
        //this.presentToast(`User Joined: ${user}`)
       }
    });
    this.socket.fromEvent('group-message').subscribe((data : any) => {
      //console.log(data);
      this.messages.push(data);
      this.scrollToBottomOnInit();
    });
    //Pull Group Messages
    this._auth.getGroupMessagesByGroup(this.groupId).subscribe(res => {
      const chats = res[0].Chats;
      for(let i=0; i<chats.length; i++){
        const msg ={ msg : chats[i].Message, user : '', sentBy : chats[i].SentBy.first_name+ " "+ chats[i].SentBy.last_name, createdOn : chats[i].SentOn};
        this.messages.push(msg);
        
      }
      this.scrollToBottomOnInit();
    },err =>{
      console.log(err);
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
   //this.chatService.sendMessage({text : this.txtMessage, sendTo : this.username});//onetoone
   console.log(this.loggedInUser);
    //this.chatService.sendMessage({text : this.txtMessage, sendTo : this.username, sentBy :this.loggedInUser});
    
    this.chatService.sendGroupMessage({text : this.txtMessage, sendTo : this.username, sentBy :this.loggedInUser, groupId: this.groupId, loggedInUserId : this.loggedInUserId});
    this.txtMessage='';
   
    if(this.role<=2){
      //Broadcast
    }else{
      //send message
    }
  }
}
