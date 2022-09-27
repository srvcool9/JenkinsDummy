import { Component, OnInit, ViewChild } from '@angular/core';
// import * as $ from 'jquery';
import * as XLSX from 'xlsx';
declare const $: any;
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  // @ViewChild('dTable',{static:false})dataTable:any;
   fileName= 'ExcelSheet.xlsx';
  public dataa = [
    {
      name: 'Ajay',
      email: 'therichpost@gmail.com',
      website: 'therichpost.com',
    },
    { name: 'Jas', email: 'therichpost@gmail.com', website: 'therichpost.com' },
    {
      name: 'therichpost',
      email: 'therichpost@gmail.com',
      website: 'therichpost.com',
    },
    {
      name: 'therichpost',
      email: 'therichpost@gmail.com',
      website: 'therichpost.com',
    },
    { name: 'Jas', email: 'therichpost@gmail.com', website: 'therichpost.com' },
    {
      name: 'therichpost',
      email: 'therichpost@gmail.com',
      website: 'therichpost.com',
    },
    {
      name: 'therichpost',
      email: 'therichpost@gmail.com',
      website: 'therichpost.com',
    },
    { name: 'Jas', email: 'therichpost@gmail.com', website: 'therichpost.com' },
    {
      name: 'therichpost',
      email: 'therichpost@gmail.com',
      website: 'therichpost.com',
    },
    {
      name: 'therichpost',
      email: 'therichpost@gmail.com',
      website: 'therichpost.com',
    },
    {
      name: 'Ajay',
      email: 'therichpost@gmail.com',
      website: 'therichpost.com',
    },
    { name: 'Jas', email: 'therichpost@gmail.com', website: 'therichpost.com' },
    {
      name: 'therichpost',
      email: 'therichpost@gmail.com',
      website: 'therichpost.com',
    },
    {
      name: 'therichpost',
      email: 'therichpost@gmail.com',
      website: 'therichpost.com',
    },
    { name: 'Jas', email: 'therichpost@gmail.com', website: 'therichpost.com' },
    {
      name: 'therichpost',
      email: 'therichpost@gmail.com',
      website: 'therichpost.com',
    },
    {
      name: 'therichpost',
      email: 'therichpost@gmail.com',
      website: 'therichpost.com',
    },
    { name: 'Jas', email: 'therichpost@gmail.com', website: 'therichpost.com' },
    {
      name: 'therichpost',
      email: 'therichpost@gmail.com',
      website: 'therichpost.com',
    },
    {
      name: 'therichpost',
      email: 'therichpost@gmail.com',
      website: 'therichpost.com',
    },
    {
      name: 'Ajay',
      email: 'therichpost@gmail.com',
      website: 'therichpost.com',
    },
    { name: 'Jas', email: 'therichpost@gmail.com', website: 'therichpost.com' },
    {
      name: 'therichpost',
      email: 'therichpost@gmail.com',
      website: 'therichpost.com',
    },
    {
      name: 'therichpost',
      email: 'therichpost@gmail.com',
      website: 'therichpost.com',
    },
    { name: 'Jas', email: 'therichpost@gmail.com', website: 'therichpost.com' },
    {
      name: 'therichpost',
      email: 'therichpost@gmail.com',
      website: 'therichpost.com',
    },
    {
      name: 'therichpost',
      email: 'therichpost@gmail.com',
      website: 'therichpost.com',
    },
    { name: 'Jas', email: 'therichpost@gmail.com', website: 'therichpost.com' },
    {
      name: 'therichpost',
      email: 'therichpost@gmail.com',
      website: 'therichpost.com',
    },
    {
      name: 'therichpost',
      email: 'therichpost@gmail.com',
      website: 'therichpost.com',
    },
  ];

  dtOptions : any = {};

  constructor() {}

  ngAfterViewInit(): void {
    // $(this.dataTable.nativeElement).DataTable();
    
  }

  ngOnInit(): void {
    // $('#example').DataTable();
    // this.dtOptions = {
    //   pageLength:5,
    //   lengthMenu:[5,10,20,30],
    //   processing:true,
    //   pagingType:'full_numbers',
      
    // }
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu:[5,10,20,30],
      processing: true,
      // dom: 'Bfrtip',
      // "dom": 'Blfrtip',
      dom: 'lBfrtip',
        buttons: [
          'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    };
  }

  // exportexcel(){
  //     /* pass here the table id */
  //     let element = document.getElementById('excel-table');
  //     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
   
  //     /* generate workbook and add the worksheet */
  //     const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
   
  //     /* save to file */  
  //     XLSX.writeFile(wb, this.fileName);
  // }
}
