import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { TdMediaService } from "@covalent/core";

@Component({
  selector: 'area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit, AfterViewInit {

  constructor(public router:Router, public media: TdMediaService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.media.broadcast();
  }
  

}
