import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { AreaService } from '../../shared/model/area/area.service';
import { Area } from '../../shared/model/area/area';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { DialogMessageComponent, DialogMessage } from '../../components/html/dialog-message/dialog-message.component';
import { TdDialogService } from "@covalent/core";

@Component({
  selector: 'areas-list',
  templateUrl: './areas-list.component.html',
  styleUrls: ['./areas-list.component.css']
})
export class AreasListComponent implements OnInit {

  areas$: Observable<Area[]>;

  constructor(private areaService: AreaService, public dialog: MdDialog, private dialogService: TdDialogService, private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.areas$ = this.areaService.findAll();
  }

  delete(area: Area) {

    this.confirmDeletion(area).subscribe((accept: boolean) => {

      if (!accept) return;

      this.areaService.delete(area.$key).subscribe(
        () => this.showDialogMessage(new DialogMessage('primary', 'thumb_up', 'Area deleted successfully!')),
        err => this.showDialogMessage(new DialogMessage('warn', 'thumb_down', err))
      );

    });

  }

  private confirmDeletion(area: Area) {

    return this.dialogService.openConfirm({
      message: `Area '${area.title}' is going to be deleted. Do you agree?`,
      disableClose: true,
      viewContainerRef: this.viewContainerRef,
      title: 'Confirm',
      cancelButton: 'Disagree',
      acceptButton: 'Agree'
    }).afterClosed();

  }


  showDialogMessage(dialogMessage: DialogMessage) {

    let config: MdDialogConfig = {
      disableClose: true,
      data: dialogMessage
    }

    let dialogRef: MdDialogRef<DialogMessageComponent> = this.dialog.open(DialogMessageComponent, config);

  }

}

