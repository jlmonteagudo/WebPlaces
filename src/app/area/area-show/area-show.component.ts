import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Area } from '../../shared/model/area/area';
import { TdMediaService } from '@covalent/core';

@Component({
  selector: 'area-show',
  templateUrl: './area-show.component.html',
  styleUrls: ['./area-show.component.css']
})
export class AreaShowComponent implements OnInit {

  area: Area;

  constructor(private route: ActivatedRoute) {
    route.data.subscribe(data => this.area = data['area']);
  }

  ngOnInit() {
  }

}
