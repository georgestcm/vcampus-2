import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VideoCallService } from 'src/app/services/video-call.service';
import { Message } from 'src/app/types/message';
import {environment} from '../../../environments/environment'
import { MeetingModelComponent } from '../meeting-model/meeting-model.component';
import { ModalController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from "src/app/providers/auth.service";
import { CourseService } from "src/app/providers/common-service/course.service";
import { Storage } from "@ionic/storage";

export const ENV_RTCPeerConfiguration = environment.RTCPeerConfiguration;

const mediaConstraints ={
  audio : true,
  video : { width : 720, height : 420}
}

const offerOptions ={
  offerToReceiveAudio : true,
  offerToReceiveVideo : true
}
@Component({
  selector: 'app-online-class',
  templateUrl: './online-class.page.html',
  styleUrls: ['./online-class.page.scss'],
})
export class OnlineClassPage implements OnInit, AfterViewInit {

  private localStream : MediaStream;
  @ViewChild('local_video',null) localVideo : ElementRef;
  @ViewChild('received_video',null) remoteVideo: ElementRef;
  
  private peerConnection: RTCPeerConnection;

  inCall = false;
  localVideoActive = false;
  url : any;
  showIframe =false;
  meetingList: any;
  schoolList: [];
  courseList: [];
  userId = "";
  meetingModel = {
    school: "",
    course: ""
  };

  constructor(private videoCallService : VideoCallService, 
    private modalController: ModalController,
    public _auth: AuthService,
    private courseService: CourseService,
    private storage : Storage,
    private sanitizer: DomSanitizer) { }
  
    ngOnInit(): void {
     this.storage.get('user').then((val) => {
      this.userId = val._id;
      this.courseService.getSchoolsByTeacherId(this.userId).subscribe(res =>{  
        this.schoolList = res;
      }, err => {
        console.log(err);
      })
    }); 
  }

  onstartmeeting(id){
    const theTop=((screen.height/2)-(100/2))/2;
    const theLeft=(screen.width/2)-(500/2);
    const features = 'height=600,width=1000,top='+theTop+',left=200,titlebar=no,toolbar=0,Location=no,Directories=0,Status=0,menubar=0,Scrollbars=1,Resizable=1';
    window.open('https://desolate-dawn-06624.herokuapp.com/?room='+id,'_blank', features);
  }
 
  async showMeetingModal() {
    const modal = await this.modalController.create({
      component: MeetingModelComponent
    });
    modal.onDidDismiss().then((data : any) => {
      if(data !=null){
      // this.showIframe =true;
      // this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
      //   'https://desolate-dawn-06624.herokuapp.com/?room='+data.id
      // );
      }
    });
    return await modal.present();
  }

  onSchoolChange(schoolId) {
    this.courseService.getCourseBySchoolId(schoolId).subscribe(
      (res) => {
        console.log(res);
        this.courseList = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onCourseChange(courseId) {
    
    this.courseService.getMeetingByCourse(courseId).subscribe(
      (data) => {
        console.log(data);
        this.meetingList = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }


  //************************************************************** */


  // ngAfterViewInit() {
  //   this.requestMediaDevice();
  // }

//  private async requestMediaDevice(): Promise<void>{
//     this.localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
//     //this.localVideo.nativeElement.srcObject = this.localStream;
//    // this.muteLocalVideo();
//    this.pauseLocalVideo();
//   }

//   muteLocalVideo():void{
//     this.localStream.getTracks().forEach(track =>{
//       track.enabled =false;
//     });
//     this.localVideo.nativeElement.srcObject = undefined;
//   }

//   pauseLocalVideo():void{
//     this.localStream.getTracks().forEach(track =>{
//       track.enabled =false;
//     })
//     this.localVideo.nativeElement.srcObject =undefined;
//   }

//   startLocalVideo():void{
//     this.localStream.getTracks().forEach(track =>{
//       track.enabled =true;
//     });
//     this.localVideo.nativeElement.srcObject = this.localStream;
//   }

async call(): Promise<void> {
  this.createPeerConnection();

  // Add the tracks from the local stream to the RTCPeerConnection
  this.localStream.getTracks().forEach(
    track => this.peerConnection.addTrack(track, this.localStream)
  );

  try {
    const offer: RTCSessionDescriptionInit = await this.peerConnection.createOffer(offerOptions);
    // Establish the offer as the local peer's current description.
    await this.peerConnection.setLocalDescription(offer);

    this.inCall = true;

    this.videoCallService.sendMessage({type: 'offer', data: offer});
  } catch (err) {
    this.handleGetUserMediaError(err);
  }
}

hangUp(): void {
  this.videoCallService.sendMessage({type: 'hangup', data: ''});
  this.closeVideoCall();
}

ngAfterViewInit(): void {
  //this.addIncominMessageHandler();
  //this.requestMediaDevices();
  //this.startLocalVideo();
}

private addIncominMessageHandler(): void {
  this.videoCallService.connect();

  // this.transactions$.subscribe();
  this.videoCallService.messages$.subscribe(
    msg => {
      // console.log('Received message: ' + msg.type);
      switch (msg.type) {
        case 'offer':
          this.handleOfferMessage(msg.data);
          break;
        case 'answer':
          this.handleAnswerMessage(msg.data);
          break;
        case 'hangup':
          this.handleHangupMessage(msg);
          break;
        case 'ice-candidate':
          this.handleICECandidateMessage(msg.data);
          break;
        default:
          console.log('unknown message of type ' + msg.type);
      }
    },
    error => console.log(error)
  );
}

/* ########################  MESSAGE HANDLER  ################################## */

private handleOfferMessage(msg: RTCSessionDescriptionInit): void {
  console.log('handle incoming offer');
  if (!this.peerConnection) {
    this.createPeerConnection();
  }

  if (!this.localStream) {
    this.startLocalVideo();
  }

  this.peerConnection.setRemoteDescription(new RTCSessionDescription(msg))
    .then(() => {

      // add media stream to local video
      this.localVideo.nativeElement.srcObject = this.localStream;

      // add media tracks to remote connection
      this.localStream.getTracks().forEach(
        track => this.peerConnection.addTrack(track, this.localStream)
      );

    }).then(() => {

    // Build SDP for answer message
    return this.peerConnection.createAnswer();

  }).then((answer) => {

    // Set local SDP
    return this.peerConnection.setLocalDescription(answer);

  }).then(() => {

    // Send local SDP to remote party
    this.videoCallService.sendMessage({type: 'answer', data: this.peerConnection.localDescription});

    this.inCall = true;

  }).catch(this.handleGetUserMediaError);
}

private handleAnswerMessage(msg: RTCSessionDescriptionInit): void {
  console.log('handle incoming answer');
  this.peerConnection.setRemoteDescription(msg);
}

private handleHangupMessage(msg: Message): void {
  console.log(msg);
  this.closeVideoCall();
}

private handleICECandidateMessage(msg: RTCIceCandidate): void {
  const candidate = new RTCIceCandidate(msg);
  this.peerConnection.addIceCandidate(candidate).catch(this.reportError);
}

private async requestMediaDevices(): Promise<void> {
  try {
    this.localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
    // pause all tracks
    this.pauseLocalVideo();
  } catch (e) {
    console.error(e);
    alert(`getUserMedia() error: ${e.name}`);
  }
}

startLocalVideo(): void {
  console.log('starting local stream');
  this.localStream.getTracks().forEach(track => {
    track.enabled = true;
  });
  this.localVideo.nativeElement.srcObject = this.localStream;

  this.localVideoActive = true;
}

pauseLocalVideo(): void {
  console.log('pause local stream');
  this.localStream.getTracks().forEach(track => {
    track.enabled = false;
  });
  this.localVideo.nativeElement.srcObject = undefined;

  this.localVideoActive = false;
}

private createPeerConnection(): void {
  console.log('creating PeerConnection...');
  this.peerConnection = new RTCPeerConnection(ENV_RTCPeerConfiguration);

  this.peerConnection.onicecandidate = this.handleICECandidateEvent;
  this.peerConnection.oniceconnectionstatechange = this.handleICEConnectionStateChangeEvent;
  this.peerConnection.onsignalingstatechange = this.handleSignalingStateChangeEvent;
  this.peerConnection.ontrack = this.handleTrackEvent;
}

private closeVideoCall(): void {
  console.log('Closing call');

  if (this.peerConnection) {
    console.log('--> Closing the peer connection');

    this.peerConnection.ontrack = null;
    this.peerConnection.onicecandidate = null;
    this.peerConnection.oniceconnectionstatechange = null;
    this.peerConnection.onsignalingstatechange = null;

    // Stop all transceivers on the connection
    this.peerConnection.getTransceivers().forEach(transceiver => {
      transceiver.stop();
    });

    // Close the peer connection
    this.peerConnection.close();
    this.peerConnection = null;

    this.inCall = false;
  }
}

/* ########################  ERROR HANDLER  ################################## */
private handleGetUserMediaError(e: Error): void {
  switch (e.name) {
    case 'NotFoundError':
      alert('Unable to open your call because no camera and/or microphone were found.');
      break;
    case 'SecurityError':
    case 'PermissionDeniedError':
      // Do nothing; this is the same as the user canceling the call.
      break;
    default:
      console.log(e);
      alert('Error opening your camera and/or microphone: ' + e.message);
      break;
  }

  this.closeVideoCall();
}

private reportError = (e: Error) => {
  console.log('got Error: ' + e.name);
  console.log(e);
}

/* ########################  EVENT HANDLER  ################################## */
private handleICECandidateEvent = (event: RTCPeerConnectionIceEvent) => {
  console.log(event);
  if (event.candidate) {
    this.videoCallService.sendMessage({
      type: 'ice-candidate',
      data: event.candidate
    });
  }
}

private handleICEConnectionStateChangeEvent = (event: Event) => {
  console.log(event);
  switch (this.peerConnection.iceConnectionState) {
    case 'closed':
    case 'failed':
    case 'disconnected':
      this.closeVideoCall();
      break;
  }
}

private handleSignalingStateChangeEvent = (event: Event) => {
  console.log(event);
  switch (this.peerConnection.signalingState) {
    case 'closed':
      this.closeVideoCall();
      break;
  }
}

private handleTrackEvent = (event: RTCTrackEvent) => {
  console.log(event);
  this.remoteVideo.nativeElement.srcObject = event.streams[0];
}

}
