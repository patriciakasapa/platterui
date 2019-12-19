import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { LoginComponent } from '../login/login.component';
import { HomeService } from '../home.service';
import { ToasterServiceService } from '../services/toaster-service.service';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';


// const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
//   'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
//   'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
//   'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
//   'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
//   'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
//   'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
//   'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit { 
  weather:object  = {} 

  mapUrl = "https://maps.google.com/maps?q="+ this.weather["name"] +"&t=k&z=13&ie=UTF8&iwloc=&output=embed";

  constructor(private service:HomeService, private toasterService: ToasterServiceService) {   }

  name:string;
  weatherStatus: string;
  msg:string = "Raining @ " + name; 

  ngOnInit() {
    this.service.getData().subscribe(
      result => {
          this.weather = result;
          console.log(result);
        
          this.name = this.weather["name"];
          // this.weatherStatus = this.weather["periods[0]"["reading"["weatherType"]]];
          // this.weatherStatus = this.weather[name];
          console.log("herreeee " + this.name); 
      },
      error => { console.log(error); }
    ).unsubscribe;

    this.hide();
    LoginComponent.loggedIn;
    this.Info(this.msg);
  }
  
   private hide() {
     AppComponent.isHidden = false;
  }
  Info(msg: string){
    this.toasterService.Info("Info", msg);
  } 

  // model: any;

  // @ViewChild('instance', {static: true}) instance: NgbTypeahead;
  // focus$ = new Subject<string>();
  // click$ = new Subject<string>();

  // search = (text$: Observable<string>) => {
  //   const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
  //   const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
  //   const inputFocus$ = this.focus$;

  //   return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
  //     map(term => (term === '' ? states
  //       : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
  //   );
  // }
  
  
}
