import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.css']
})
export class DialogMessageComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<DialogMessageComponent>, @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}


export class DialogMessage {
  constructor(public iconColor: string, public iconName: string, public message: string) {}
}

