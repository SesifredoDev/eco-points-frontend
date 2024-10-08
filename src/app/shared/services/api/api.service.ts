import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  buses: Subject<any[]> = new Subject();
  trains: Subject<any[]> = new Subject();
  bike: Subject<any[]> = new Subject();


  getBuses(){
    this.httpClient.get('https://api.jackcooper.me/hackathon/bus').subscribe(data => {
      console.log(data);
      this.buses.next(data as any[]);
    })
  }
  getRails(){
    this.httpClient.get('https://api.jackcooper.me/hackathon/rail').subscribe(data => {
      console.log(data);
      this.trains.next(data as any[]);``
    })
  }

  getBike(){
    this.httpClient.get('https://api.jackcooper.me/hackathon/bike').subscribe(data => {
      console.log(data);

      this.bike.next(data as any[]);
    })
  }

  getBusObservable(){
    return this.buses;
  }

  getTrainObservable(){
    return this.trains;
  }
  getBikeObservable(){
    return this.bike;
  }
  
}
