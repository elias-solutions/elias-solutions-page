import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-side',
  templateUrl: './start-side.component.html',
  styleUrls: ['./start-side.component.scss']
})
export class StartSideComponent {

  constructor(private router: Router) {}

  onClick() {
    this.router.navigate(['./project-request']);
  }
}