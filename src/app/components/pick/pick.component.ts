import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Item { nameFile: string; url:string }

@Component({
  selector: 'app-pick',
  templateUrl: './pick.component.html',
  styles: []
})
export class PickComponent implements OnInit {

  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor(private afs:AngularFirestore) { 
    this.itemsCollection = afs.collection<Item>('img');
    this.items = this.itemsCollection.valueChanges();
  }

  ngOnInit() {
  }

}
