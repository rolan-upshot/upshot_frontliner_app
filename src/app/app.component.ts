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

  ngOnInit() { }
}


