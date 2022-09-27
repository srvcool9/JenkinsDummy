import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor( private toastr:ToasterService) { }

  ngOnInit(): void {
  }

//   showSuccess(){
//     this.toastr.success('everything is broken', 'Major Error', {
//    timeOut: 3000,
//  });
//    }
//    showError(){
//     this.toastr.error('everything is broken', 'Major Error', {
//    timeOut: 3000,
//  });
//    }
//     showInfo(){
//     this.toastr.info('everything is broken', 'Major Error', {
//    timeOut: 3000,
//  });
//    }
//     showWarning(){
//     this.toastr.warning('everything is broken', 'Major Error', {
//    timeOut: 3000,
//  });
//    }
}
