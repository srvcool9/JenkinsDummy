import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-launch-pop-up',
  templateUrl: './launch-pop-up.component.html',
  styleUrls: ['./launch-pop-up.component.scss']
})
export class LaunchPopUpComponent implements OnInit {
  changevar: string;
  statusOn = "on"
  @Input() id: any;
  @Output() changeIndicator = new EventEmitter<string>();
  @Output() dataLoaded = new EventEmitter<string>();
  @Output() status = new EventEmitter<string>();
  @Output() getId = new EventEmitter<number>();
  @Input() allGroupFromParent: [] = [];
  constructor() { }

  ngOnInit(): void {
  }

  onYesClick(){
    this.status.emit(this.statusOn+" "+this.id);
    this.closeModel();
  }

  closeModel(){
    this.changevar = "cancel";
    this.changeIndicator.emit(this.changevar);
    this.emit();
  }

  emit() {
    this.dataLoaded.emit('LaunchPopUpComponent');
  }

}
