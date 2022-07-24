import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import Castaway from '../models/Castaway';
import Points from '../models/Points';

@Injectable({
  providedIn: 'root'
})
export class CastawaysService {
  private dbPath: string = '/castaways';
  castaways: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.castaways = db.list(this.dbPath).valueChanges();
  }

  getAll(): Observable<any[]> {
    // console.log
    return this.castaways;
  }

  // getCastaway(name: string): AngularFireObject<Castaway> {
  //   return this.db.object(this.dbPath + "/" + name);
  // }

  // getPoints(name: string[]): AngularFireList<Points> {
  //   return this.db.list(`${this.dbPath}/${name}/points`);
  // }

  // getPoints(name: string): Subscription {
  //   return this.db.list(`${this.dbPath}/${name}/points`)
  //     .valueChanges()
  //     .subscribe(data => {
  //       // sum points
  //       let points: number = 0;
  //       console.log(data);
  //       data.forEach((pt) => {
  //         points += pt["pts"];
  //       })
  //   })
  // }
}
