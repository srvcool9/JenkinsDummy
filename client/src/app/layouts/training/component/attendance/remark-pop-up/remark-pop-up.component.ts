import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-remark-pop-up',
  templateUrl: './remark-pop-up.component.html',
  styleUrls: ['./remark-pop-up.component.scss'],
})
export class RemarkPopUpComponent implements OnInit {
  changevar: string;
  @Input() id: any;
  @Output() changeIndicator = new EventEmitter<string>();
  @Output() dataLoaded = new EventEmitter<string>();
  @Output() formInputText = new EventEmitter<any>();
  @Output() getId = new EventEmitter<any>();
  @Input() allGroupFromParent: [] = [];
  remarkForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.remarkForm = this.fb.group({
      remark: ['',[Validators.required,Validators.maxLength(50)]],
    });
  }

  get remark(){
    return this.remarkForm.get('remark');
  }

  onaddClick() {
    this.getId.emit(this.id);
    this.formInputText.emit(this.remarkForm.value.remark);
    this.closeModel();
  }

  closeModel() {
    this.changevar = 'cancel';
    this.changeIndicator.emit(this.changevar);
    this.emit();
    this.remarkForm.reset();
  }

  emit() {
    this.dataLoaded.emit('RemarkPopUpComponent');
  }
}
