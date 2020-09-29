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

  sendMessage(msg: string){
    this.socket.emit("send message", msg);
}

setUserName(userName: string){
  this.socket.emit("set-name", userName);
  this.socket.fromEvent('user-changed').subscribe( (data : any) =>{
    console.log(data);
  } )
}
 getMessage() {
     return this.socket
         .fromEvent("is_online")
         .pipe(map((data : any) =>  data));
}
}
