import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';


import {CommonUtilService} from '../../../../utils/common.util.service';
@Component({
  selector: 'app-ag-gridd',
  templateUrl: './ag-gridd.component.html',
  styleUrls: ['./ag-gridd.component.scss'],
  // encapsulation:ViewEncapsulation.None
})
export class AgGriddComponent implements OnInit {
  columnDefs: any;
  gridOptions = <GridOptions>{};
  gridApi:GridApi;
  gridColumnApi:any;

//   columnDefs = [
//     {
//      headerName:"Date",
//      field: 'date',
//      sortable:true,
//      filter:true,
//   },
//     { 
//       headerName:"Country",
//       field: 'country',
//       sortable:true,
//      filter:true
//      },
//     { 
//       headerName:"Price",
//       field: 'price',
//      sortable:true,
//     },
//     { 
//       headerName:"Change",
//       field: 'change',
//      sortable:true,
//     },
//     { 
//       headerName:"Product",
//       field: 'product',
//      sortable:true,
//      width:150
//     }
// ];

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
      product : 'New Gadget'},
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
      product : 'Low Price Gadget'
     },
    { 
      date: '01/25/2022',
      country: 'Greece',
      price: 5276.35,
      change : '$11.64',
      product : 'Gadget'},
      { 
        date: '01/25/2022',
        country: 'Greece',
        price: 5276.35,
        change : '$11.64',
        product : 'Gadget'},
        { 
          date: '01/25/2022',
          country: 'Greece',
          price: 5276.35,
          change : '$11.64',
          product : 'Gadget'},
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
            product : 'Easy Gadget'},
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
              country: 'Greece',
              price: 5276.35,
              change : '$11.64',
              product : 'Gadget'},
              { 
                date: '01/25/2022',
                country: 'Greece',
                price: 5276.35,
                change : '$11.64',
                product : 'Gadget'},
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
                    country: 'Greece',
                    price: 5276.35,
                    change : '$11.64',
                    product : 'Gadget'},
                    { 
                      date: '01/25/2022',
                      country: 'Greece',
                      price: 5276.35,
                      change : '$11.64',
                      product : 'Gadget'}
          
];

types = [10,20,30];

value : any;
defaultColDef:any;

// paginationPageSize:any;
paginationPageSize= 20;
totalRecords =  this.rowData.length;
paramsSelectRecord = {type:'gridReady', api:GridApi, columnApi : ColumnApi}

  constructor(private _commonUtilService : CommonUtilService) {
    this.defaultColDef = this._commonUtilService.getDefaultColumnDef();
    this.gridOptions.defaultColDef = this.defaultColDef;
   }


  ngOnInit(): void {
    this.createColumnDefs();
    
    this.defaultColDef = {
      editable: true,
      sortable: true,
      minWidth: 100,
      filter: true,
      resizable: true,
    };
  }

  onExport(){
    alert("called");
   this.gridApi.exportDataAsCsv();
  }

  callType(value){
   this.onGridReady(this.paramsSelectRecord,value);
  }

  onGridReady(params:any,value:any){
    
    this.gridApi=params.api;
    this.gridColumnApi = params.columnApi;
    if(value!=undefined||value!=null){
      this.paginationPageSize = value;
      this.ngOnInit();
    }
    else{
      this.paginationPageSize = 20;
    }

  }

  createColumnDefs() {
    this.columnDefs = [];
    let header: any;
  
    header = this._commonUtilService.getColumnHeader("date", "Date");
    header.sortable=true;
    header.filter = true;
   
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader("country", "Country");
    header.sortable=true;
    header.filter = true;
  

    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader("price","Price");
    header.sortable=true;
    header.filter = true;
   

    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader("change","Change");
    header.sortable=true;
    header.filter = true;

   
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader("product", "Product");
    header.sortable=true;
    header.filter = true;
    header.width = 300;
    // header.pinned = 'right';
   
    this.columnDefs.push(header);

  }

}
