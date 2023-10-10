import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { UnitsResponse } from '../types/units-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

  constructor(private http : HttpClient) { }


  readonly urlApi =  'https://test-frontend-developer.s3.amazonaws.com/data/locations.json';

  getAllUnits():Observable<UnitsResponse>{
    return this.http.get<UnitsResponse>(this.urlApi);
  }
}
