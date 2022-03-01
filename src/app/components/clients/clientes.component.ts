import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'flash-messages-angular';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
import { NgForm } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {


  clients: Client[];
  client: Client = {
    nombre: '',
    apellidos: '',
    email: '',
    estado: true,
    saldo: 0
  }

  id: string;
  option:string='';

  @ViewChild("clientForm") clientForm: NgForm;
  @ViewChild("botonCerrar") botonCerrar: ElementRef;

  constructor(private clientService: ClientService,
    private flashMessages: FlashMessagesService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClients().subscribe((clients:any)  => {
      // console.log('data firebase',clients)
        this.clients = clients;
      }
   

    )
  }

  getSaldoTotal() {
    let saldoTotal: number = 0;
    if (this.clients) {
      this.clients.forEach(client => {
        saldoTotal += client.saldo == undefined ? 0 : client.saldo;
      })
    }
    return saldoTotal;
  }

  agregar({ value, valid }: NgForm) {
    if (!valid) {
      this.flashMessages.show('Por favor llena el formulario correctamente', { cssClass: 'alert-danger', timeout: 4000 })
    } else {

value.estado=this.option=="true"? true:false
// console.log(value);
      this.clientService.agregarClient(value)
      this.clientForm.resetForm()
      this.cerrarModal();
      this.flashMessages.show('Datos guardas correctament', { cssClass: 'alert-success', timeout: 5000 })
    }
  }

  private cerrarModal() {
    this.botonCerrar.nativeElement.click();
  }

}
