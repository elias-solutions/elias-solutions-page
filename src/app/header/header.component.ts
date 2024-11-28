import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');  
  }

  ngOnInit(): void {
    this.translate.setDefaultLang('en');
    let browsLang = this.translate.getBrowserLang();
    this.translate.use(browsLang && browsLang.match(/en|de|it|fr/) ? browsLang : 'en');
  }

  switchLanguage(event: Event, language: string): void {
    event.preventDefault();
    this.translate.use(language);
  }
}
