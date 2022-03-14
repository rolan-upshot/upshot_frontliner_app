import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
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
  role_id: number;
}
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  directory_ok: boolean;
  directory: Array<keyserver>;
  the_server: string;
  uuid:string;
  user: User;

  static directoryServer: string = "http://52.76.215.10/api/directory";

  //static directoryServer: string = "http://localhost:8000/api/directory";

  constructor(private http: HttpClient) {
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
    let url = `http://localhost:8000/api/login`
    return this.http.post(url, body.toString(), options);
  }
  set_uuid(uuid:string){
    this.uuid = uuid;
  }
  set_user(user:any){
    this.user = user;
  }
  save_to_local(){

  }
}
