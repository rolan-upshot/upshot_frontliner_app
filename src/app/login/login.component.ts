import { Component, Injectable, Input, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  checking: boolean = false;


  constructor(private modalService: NgbModal, private http:HttpClient ) {
  }

  dismiss(result: any){
    this.modalService.dismissAll("dismissed")
  }
  submit(){
    console.log(`submit: email:${this.email} password:${this.password}`);
    let data:any =  {
        "email": this.email,
        "password": this.password
    }


  }
  ngOnInit(): void {
  }

  disable_submit(): boolean {

    if (this.email == "" || this.password == ""){
      return true;
    }

    if (!this.checking) return false;
    return false;

  }
}
