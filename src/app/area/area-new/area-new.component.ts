import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from "@angular/forms";
import { AreaService } from '../../shared/model/area/area.service';
import { Area } from '../../shared/model/area/area';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { DialogMessageComponent, DialogMessage } from '../../components/html/dialog-message/dialog-message.component';
import { TdMediaService, TdDialogService } from '@covalent/core';

@Component({
  selector: 'area-new',
  templateUrl: './area-new.component.html',
  styleUrls: ['./area-new.component.css']
})
export class AreaNewComponent implements OnInit {

  constructor(private router:Router, private areaService: AreaService, public dialog: MdDialog, private dialogService: TdDialogService, private viewContainerRef: ViewContainerRef) {}

  ngOnInit() {}

  save(form: FormGroup) {

    let area: Area = Area.fromJSON(form.value);
    this.areaService.create(area).subscribe(
      () => {
        this.showDialogMessage(new DialogMessage('primary', 'thumb_up', 'Area saved successfully!'));
        this.router.navigate(['areas'])
      },
      err => this.showDialogMessage(new DialogMessage('warn', 'thumb_down', err))
    );

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
