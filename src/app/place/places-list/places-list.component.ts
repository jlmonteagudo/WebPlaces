import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PlaceService } from '../../shared/model/place/place.service';
import { AreaService } from '../../shared/model/area/area.service';
import { Place } from '../../shared/model/place/place';
import { Area } from '../../shared/model/area/area';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { DialogMessageComponent, DialogMessage } from '../../components/html/dialog-message/dialog-message.component';
import { TdMediaService, TdDialogService } from "@covalent/core";
import { PlaceStateService } from "app/shared/model/place/place.state.service";

@Component({
  selector: 'places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.css']
})
export class PlacesListComponent implements OnInit {

  places$: Observable<Place[]>;
  areas$: Observable<Area[]>;
  selectedAreaId: string;

  constructor(private placeService: PlaceService, private placeStateService: PlaceStateService, private areaService: AreaService, public dialog: MdDialog, private dialogService: TdDialogService, private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    
    this.areas$ = this.areaService.findAll();

    this.selectedAreaId = this.placeStateService.selectedAreaId;
    this.selectedAreaId ? this.filterByArea({value: this.selectedAreaId}) : this.places$ = this.placeService.findAll();
    
  }


  delete(place: Place) {

    this.confirmDeletion(place).subscribe((accept: boolean) => {

      if (!accept) return;

      this.placeService.delete(place).subscribe(
        () => this.showDialogMessage(new DialogMessage('primary', 'thumb_up', 'Place deleted successfully!')),
        err => this.showDialogMessage(new DialogMessage('warn', 'thumb_down', err))
      );

    });

  }

  confirmDeletion(place: Place) {

    return this.dialogService.openConfirm({
      message: `Place '${place.title}' is going to be deleted. Do you agree?`,
      disableClose: true,
      viewContainerRef: this.viewContainerRef,
      title: 'Confirm',
      cancelButton: 'Disagree',
      acceptButton: 'Agree'
    }).afterClosed();

  }

  filterByArea(event) {
    this.placeStateService.selectedAreaId = event.value;
    this.places$ = this.placeService.findByArea(event.value);
  }

  showDialogMessage(dialogMessage: DialogMessage) {

    let config: MdDialogConfig = {
      disableClose: true,
      data: dialogMessage
    }

    let dialogRef: MdDialogRef<DialogMessageComponent> = this.dialog.open(DialogMessageComponent, config);

  }

}

