import {Component, Input, OnInit} from '@angular/core';
import {SidebarNavigationInterface} from "./interfaces/sidebar-navigation.interface";

@Component({
  selector: 'yrx-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  @Input() navigation: SidebarNavigationInterface[][] = []

  ngOnInit() {
  }
}
