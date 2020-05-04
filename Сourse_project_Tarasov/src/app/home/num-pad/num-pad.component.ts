import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-num-pad',
  templateUrl: './num-pad.component.html',
  styleUrls: ['./num-pad.component.css', '../../app.component.css']
})
export class NumPadComponent {

  @Output() onNumPressedClick = new EventEmitter();
  @Output() onConfirmClick = new EventEmitter();
  @Output() onDeleteClick = new EventEmitter();
  @Output() onClearClick = new EventEmitter();

  constructor() {
  }

  numPressed(num) {
    this.onNumPressedClick.emit(num);
  }

  confirm() {
    this.onConfirmClick.emit();
  }

  delete() {
    this.onDeleteClick.emit();
  }

  clear(){
    this.onClearClick.emit();
  }
}
