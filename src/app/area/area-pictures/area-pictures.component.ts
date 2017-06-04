import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AreaService } from '../../shared/model/area/area.service';
import { Area } from '../../shared/model/area/area';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { DialogMessageComponent, DialogMessage } from '../../components/html/dialog-message/dialog-message.component';
import { TdMediaService } from '@covalent/core';


@Component({
  selector: 'area-pictures',
  templateUrl: './area-pictures.component.html',
  styleUrls: ['./area-pictures.component.css']
})
export class AreaPicturesComponent implements OnInit {

  area: Area;
  enableUpload: boolean = true;

  constructor(private router:Router, private route: ActivatedRoute, private areaService: AreaService, public dialog: MdDialog) { 
    route.data.subscribe(data => this.area = data['area']);
  }

  ngOnInit() {
  }

  enableUploadMorePictures() {
    this.enableUpload = true;
  }

  uploadFiles(files) {
    this.areaService.uploadImages(this.area, files);
    this.enableUpload = false;
  }

  cancel() {
    this.router.navigate(['areas']);
  }

  showDialogMessage(dialogMessage: DialogMessage) {

    let config: MdDialogConfig = {
      disableClose: true,
      data: dialogMessage
    }

    let dialogRef: MdDialogRef<DialogMessageComponent> = this.dialog.open(DialogMessageComponent, config);

  }

}
