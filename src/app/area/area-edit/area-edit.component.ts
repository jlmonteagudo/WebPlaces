import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from "@angular/forms";
import { AreaService } from '../../shared/model/area/area.service';
import { Area } from '../../shared/model/area/area';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { DialogMessageComponent, DialogMessage } from '../../components/html/dialog-message/dialog-message.component';
import { TdMediaService } from '@covalent/core';


@Component({
  selector: 'area-edit',
  templateUrl: './area-edit.component.html',
  styleUrls: ['./area-edit.component.css']
})
export class AreaEditComponent implements OnInit {

  area: Area;

  constructor(private router:Router, private route: ActivatedRoute, private areaService: AreaService, public dialog: MdDialog) { 
    route.data.subscribe(data => this.area = data['area']);
  }

  ngOnInit() {}

  update(form: FormGroup) {
    
    this.area = Object.assign(this.area, form.value);
    this.areaService.update(this.area).subscribe(
      () => {
        this.showDialogMessage(new DialogMessage('primary', 'thumb_up', 'Area updated successfully!'));
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
