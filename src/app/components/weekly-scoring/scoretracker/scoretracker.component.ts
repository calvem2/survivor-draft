import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import Action from 'src/app/models/Action';

import { PlayersService } from 'src/app/services/players.service';
import { Castaway } from 'src/app/models/Castaway';

@Component({
  selector: 'app-scoretracker',
  templateUrl: './scoretracker.component.html',
  styleUrls: ['./scoretracker.component.scss']
})
export class ScoretrackerComponent implements OnInit {
  @Input() week: any;
  tableColumns: string[] = [];
  castaways: string[] = [];
  actions: Action[] = [];
  selectedWeek: any;

  constructor(private playerService: PlayersService) { }

  ngOnInit(): void {
    this.selectedWeek = this.week;

    const castaways$ = this.playerService.getCastaways();
    const actions$ = this.playerService.getActions();

    // fetch castaway info
    castaways$.subscribe(data => {
      let names = data.map((d: Castaway) => d["name"]);
      this.setCastaways(names);
      this.setColumns(names);
    })

    // fetch action info
    actions$.subscribe(data => {
      this.actions = data;
    })
  
  }

  // update selected week on week input change
  ngOnChanges(changes: any) {
    this.selectedWeek = changes["week"].currentValue
  }

  // set castaways in table
  setCastaways(castaways: string[]) {
    this.castaways = castaways;
  }

  // set table columns
  setColumns(castaways: string) {
    this.tableColumns = ["action", ...castaways];
  }
}
