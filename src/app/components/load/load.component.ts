import { Component, OnInit } from '@angular/core';
import { Fileitem } from '../../models/file-item';
import { LoadPicksService } from '../../services/load-picks.service'

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styles: []
})
export class LoadComponent implements OnInit {

  aboutDrop = false;
  files: Fileitem[] = [];

  constructor(public _si: LoadPicksService) { }

  ngOnInit() {
  }
  saveImage() {
    this._si.saveImagesFirebase(this.files);
  }
  itemTest(event) {
    console.log(event);
  }
  clearFiles() {
    this.files = [];
  }
}
