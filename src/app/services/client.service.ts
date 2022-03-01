import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../models/client.model';

@Injectable()
export class ClientService {



  clientesColeccion: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private db: AngularFirestore) {
    this.clientesColeccion = db.collection('Clientes', ref => ref.orderBy('nombre', 'asc'));
  }

  getClients(): Observable<Client[]> {
    this.clients = this.clientesColeccion.snapshotChanges().pipe(
      map(cambios => {
        return cambios.map((action:any) => {
          const datos = action.payload.doc.data() as Client;
          datos.id = action.payload.doc.id;
          // action.payload.estado=="'true'"?datos.estado=true:datos.estado=false;
          // console.log(datos ,'payload servicio');
          return datos;
        })
      })
    );
    return this.clients;
  }


  agregarClient(client: Client) {
    this.clientesColeccion.add(client);
  }

  getClient(id: string) {
    this.clientDoc = this.db.doc<Client>(`Clientes/${id}`);
    this.client = this.clientDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null!;
        }
         else {
          const datos = action.payload.data() as Client;
          datos.id = action.payload.id;
          return datos;
        }
      })
    );
    return this.client;
  }

  modificar(client:Client){
    this.clientDoc=this.db.doc(`Clientes/${client.id}`);
    this.clientDoc.update(client);
  
  }

  eliminarCliente(client:Client){
    this.clientDoc=this.db.doc(`Clientes/${client.id}`);
    this.clientDoc.delete();
  }
}
