import { Component, OnInit, Inject } from '@angular/core';
import { CustomerService } from "../../services/customer.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'formModal',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  selected ={
    id:null,
    nombre: '',
    cant: '',
    precio: ''
  };
  constructor( 
    
    public customer: CustomerService,
    private dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    
    ) { }

  ngOnInit() {
    if(this.data.element){
      this.selected = this.data.element;
    }
  }

  onSaveForm(){
    if(this.selected.id == null){
      let newProduct = 
      {
        nombre : this.selected.nombre,
        cant : this.selected.cant,
        precio : this.selected.precio,
      };
      this.customer.addCustomer(newProduct);
    } 
    else{
      this.customer.editCustomers(this.selected);
    }
    this.close();
  }
  close():void{
    this.dialogRef.close();
  }
}
