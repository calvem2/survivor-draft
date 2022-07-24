import { Component, OnInit } from '@angular/core';
import { PlayersService } from 'src/app/services/players.service';
import { combineLatestWith } from 'rxjs';

import Castaway from 'src/app/models/Castaway';
import { animate, state, style, transition, trigger } from '@angular/animations';
import Player from 'src/app/models/Player';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class LeaderboardComponent implements OnInit {
  players: any[] = [];
  columnsToDisplay: string[] = ['rank', 'name', 'score'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: any;

  constructor(private playerService: PlayersService) { }

  ngOnInit(): void {
    const players$ = this.playerService.getPlayers();
    const castaways$ = this.playerService.getCastaways();
    
    players$.pipe(
        combineLatestWith(castaways$)
      )
      .subscribe(([players, castaways]) => {
        for (let p of players) {
          p["score"] = this.getTribeScore(p.castaways, castaways);
        }
        this.players = this.addPlayerRank(players);
        console.log(this.addPlayerRank(players));
      })
  }

  getTribe(names: string[], castaways: Castaway[]): Castaway[] {
    return castaways.filter(c => names.includes(c.name));
  }

  getTribeScore(tribe: string[], castaways: Castaway[]): number {
    // get player's tribe
    const tribeInfo = this.getTribe(tribe, castaways);

    // calculate score for fantasy tribe
    return (
      tribeInfo.reduce((totalScore: any, currCastaway: any) => {
        // sum points for the current castaway
        let currCastScore = currCastaway["points"].reduce((castScore: any, currPtRecord: any) => {
          return castScore + currPtRecord["pts"]
        }, 0)
        return totalScore += currCastScore
      }, 0)
    )
  }

  addPlayerRank(players: any[]): any[] {
    return (
        players.sort((a: any, b: any) => b["score"]-a["score"]).map((p, i) => {
          p['rank'] = i + 1;
          return p;
        })
    )
  }
}
