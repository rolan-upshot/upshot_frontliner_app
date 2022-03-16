import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginService} from "../login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  checking: boolean = false;

  constructor(private modalService: NgbModal, private loginService:LoginService, private router:Router) {}
  ngOnInit(): void {
  }

  get_directory_status(): string{
    if (this.loginService.directory_is_ok()){
      return "<span class='good-news'>Directory:ok</span>";
    }
    else{
      return "<span class='bad-news'>Directory missing</span>";
    }
  }

  disable_submit(): boolean {

    if (this.email == "" || this.password == "") {
      return true;
    }

    if (!this.checking) return false;
    return false;

  }

  async submit() {

    this.loginService.login(this.email, this.password).subscribe(result=>{
      let status = result['result'];
      if (status==="success"){
        let user = result['user'];
        let uuid = result['uuid'];
        this.loginService.set_user(user);
        this.loginService.set_uuid(uuid);
        this.loginService.save_to_local();
        this.router.navigateByUrl("/home")
      }else {
        let details = result['details'];
        console.log(`Login error: ${details}`);
      }
    }, error=>{
      console.log(`Login Problem: ${error.statusText}`);
    })

  }


}
