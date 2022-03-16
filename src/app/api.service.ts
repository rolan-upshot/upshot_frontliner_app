import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  server: string;
  uuid:string;
  base_url: string;


  constructor(private httpClient:HttpClient ) {
    this.server = "";
    this.uuid = "";
    this.base_url = "";
  }

  set_server(server: string){
    this.server = server;
    this.base_url = "http://"+ this.server + "/api/" + this.uuid;
  }
  set_uuid(uuid:string){
    this.uuid = uuid;
    this.base_url = "http://"+ this.server + "/api/" + this.uuid;
  }
  get_fl_journeys(){
     let the_url = this.base_url + "/feedback/frontliner/journeys"
      return this.httpClient.post(the_url, null);
  }
}
