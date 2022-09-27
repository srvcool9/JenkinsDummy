import { Component, OnInit } from '@angular/core';

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  step = 0;
  active0: any;
  true1;
  count = 1;
  tools = [];
  activeIndex = 0;

  constructor(
  ) {}

  ngOnInit(): void {
    this.createDynamic();

    // const dropItems = document.getElementById("drop-items");
    // console.log(dropItems);
    // new Sortable(dropItems, {
    //   animation: 350,
    //   chosenClass: "sortable-chosen",
    //   dragClass: "sortable-drag"
    // });
  }

  createDynamic() {
    for (let i = 0; i < 10; i++) {
      this.tools[i] = {
        id: i,
        day: 'Day ' + (i + 1),
      };
    }
  }

  handleClick(method: string, id: any) {
    switch (method) {
      case method:
        this.activeIndex = id;
        break;
      default:
        console.log('None!');
    }
  }

  setColor(btn) {
    let property = document.getElementById(btn);
    if (this.count == 0) {
      property.style.backgroundColor = '#FFFFFF';
      this.count = 1;
    } else {
      property.style.backgroundColor = '#7FFF00';
      this.count = 0;
    }
  }
}
