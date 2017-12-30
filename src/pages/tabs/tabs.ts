import { Component } from '@angular/core';
import { ContactPage } from '../contact/contact';
import { TransactionsPage } from '../transactions/transactions';
import { MapPage } from '../map/map';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = TransactionsPage;
  tab2Root = MapPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
