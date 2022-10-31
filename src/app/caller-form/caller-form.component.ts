import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'caller-form',
  templateUrl: './caller-form.component.html',
  styleUrls: ['./caller-form.component.scss']
})
export class CallerFormComponent implements OnInit {
  callId: string = 'string123';

  constructor() { }

  ngOnInit(): void {
  }

}
