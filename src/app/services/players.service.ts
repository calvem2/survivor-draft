import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireDatabaseModule, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import Player from '../models/Player';
import firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  players: Observable<any>;
  castaways: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.players = db.list("/players").valueChanges();
    // this.castaways = db.object("/castaways").valueChanges();
    this.castaways = db.list("/castaways").valueChanges();
  }

  getPlayers(): Observable<any> {
    return this.players;
  }

  getCastaways(): Observable<any> {
    return this.castaways;
  }
}
