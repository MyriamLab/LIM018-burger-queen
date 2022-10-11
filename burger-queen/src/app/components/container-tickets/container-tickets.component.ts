import { Component, OnInit, ViewChild, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { ConnectionServiceService } from 'src/app/connection-service.service';
import Menu from 'src/app/interfaces/menu.interface';
@Component({
  selector: 'app-container-tickets',
  templateUrl: './container-tickets.component.html',
  styleUrls: ['./container-tickets.component.css']
})
export class ContainerTicketsComponent implements OnInit {
  deliveredSwitch: boolean = false;
  statusListSwitch: boolean = true;
  @ViewChild('btnDelivered') btnShowDelivered!: ElementRef;
  @ViewChild('btnStatusList') btnStatusList!: ElementRef;
  menu!: Menu[];
  statusMenu: Array<any> = [];

  constructor(private renderer2: Renderer2, private connector: ConnectionServiceService) { 
    this.menu = [
      {
        clientName: 'Cliente',
        totalPrice: 10,
        statusOrder: 'Estado Orden',
        fullOrder: [],
        
      }
    ]
  }

  ngOnInit(): void {
    this.connector.getOrder().subscribe(menu => {
      const btnDelivered = this.btnShowDelivered.nativeElement
      const btnStatusOrder = this.btnStatusList.nativeElement
      this.renderer2.addClass(btnStatusOrder, 'btnSelected');
      this.renderer2.removeClass(btnDelivered, 'btnSelected');
      this.menu = menu;
      this.menu.forEach((elem) => {
        if(elem.statusOrder === 'PENDIENTE' || elem.statusOrder === 'PREPARADO') {
          this.statusMenu.push(elem);
        }
      })
      //AGREGAR .SORT() PARA ORDENAR LOS PENDIENTES DESPUES DE LOS PREPARADOS
    })
  }

  showDelivered() {
    this.statusMenu = [];
    const btnDelivered = this.btnShowDelivered.nativeElement;
    const btnStatusOrder = this.btnStatusList.nativeElement;
    this.deliveredSwitch = true;
    this.statusListSwitch = false;
    this.renderer2.addClass(btnDelivered, 'btnSelected');
    this.renderer2.removeClass(btnStatusOrder, 'btnSelected');    
    this.menu.forEach((elem) => {
      if(elem.statusOrder === 'ENTREGADO') {
        this.statusMenu.push(elem);
      }
    })
    console.log(this.statusMenu, 'ARRAY DE ORDENES ENTREGADAS ');
  }
  
  showStatusList() {
    this.statusMenu = [];
    const btnDelivered = this.btnShowDelivered.nativeElement
    const btnStatusOrder = this.btnStatusList.nativeElement
    this.statusListSwitch = true;
    this.deliveredSwitch = false;
    this.renderer2.addClass(btnStatusOrder, 'btnSelected');
    this.renderer2.removeClass(btnDelivered, 'btnSelected');
    this.menu.forEach((elem) => {
      if(elem.statusOrder === 'PENDIENTE' || elem.statusOrder === 'PREPARADO') {
        this.statusMenu.push(elem);
      }
    })
    console.log(this.statusMenu, 'ARRAY DE ORDENES PENDIENTES');
}

}
