import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlayersService } from 'src/app/services/players.service';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss']
})
export class NumberInputComponent implements OnInit {
  @Input() action: any;       // Action object
  @Input() castaway: any;     // name of castaway
  @Input() selectedWeek: any; // selected week to update

  pts: number = 0;            // pt value for this input
  multiplier: number = 0;     // multiplier to display

  constructor(private playersService: PlayersService) { }

  ngOnInit(): void {
    this.getMultiplier();
  }

  // update displayed multiplier when selected week changes
  ngOnChanges(changes: any) {
    this.getMultiplier()
  }

  // fetch current multiplier for this input to display
  getMultiplier() {
    this.playersService.getCastawayPoints(this.castaway, this.action.action, this.selectedWeek)
      .subscribe(data => {
        this.multiplier = data?.multiplier ?? 0;
      })
  }

  // fetch pt value for this input's action
  getPtValue() {
    this.playersService.getActionPtValue(this.action.action)
      .subscribe(data => {
        this.pts = data.pts;
      })
  }

  // update point records with new multiplier
  updatePoints(newMult: number) {
    let newVal = {"pts": this.pts, "multiplier": newMult}
    this.playersService.setCastawayPoints(this.castaway, this.action.action, this.selectedWeek, newVal);
  }
}
