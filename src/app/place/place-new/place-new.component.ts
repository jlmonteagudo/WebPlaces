import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from "@angular/forms";
import { PlaceService } from '../../shared/model/place/place.service';
import { Place } from '../../shared/model/place/place';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { DialogMessageComponent, DialogMessage } from '../../components/html/dialog-message/dialog-message.component';
import { TdMediaService } from "@covalent/core";

@Component({
  selector: 'place-new',
  templateUrl: './place-new.component.html',
  styleUrls: ['./place-new.component.css']
})
export class PlaceNewComponent implements OnInit {

  constructor(private router:Router, private placeService: PlaceService, public dialog: MdDialog) {}

  ngOnInit() {}

  save(form: FormGroup) {

    let place: Place = Place.fromJSON(form.value);
    this.placeService.create(place).subscribe(
      () => {
        this.showDialogMessage(new DialogMessage('primary', 'thumb_up', 'Place saved successfully!'));
        this.router.navigate(['places'])
      },
      err => this.showDialogMessage(new DialogMessage('warn', 'thumb_down', err))
    );

  }

  cancel() {
    this.router.navigate(['places']);
  }


  showDialogMessage(dialogMessage: DialogMessage) {

    let config: MdDialogConfig = {
      disableClose: true,
      data: dialogMessage
    }

    let dialogRef: MdDialogRef<DialogMessageComponent> = this.dialog.open(DialogMessageComponent, config);

  }


}
