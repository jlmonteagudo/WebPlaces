import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Area } from "./area";
import { Observable } from "rxjs/Observable";
import { AreaService } from "./area.service";


@Injectable()
export class AreaResolver implements Resolve<Area> {


    constructor(private areaService: AreaService) {}

    resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<Area> {
        return this.areaService.find(route.params['id']).first();
    }

}
