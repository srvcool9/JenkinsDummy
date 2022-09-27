import { formatDate } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DataSharingService } from '../../shared/services/data-sharing.service';

@Component({
  selector: 'app-training-test-status',
  templateUrl: './training-test-status.component.html',
  styleUrls: ['./training-test-status.component.scss']
})
export class TrainingTestStatusComponent implements ICellRendererAngularComp {

  params: any;
  todaysDate: any;
  constructor(private router: Router,
    private ngZone: NgZone,
    private dataSharing: DataSharingService) { }

  agInit(params: any): void {
    this.params = params;
    this.todaysDate = new Date();
    var scheduledDate = this.dateFormatterYYYY(this.params.data.scheduledDate);
    this.dateFormatter(this.todaysDate);
    var today = new Date(this.todaysDate);
    var scheduled = new Date(scheduledDate);
    if (today.getTime() > scheduled.getTime()) {
      this.params.data.status = 'Expired'
    } else {
      this.params.data.status = 'Incomplete'
    }

  }

  dateFormatter(date: Date) {
    const format = 'dd-MM-yyyy';
    const locale = 'en-US';
    return formatDate(date, format, locale);
  }

  dateFormatterYYYY(date: any) {
    let formatedDate;
    if (typeof (date) === "string") {
      const [day, month, year] = date.split('-');
      formatedDate = new Date(+year, +month - 1, +day);
    }
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    return formatedDate ? formatDate(formatedDate, format, locale) : formatDate(date, format, locale);

  }


  refresh(params?: any): boolean {
    return true;
  }



}
