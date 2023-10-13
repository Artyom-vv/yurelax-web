import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { SidebarNav } from 'src/app/modules/platform/modules/sidebar/interfaces/sidebar.nav';
import { AppStore } from 'src/app/store/app.store';

@Component({
  selector: 'yrx-wiki-home',
  templateUrl: './wiki-home.component.html',
  styleUrls: ['./wiki-home.component.scss']
})
export class WikiHomeComponent implements OnInit {
  
  ngOnInit(): void {
    
  }
}
