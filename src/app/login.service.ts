import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {ApiService} from "./api.service";

type login_result = {
  status: number;
  message: string;
}

type keyserver = {
  key: string;
  server: string;
}
type User = null | {
  first_name: string;
  middle_name: string;
  last_name : string;
  role_id: string ;
}
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  directory_ok: boolean;
  directory: Array<keyserver>;
  the_server: null|string;
  uuid:null|string;
  user: null| User;

  static directoryServer: string = "http://52.76.215.10/api/directory";

  //static directoryServer: string = "http://localhost:8000/api/directory";

  constructor(private http: HttpClient, private apiService:ApiService) {
    this.the_server = "";
    this.directory_ok = false;
    this.directory = [];
    this.getDirectoryInformation();
    this.uuid = "";
    this.user = null;
  }

  directory_is_ok(): boolean {
    return this.directory_ok;
  }

  getDirectoryInformation() {
    //const headers = { 'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin', 'Access-Control-Allow-Origin': 'localhost:4200'}
    this.http.get(LoginService.directoryServer).subscribe(data => {
      // @ts-ignore
      this.directory = JSON.parse(data['result']);
      this.directory_ok = true;
      //this.directory is now an array of {"key":"X", "value":"Y"} objects
    }, error => {
      console.log(error.statusText)
    })
  }

  login(email: string, password: string): Observable<any> {
    // first get the string after the @ sign.
    let key = email.split('@')[1]
    console.log(`key is ${key}`);
    /*
     We iterate over the directory until we match the key with one of the keyserver keys.
     */
    for (let i: number = 0; i < this.directory.length; i++) {
      let obj: keyserver = this.directory[i];
      let obj_key = obj['key'];
      let obj_server = obj['server'];
      console.log(`${obj_key}: ${obj_server}`);
      if (key === obj_key) {
        this.the_server = obj_server;
        this.apiService.set_server(this.the_server);
        break;
      }
    }
    console.log(`Use server: ${this.the_server}.`)
    // We have email and password. We have server. Let's login.
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    let body = new URLSearchParams();
    body.set('email', email);
    body.set('passwd', password);
    // let url = `http://localhost:8000/api/login`
    let url = "http://" +  this.the_server + "/api/login"
    return this.http.post(url, body.toString(), options);
  }
  set_uuid(uuid:string){
    this.uuid = uuid;
    this.apiService.set_uuid(this.uuid);
  }
  set_user(user:User){
    this.user = user;

  }
  get_user_name(){
    let fname = this.user?.first_name || " "
    let lname = this.user?.last_name || " "
    return  this.user? `` :`${fname} ${lname}`;
  }
  save_to_local(){
    localStorage.setItem("uuid", this.uuid?this.uuid:"")
    localStorage.setItem("the_server", this.the_server?this.the_server:"");
    localStorage.setItem("fname", this.user?.first_name || " "  )
    localStorage.setItem("mname", this.user?.middle_name|| " "  )
    localStorage.setItem("lname", this.user?.last_name || " "  )
    localStorage.setItem("role_id", this.user?.role_id || " "  )

  }
  clear_local(){
    localStorage.clear();
  }
  has_logged_in(){
    let uuid = localStorage.getItem("uuid")
    return uuid !== null;
  }

  load_from_local(){
    let uuid = localStorage.getItem("uuid");
    this.uuid = uuid? uuid: ""
    this.apiService.set_uuid(this.uuid);

    let the_server = localStorage.getItem("the_server");
    this.the_server = the_server? the_server: "";
    this.apiService.set_server(this.the_server);

    let fname = localStorage.getItem("fname" )
    let mname = localStorage.getItem("mname" )
    let lname = localStorage.getItem("lname" )
    let role_id = localStorage.getItem("role_id" )
    this.user = {
      first_name: fname? fname: "",
      middle_name: mname? mname: "",
      last_name: lname? lname: " ",
      role_id: role_id? role_id: "1"

    }

  }
}
