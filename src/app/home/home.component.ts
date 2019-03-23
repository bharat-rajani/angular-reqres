import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users: Object;
  showSpinner: boolean = true;
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getusers().subscribe(data => {
      this.users = data;
      this.showSpinner = false;
      console.log(data);
    })
  }

}
