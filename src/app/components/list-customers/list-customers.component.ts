import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatSort} from '@angular/material';
import {CustomerI} from '../../models/customer.interface' 
import { CustomerService } from "../../services/customer.service";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { FormComponent } from "../form/form.component";

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.scss']
})
export class ListCustomersComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'acciones', 'new'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.customerService.getAllCustomers().subscribe(res => this.dataSource.data = res);
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onEdit(element, readonly, title){
    this.openModal(element, title);
    this.customerService.readonly =readonly;

  }

  onDelete(id:string)
  {
    this.customerService.deleteCustomer(id);
  }

  openModal(element, title):void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: title,
      element: element
    };
    dialogConfig.autoFocus=true;
    this.dialog.open(FormComponent,dialogConfig);
  }

}
