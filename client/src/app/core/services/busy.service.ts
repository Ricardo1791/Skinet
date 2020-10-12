import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyrequestcount = 0;

  constructor(private spinnerservice: NgxSpinnerService) { }

  busy(){
    this.busyrequestcount++;
    this.spinnerservice.show(undefined,{
      type: 'pacman',
      bdColor: 'rgba(255,255,255,0.7)',
      color: '#333333',
      size: 'medium'
    });
  }

  idle(){
    this.busyrequestcount--;
    if(this.busyrequestcount <= 0){
      this.busyrequestcount = 0;
      this.spinnerservice.hide();
    }
  }
}
