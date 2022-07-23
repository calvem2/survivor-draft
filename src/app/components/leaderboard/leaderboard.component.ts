import { Component, OnInit } from '@angular/core';
import { PlayersService } from 'src/app/services/players.service';
import Player from 'src/app/models/Player';
import { map } from 'rxjs';
import Castaway from 'src/app/models/Castaway';
import { CastawaysService } from 'src/app/services/castaways.service';
import Points from 'src/app/models/Points';


@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  players: any = [];
  points: any = [];

  constructor(
    private playerService: PlayersService, 
    private castawaysService: CastawaysService
  ) { }

  ngOnInit(): void {
    this.retrievePlayers();
    // this.players.valueChanges.subscribe(changes => this.disableButton = false);
    // this.retrieveCastaways();
    // this.addTribes()
    console.log(this.players)
  }

  retrievePlayers(): void {
    this.playerService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      // this.addTribes()
      this.players = data;
      this.tallyPoints(data);
      console.log(this.points)
    })
  }


  // addTribes(): void {
  //   this.players = this.players.map((p: Player) => {
  //     let tribe: any[] = [];
  //     p["castaways"].forEach((castaway: string) => {
  //       this.castawaysService.getCastaway(castaway).valueChanges()
  //         .subscribe(data => {
  //           tribe.push(data)
  //         })
        
  //     })
  //     p["tribe"] = tribe;
  //     return p;
  //   })
  // }

  tallyPoints(players: any): void {
    // this.players = this.players.map((p: Player) => {
    //   let points: number = 0;
    //   p["tribe"]?.forEach((castaway: Castaway) => {
    //     castaway["points"].forEach((p: Points) => {
    //       points += p["pts"]
    //     })
    //   })
    //   p["points"] = points;
    //   return p;
    // })

    console.log("HI")
    // let new_players = this.players;
    for (let p of players) {
      // console.log(p)
      for (let c of p["castaways"]) {
        console.log(typeof(this.castawaysService.getPoints(c).valueChanges()
          .subscribe(data => {
            // find the player in this.players and replace it
            // p.points = dat /a;
            let totalPts: number = 0;
            for (let pointObj of data) {
              totalPts += pointObj["pts"];
            }
            p["points"] = totalPts;
            this.players[p.key] = p;
            // this.points = this.points.push(data)
          })))
      }
    }
  }

}
