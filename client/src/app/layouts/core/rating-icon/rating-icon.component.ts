import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DataSharingService } from '../../shared/services/data-sharing.service';

@Component({
  selector: 'app-rating-icon',
  templateUrl: './rating-icon.component.html',
  styleUrls: ['./rating-icon.component.scss'],
})
export class RatingIconComponent implements ICellRendererAngularComp {
  count = 0;
  exampleCheck1 = 0;
  exampleCheck2 = 0;
  exampleCheck3 = 0;
  exampleCheck4 = 0;
  exampleCheck5 = 0;
  params: any;
  status: any;
  constructor(
    private dataSharingService: DataSharingService
  ) {}

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onRatingClick($event) {
    if (this.params.onRatingClick instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data,
      };
      if (params.rowData.trainer.trainerId) {
        if (params.event.target.id == 'exampleCheck1') {
          this.count = 1;
          this.exampleCheck1 = 1;
          this.exampleCheck2 = 0;
          this.exampleCheck3 = 0;
          this.exampleCheck4 = 0;
          this.exampleCheck5 = 0;
        }
        if (params.event.target.id == 'exampleCheck2') {
          this.count = 2;
          this.exampleCheck1 = 1;
          this.exampleCheck2 = 2;
          this.exampleCheck3 = 0;
          this.exampleCheck4 = 0;
          this.exampleCheck5 = 0;
        }
        if (params.event.target.id == 'exampleCheck3') {
          this.count = 3;
          this.exampleCheck1 = 1;
          this.exampleCheck2 = 2;
          this.exampleCheck3 = 3;
          this.exampleCheck4 = 0;
          this.exampleCheck5 = 0;
        }
        if (params.event.target.id == 'exampleCheck4') {
          this.count = 4;
          this.exampleCheck1 = 1;
          this.exampleCheck2 = 2;
          this.exampleCheck3 = 3;
          this.exampleCheck4 = 4;
          this.exampleCheck5 = 0;
        }
        if (params.event.target.id == 'exampleCheck5') {
          this.count = 5;
          this.exampleCheck1 = 1;
          this.exampleCheck2 = 2;
          this.exampleCheck3 = 3;
          this.exampleCheck4 = 4;
          this.exampleCheck5 = 5;
        }
      }
      this.params.node.data.rating = this.count;
      this.dataSharingService.setGlobalEditData(this.params.node.data);
      this.params.onRatingClick(params);
    }
  }
}
