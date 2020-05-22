import { Component, OnInit, ViewChild } from "@angular/core";
import { IonContent } from "@ionic/angular";

@Component({
  selector: "app-chat-window.page",
  templateUrl: "./chat-window.page.html",
  styleUrls: ["./chat-window.page.scss"],
})
export class ChatWindowPage implements OnInit {
  messages = [
    {
      user: "max",
      createdAt: 1554090856000,
      msg: "Hey whats up mate?",
    },
    {
      user: "simon",
      createdAt: 1554090956000,
      msg: "Working on the Ionic project, you?",
    },
    {
      user: "max",
      createdAt: 1554091056000,
      msg: "Doing some tutorial stuff.",
    },
    {
      user: "max",
      createdAt: 1554090856000,
      msg: "Hey whats up mate?",
    },
    {
      user: "simon",
      createdAt: 1554090956000,
      msg: "Working on the Ionic project, you?",
    },
    {
      user: "max",
      createdAt: 1554091056000,
      msg: "Doing some tutorial stuff.",
    }
  ];

  currentUser = "simon";
  newMessage = "";

  @ViewChild(IonContent, { static: false }) content: IonContent;
  constructor() {}

  ngOnInit() {}

  sendMessage() {
    this.messages.push({
      user: "simon",
      createdAt: new Date().getDate(),
      msg: this.newMessage,
    });

    this.newMessage = "";
    setTimeout(() => {
      this.content.scrollToBottom(500);
    });
  }
}
