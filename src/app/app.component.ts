import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginService} from "./login.service";
import {Router} from "@angular/router";

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
  @HostListener('window:beforeunload')
  goToLogin() {
    this.router.navigateByUrl('/login');
  }
  constructor(private router:Router, private loginService:LoginService) { }
  ngOnInit() {
    if (this.loginService.has_logged_in()){
      this.loginService.load_from_local();
      this.router.navigateByUrl("/home")
    }

  }
}


