import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-media-list-modal',
  templateUrl: './media-list-modal.component.html',
  styleUrls: ['./media-list-modal.component.scss'],
})
export class MediaListModalComponent implements OnInit {

  mediaList: Array<any> = [];
  constructor(private modalController : ModalController, private navParams: NavParams) { 
    console.log(navParams.get('mediaList'));
    this.mediaList = navParams.get('mediaList');
  }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
}

copyInputMessage(inputElement){
  alert(inputElement);
  inputElement.select();
  document.execCommand('copy');
  inputElement.setSelectionRange(0, 0);
}

}
