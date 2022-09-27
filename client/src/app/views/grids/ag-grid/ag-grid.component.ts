import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.scss'],
})
export class AgGridComponent implements OnInit {
  
  columnDefs = [
    {
     headerName:"Date",
     field: 'date',
     sortable:true,
     filter:true,
  },
    { 
      headerName:"Country",
      field: 'country',
      sortable:true,
     filter:true
     },
    { 
      headerName:"Price",
      field: 'price',
     sortable:true,
    },
    { 
      headerName:"Change",
      field: 'change',
     sortable:true,
    },
    { 
      headerName:"Product",
      field: 'product',
     sortable:true,
     width:150
    }
];

rowData = [
    { 
      date: '01/25/2022', 
      country: 'Greece', 
      price: 5276.35,
      change : '$11.64',
      product : 'Gadget'
     },
    { 
      date: '01/25/2022',
      country: 'France',
      price: 5276.35 ,
      change : '$11.64',
      product : 'Gadget'},
    { 
      date: '01/25/2022',
      country: 'India',
      price: 5276.35,
      change : '$11.64',
      product : 'Gadget'
    },
    { 
      date: '01/25/2022', 
      country: 'Japan', 
      price: 5276.35,
      change : '$11.64',
      product : 'Gadget'
     },
    { 
      date: '01/25/2022',
      country: 'Greece',
      price: 5276.35,
      change : '$11.64',
      product : 'Gadget'},
    { 
      date: '01/25/2022',
      country: 'France',
      price: 5276.35,
      change : '$11.64',
      product : 'Gadget'
    }
];


  constructor(private translate: TranslateService) {
    
  }

  ngOnInit(): void {}
}
