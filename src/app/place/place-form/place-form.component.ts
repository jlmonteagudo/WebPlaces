import { Component, OnInit, Input, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { AreaService } from '../../shared/model/area/area.service';
import { Area } from '../../shared/model/area/area';
import { Observable } from 'rxjs/Observable'
import { Marker } from "app/shared/model/marker/marker";
import { MARKER_DEFAULT_CONFIG_PROVIDER } from "environments/map.config";

@Component({
  selector: 'place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.css']
})
export class PlaceFormComponent implements OnInit, OnChanges {

  form:FormGroup;
  areas: Area[];
  marker: Marker;
  
  @Input()
  initialValue:any;

  constructor(private fb: FormBuilder, private areaService: AreaService, @Inject(MARKER_DEFAULT_CONFIG_PROVIDER) public markerDefaultConfig: Marker) { 

    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      excerpt: [''],
      latitude: [0, Validators.required],
      longitude: [0, Validators.required],
      address: [''],
      priority: [0, Validators.required],
      areaId: ['', Validators.required],
    });

    this.setupMarker(markerDefaultConfig.latitude, markerDefaultConfig.longitude, markerDefaultConfig.isDraggable);
    this.form.patchValue({latitude:this.marker.latitude, longitude: this.marker.longitude});

  }

  ngOnInit() {
    this.areaService.findAll().subscribe((areas: Area[]) => this.areas = areas);
  }

  ngOnChanges(changes:SimpleChanges) {
    if (changes['initialValue']) {
      this.form.patchValue(changes['initialValue'].currentValue);
      this.setupMarker(this.form.value.latitude, this.form.value.longitude, this.markerDefaultConfig.isDraggable);
    }
  }

  setupMarker(latitude: number, longitude: number, isDraggable: boolean) {
      this.marker = { latitude, longitude, isDraggable }
  }

  dragEnd($event) {
    this.form.patchValue({ latitude: $event.coords.lat, longitude: $event.coords.lng });
  }

}
