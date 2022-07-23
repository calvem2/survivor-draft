import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireDatabaseModule, AngularFireList } from '@angular/fire/compat/database';
import Player from '../models/Player';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private dbPath: string = '/players';
  players: AngularFireList<Player>;

  constructor(private db: AngularFireDatabase) {
    this.players = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Player> {
    return this.players;
  }
}
