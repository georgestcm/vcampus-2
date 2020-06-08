import { Component, OnInit } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-group-chat",
  templateUrl: "./group-chat.page.html",
  styleUrls: ["./group-chat.page.scss"],
})
export class GroupChatPage implements OnInit {
  constructor(private socket: Socket, private toastCtrl: ToastController) {}

  currentUser = "";

  userList = [];
  messages = [];
  message = "";

  ngOnInit() {
    this.socket.connect();

    let name = `User-${new Date().getTime()}`;
    this.currentUser = name;

    this.socket.emit("username", name);

    this.socket.fromEvent("is_online").subscribe((message) => {
      
    });

    // this.socket.fromEvent("message").subscribe((msg) => {
    //   console.log("New: ", msg);
    //   this.messages.push(msg);
    // });
  }

  sendMessage() {
    this.socket.emit("send-message", { text: this.message });
    this.message = "";
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }

  async showToast(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      position: "top",
      duration: 2000,
    });
    toast.present();
  }
}
