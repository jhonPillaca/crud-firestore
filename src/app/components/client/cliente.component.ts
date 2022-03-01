import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  client: Client = {
    nombre: '',
    apellidos: '',
    email: '',
    estado: true,
    saldo: 0
  }
  id: string;
  options:string='';

  constructor(private clientService: ClientService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe((client:any) => {
      this.client = client;
      this.options=String(client.estado);
    })
  }

  guardar({ value, valid }: NgForm) {
    if (!valid) {
      this.flashMessages.show('algo está mal', { cssClass: 'alert-gander', timeout: 4000 });
    }
     else {
      value.id = this.id;
      value.estado=this.options=="true"?true:false
      // console.log(value,'valores update');
      this.clientService.modificar(value);
      this.router.navigate(['/']);
    }
  }

  
  eliminar() {
    if (confirm('¿Seguro que desea eliminar el cliente?')) {
      // console.log('eliminación',this.client)
      this.clientService.eliminarCliente(this.client);
      this.router.navigate(['/']);
    }
  }


}
