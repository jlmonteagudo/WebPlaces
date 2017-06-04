import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from "@angular/router";
import { TdMediaService } from "@covalent/core";
import { PlaceStateService } from "app/shared/model/place/place.state.service";

@Component({
  selector: 'place',
  providers: [ PlaceStateService ],
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit, AfterViewInit {

  constructor(public router:Router, public media: TdMediaService) { }

  ngAfterViewInit() {
    this.media.broadcast();
  }

  ngOnInit() {
  }

}
