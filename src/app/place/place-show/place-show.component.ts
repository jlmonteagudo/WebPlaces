import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Place } from '../../shared/model/place/place';
import { TdMediaService } from "@covalent/core";

@Component({
  selector: 'place-show',
  templateUrl: './place-show.component.html',
  styleUrls: ['./place-show.component.css']
})
export class PlaceShowComponent implements OnInit {

  place: Place;

  constructor(private route: ActivatedRoute) {
    route.data.subscribe(data => this.place = data['place']);
  }

  ngOnInit() {
  }

}
