import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

const mediaConstraints ={
  audio : true,
  video : { width : 720, height : 400}
}
@Component({
  selector: 'app-online-class',
  templateUrl: './online-class.page.html',
  styleUrls: ['./online-class.page.scss'],
})
export class OnlineClassPage implements AfterViewInit {

  private localStream : MediaStream;
  @ViewChild('local_video',null) localVideo : ElementRef;
  
  constructor() { }

  ngAfterViewInit() {
    this.requestMediaDevice();
  }

 private async requestMediaDevice(): Promise<void>{
    this.localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
    //this.localVideo.nativeElement.srcObject = this.localStream;
   // this.muteLocalVideo();
   this.pauseLocalVideo();
  }

  muteLocalVideo():void{
    this.localStream.getTracks().forEach(track =>{
      track.enabled =false;
    });
    this.localVideo.nativeElement.srcObject = undefined;
  }

  pauseLocalVideo():void{
    this.localStream.getTracks().forEach(track =>{
      track.enabled =false;
    })
    this.localVideo.nativeElement.srcObject =undefined;
  }

  startLocalVideo():void{
    this.localStream.getTracks().forEach(track =>{
      track.enabled =true;
    });
    this.localVideo.nativeElement.srcObject = this.localStream;
  }

}
