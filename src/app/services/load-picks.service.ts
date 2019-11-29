import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Fileitem } from '../models/file-item';

@Injectable({
  providedIn: 'root'
})
export class LoadPicksService {

  private PICTURE_FOLDER = 'img'

  constructor(private db: AngularFirestore) { }

  saveImagesFirebase(pictures: Fileitem[]) {
    const storageRef = firebase.storage().ref();

    for (const item of pictures) {
      item.state = true;
      if (item.progress >= 100) {
        continue;
      }
      const uploadTask: firebase.storage.UploadTask =
        storageRef.child(`${this.PICTURE_FOLDER}/${item.nameFile}`)
          .put(item.file);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot)=>item.progress=(snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (error)=>console.log('Upload error',error),
        ()=>{
          console.log('Image loaded correctly');
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL)=>{
            item.url=downloadURL;
            item.state=false;
            this.saveImage({nameFile:item.nameFile,url:item.url});

          })
        });

    }
  }
  private saveImage(pictures: { nameFile: string, url: string }) {

    this.db.collection(`/${this.PICTURE_FOLDER}`)
      .add(pictures);
  }
}
