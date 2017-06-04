import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlaceService } from '../../shared/model/place/place.service';
import { Place } from '../../shared/model/place/place';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { DialogMessageComponent, DialogMessage } from '../../components/html/dialog-message/dialog-message.component';
import { TdMediaService } from "@covalent/core";


@Component({
  selector: 'place-pictures',
  templateUrl: './place-pictures.component.html',
  styleUrls: ['./place-pictures.component.css']
})
export class PlacePicturesComponent implements OnInit {

  place: Place;
  enableUpload: boolean = true;

  constructor(private router:Router, private route: ActivatedRoute, private placeService: PlaceService, public dialog: MdDialog) { 
    route.data.subscribe(data => this.place = data['place']);
  }

  ngOnInit() {
  }

  enableUploadMorePictures() {
    this.enableUpload = true;
  }

  uploadFiles(files) {
    this.placeService.uploadImages(this.place, files);
    this.enableUpload = false;
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
