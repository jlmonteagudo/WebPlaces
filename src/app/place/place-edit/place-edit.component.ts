import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from "@angular/forms";
import { PlaceService } from '../../shared/model/place/place.service';
import { Place } from '../../shared/model/place/place';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { DialogMessageComponent, DialogMessage } from '../../components/html/dialog-message/dialog-message.component';
import { TdMediaService } from "@covalent/core";


@Component({
  selector: 'place-edit',
  templateUrl: './place-edit.component.html',
  styleUrls: ['./place-edit.component.css']
})
export class PlaceEditComponent implements OnInit {

  place: Place;

  constructor(private router:Router, private route: ActivatedRoute, private placeService: PlaceService, public dialog: MdDialog) { 
    route.data.subscribe(data => this.place = data['place']);
  }

  ngOnInit() {}

  update(form: FormGroup) {
    
    this.place = Object.assign(this.place, form.value);
    this.placeService.update(this.place).subscribe(
      () => {
        this.showDialogMessage(new DialogMessage('primary', 'thumb_up', 'Place updated successfully!'));
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
