import {Component} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  activeTab: string = 'home';

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }
}
