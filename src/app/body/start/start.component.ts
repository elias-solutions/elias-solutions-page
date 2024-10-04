import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-side',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent {

  constructor(private router: Router) {}

  onClick() {
    this.router.navigate(['./project-request']);
  }
}