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

  ngOnInit() {
    debugger;
    this.socket.connect();

    let name = `User-${new Date().getTime()}`;
    this.currentUser = name;

    this.socket.emit("username", name);

    this.socket.fromEvent("username").subscribe((data) => {
      let user = data["user"];
      if (data["event"] === "left") {
        let userIndex = this.userList.indexOf(user);
        if (userIndex > -1) {
          this.userList.splice(userIndex, 1);
        }
        this.showToast("User left: " + user);
      } else {
        this.userList.push(user);
        this.showToast("User joined: " + user);
      }
    });

    this.socket.fromEvent("chat_message").subscribe((msg) => {
      console.log("New: ", msg);
      this.messages.push(msg);
    });
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
