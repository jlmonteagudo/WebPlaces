import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Place } from "./place";
import { Observable } from "rxjs/Observable";
import { PlaceService } from "./place.service";


@Injectable()
export class PlaceResolver implements Resolve<Place> {


    constructor(private placeService: PlaceService) {}

    resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<Place> {
        return this.placeService.find(route.params['id']).first();
    }

}
