import { Component, OnInit } from '@angular/core';
import {LoginService} from "../login.service";
import {ApiService} from "../api.service";

type Journey = {
  id : string,
  manager: string,
  date: string,
  prep_or_spot_id: number
  cor_or_pos: number
  topics : string
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name : string;
  journeys: Array<Journey>
  selected_journey: null | Journey;
  show: boolean = false;

  constructor(private loginService:LoginService, private apiService:ApiService) {
    this.name = loginService.get_user_name();
    this.journeys = [];
    this.selected_journey = null;
  }

  ngOnInit(): void {
    this.apiService.get_fl_journeys().subscribe(result=>{
      // @ts-ignore
      let journeys:Array<Journey> = result['details'];
      for(let i=0; i< journeys.length; i++){
        let journey:Journey = journeys[i];
        this.journeys.push(journey)
      }
      console.log(this.journeys)
      this.show = true;
    })
  }
  sel_journey(j: Journey){
    this.selected_journey = j;
  }
  journey_as_string(j:null|Journey): string{
    if (j===null){
      return "Choose a journey"
    }
    return j.id + ":" + j.date + "--" + j.manager +":" +  j.topics[0]
  }
}
