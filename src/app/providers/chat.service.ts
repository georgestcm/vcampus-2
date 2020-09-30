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

setUserName(userName: string){
  this.socket.emit("set-name", userName);
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
