import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-language-select',
  templateUrl: './language-select.page.html',
  styleUrls: ['./language-select.page.scss'],
})
export class LanguageSelectPage implements OnInit {

  constructor(public translate: TranslateService,
  private storage: Storage) { }

  ngOnInit() {
  }


changeToEnglish(){
  this.storage.set('language', 'en');
  this.translate.use('en')
  this.storage.get('language').then((val) => {
  this.translate.use(val)
  console.log(val)
});

}

changeToFrench(){
  this.storage.set('language', 'fr');
  this.translate.use('fr')
  this.storage.get('language').then((val) => {
  this.translate.use(val)
  console.log(val)
});
}
}
