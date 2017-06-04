import { Component, OnInit, Input, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Marker } from "app/shared/model/marker/marker";
import { MARKER_DEFAULT_CONFIG_PROVIDER } from "environments/map.config";

@Component({
  selector: 'area-form',
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.css']
})
export class AreaFormComponent implements OnInit, OnChanges {

  form:FormGroup;
  marker: Marker;
  
  @Input()
  initialValue:any;

  constructor(private fb:FormBuilder, @Inject(MARKER_DEFAULT_CONFIG_PROVIDER) public markerDefaultConfig: Marker) { 

    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      latitude: [0, Validators.required],
      longitude: [0, Validators.required],
      priority: [0, Validators.required]
    });

    this.setupMarker(markerDefaultConfig.latitude, markerDefaultConfig.longitude, markerDefaultConfig.isDraggable);
    this.form.patchValue({latitude:this.marker.latitude, longitude: this.marker.longitude});

  }

  ngOnInit() {}

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
