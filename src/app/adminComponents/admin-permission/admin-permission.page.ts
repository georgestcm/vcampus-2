import { Component, OnInit } from '@angular/core';
import { AddSchoolPage } from 'src/app/components/add-school/add-school.page';
import { AddStaffPage } from 'src/app/components/add-staff/add-staff.page';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AddCurriculumPage } from 'src/app/components/add-curriculum/add-curriculum.page'
import { AddSchoolStaffPage } from 'src/app/components/add-school-staff/add-school-staff.page'
import { AddTeacherPage } from 'src/app/components/add-teacher/add-teacher.page'
@Component({
  selector: 'app-admin-permission',
  templateUrl: './admin-permission.page.html',
  styleUrls: ['./admin-permission.page.scss'],
})
export class AdminPermissionPage implements OnInit {

  constructor(public modalController: ModalController,
    private storage: Storage) { }

  adminOrNot;
  ngOnInit() {
    this.storage.get('role').then((val) => {
      if (val === 3 || val === 4) {
        this.adminOrNot = true;
      } else {
        this.adminOrNot = false;
        console.log('not seen')
      }
    });
  }

  async addSchoolAdmin() {
    const modal = await this.modalController.create({
      component: AddSchoolPage
    });
    return await modal.present();
  }

  async addStaffAdmin() {
    const modal = await this.modalController.create({
      component: AddStaffPage
    });
    return await modal.present();
  }

  async addCurriculum() {
    const modal = await this.modalController.create({
      component: AddCurriculumPage
    });
    return await modal.present();
  }

  async addTeacher() {
    const modal = await this.modalController.create({
      component: AddTeacherPage
    });
    return await modal.present();
  }


  async AddStaffSchool() {
    const modal = await this.modalController.create({
      component: AddSchoolStaffPage
    });
    return await modal.present();
  }

}
