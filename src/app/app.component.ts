import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginService} from "./login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'upshot-frontliner';
  email: string = "";
  password: string = "";
  checking: boolean = false;

  constructor(private modalService: NgbModal, private loginService:LoginService) {
  }

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

  submit() {

    this.loginService.login(this.email, this.password);

  }
}


