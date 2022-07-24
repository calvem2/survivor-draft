import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-weekly-scoring',
  templateUrl: './weekly-scoring.component.html',
  styleUrls: ['./weekly-scoring.component.scss']
})
export class WeeklyScoringComponent implements OnInit {
  week: string = "1";
  weeks: number = 10 * 10; // total "items" in the pagination

  constructor() { }

  ngOnInit(): void {
  }

  // handle week change
  pageChanged(event: PageChangedEvent): void {
    this.week = event.page.toString();
  }

}
