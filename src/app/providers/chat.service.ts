import { Injectable, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnInit {

  constructor(private socket: Socket) { }
 
  ngOnInit(): void {
    //this.socket.connect();
  }

  sendMessage(msg: any){
    this.socket.emit("send-message", msg);
    //  this.socket.fromEvent('message').subscribe((data : any) => {
    //   console.log(data);
    //   //return data;
    // });
}

sendGroupMessage(msg: any){
  this.socket.emit("send-group-message", msg);
}

setUserName(userName: string){
  this.socket.emit("set-name", userName);
  this.socket.fromEvent('user-changed').subscribe( (data : any) =>{
    console.log(data);
  });
}

setGroupUser(groupName: string){
  this.socket.emit("group-join", groupName);
  this.socket.fromEvent('user-changed').subscribe( (data : any) =>{
    console.log(data);
  });
}
 getMessage() {
     return this.socket
         .fromEvent("message")
         .pipe(map((data : any) =>  data));
}
}
