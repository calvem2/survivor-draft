import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireDatabaseModule, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import Player from '../models/Player';
import firebase from 'firebase/compat';
import { PointRecord } from '../models/Castaway';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  players: Observable<any>;
  castaways: Observable<any>;
  actions: Observable<any>;
  // db: AngularFireDatabase;

  constructor(private db: AngularFireDatabase) {
    // this.db = db;
    this.players = db.list("/players").valueChanges();
    // this.castaways = db.object("/castaways").valueChanges();
    this.castaways = db.list("/castaways").valueChanges();
    this.actions = db.list("/actions").valueChanges();
  }

  getPlayers(): Observable<any> {
    return this.players;
  }

  getCastaways(): Observable<any> {
    return this.castaways;
  }

  getActions(): Observable<any> {
    return this.actions;
  }

  getActionPtValue(action: string): Observable<any> {
    let api = `/actions/${action}/points`;
    return this.db.object(api).valueChanges()
  }

  getCastawayPoints(castaway: string, action?: string, week?: string): Observable<any> {    
    let api = `/castaways/${castaway}/points`;
    if (week && action) { 
      api += `/${week}/${action}`
    }
    return this.db.object(api).valueChanges()
  }

  setCastawayPoints(castaway: string, action: string, week: string, newVal: PointRecord): Promise<any> {
    let api = `/castaways/${castaway}/points/${week}/${action}`;
    console.log(api)
    return this.db.object(api).update(newVal);
  }
}
