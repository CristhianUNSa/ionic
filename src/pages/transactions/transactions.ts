import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Transaction, ITransaction } from "../../database";
import { AddingPage } from "../adding/adding";

/**
 * Generated class for the TransactionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-transactions",
  templateUrl: "transactions.html"
})
export class TransactionsPage {
  addingPage: any = AddingPage;
  transactions: ITransaction[];

  title: string = "Movimientos";

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewWillEnter() {
    this.loadTransactions();
  }
  loadTransactions(): any {
    Transaction.all().then(resultados => {
      this.transactions = resultados;
      console.log(this.transactions);
    });
  }
}
