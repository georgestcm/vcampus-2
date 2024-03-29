import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { ModalController } from '@ionic/angular';
import { EditSchoolModalComponent } from '../edit-school-modal/edit-school-modal.component';
import { TeacherService } from '../teacher-list/teacher.service';
@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.page.html',
  styleUrls: ['./school-list.page.scss'],
})
export class SchoolListPage implements OnInit {

  constructor(private _auth : AuthService,private teacherService : TeacherService, private modalController : ModalController) { }
  schoolList : any;
  showLoading : boolean = false;

  ngOnInit() {
    this.getAllSchools();
  }
  getAllSchools(){
    this.showLoading = true;
    this._auth.getAllSchoolsForAdmin().subscribe(res => {
      console.log(res);
      this.schoolList = res;
      this.showLoading = false;
    },err =>{
      console.log(err);
      this.showLoading = false;
    })
  }

  async onClickDelete(school){
    if(confirm("Are you want to delete this school?")){
      this.showLoading =true;
      this.teacherService.deleteUserPermanent(school._id).subscribe((data) =>{
        alert("School deleted successfully.")
        this.getAllSchools();
        this.showLoading =false;
      },err =>{
        this.showLoading =false;
      });
    }
    
  }

  async onClickEdit(school){
    const modal = await this.modalController.create({
      component: EditSchoolModalComponent,
      componentProps : {"schoolData":school}
    });

    modal.onDidDismiss().then(data => {
      this.getAllSchools();
    });
    return await modal.present();
  }
}
