import Dexie from "dexie";

export class TransactionAppDB extends Dexie {
  transactions: Dexie.Table<ITransaction, number>;
  /**
   *  Esto inicializa la DB
   */
  constructor() {
    super("MoneyMapAppDb");
    this.version(1).stores({
      transactions: "++id, amount, lat, lng, title, imageUrl"
    });

    this.transactions.mapToClass(Transaction);
  }
}

export interface ICategory {}

export interface ITransaction {
  id?: number;
  amount: number;
  lat: number;
  lng: number;
  title: string;
  imageUrl: string;
}

export class Transaction implements ITransaction {
  id?: number;
  amount: number;
  lat: number;
  lng: number;
  title: string;
  imageUrl: string;
  /**
   *
   */
  constructor(
    amount: number,
    title: string,
    lat?: number,
    lng?: number,
    id?: number,
    imageUrl?: string
  ) {
    this.amount = amount;
    if (lat) this.lat = lat;
    if (lng) this.lng = lng;
    if (imageUrl) this.imageUrl = imageUrl;
    if (id) this.id = id;
    if (title) this.title = title;
  }

  setCoords(coords){
    this.lat = coords.latitude;
    this.lng = coords.longitude;
  }

  cleanCoords() {
    this.lat = null;
    this.lng = null;
  }

  save() {
    return db.transactions.add(this);
  }
  /**
   * Obtiene todas las transacciones
   *
   * @static
   * @memberof Transaction
   * Retorna Promise
   */
  static all() {
    return db.transactions
      .orderBy("id")
      .reverse()
      .toArray();
  }
}

export let db = new TransactionAppDB();
