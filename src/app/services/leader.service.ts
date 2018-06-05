import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Http, Response } from '@angular/http';


import { Observable } from 'rxjs/Observable';

import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';


@Injectable()
export class LeaderService {

  constructor(private http: Http,
  private processHttpmsgService: ProcessHttpmsgService) { }
  
  getLeaders(): Observable<Leader[]> {
    return this.http.get(baseURL + 'leaders')
                    .map(res => { return this.processHttpmsgService.extractData(res); });
  }

  getLeader(id: number): Observable<Leader>{
  	return  this.http.get(baseURL + 'leaders/'+ id)
                    .map(res => { return this.processHttpmsgService.extractData(res); });
  }

  getFeaturedLeader(): Observable<Leader>{
  	return this.http.get(baseURL + 'leaders?featured=true')
                    .map(res => { return this.processHttpmsgService.extractData(res)[0]; });
  }

}