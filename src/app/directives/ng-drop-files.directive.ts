import { Fileitem } from '../models/file-item';
import {
  Directive, EventEmitter, ElementRef,
  HostListener, Input, Output
} from '@angular/core';


@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() files: Fileitem[] = [];
  @Output() aboutMouse: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this.aboutMouse.emit(true);
    this._prevenirDetener(event);

  }
  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.aboutMouse.emit(false);
  }
  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    
    const tranfer = this._getTransfer(event);
    if(!tranfer){
      return;
    }
    this._extractFiles(tranfer.files);
    this._prevenirDetener(event);
    this.aboutMouse.emit(false);
  }
  private _getTransfer(event:any){
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }
  //Crea un arreglo con todos los elementos hayan caido en la lista y puedan ser cargados
  //verifica que sea una imagen y las validaciones del metodo "_fileCanBeLoaded"
  private _extractFiles(fileList:FileList){
    for (const property in Object.getOwnPropertyNames(fileList)){
      
      const temporaryFile = fileList[property];

      if( this._fileCanBeLoaded(temporaryFile)){
        const newFile = new Fileitem(temporaryFile);
        this.files.push(newFile)
      }
    }
    console.log(this.files);
    
  }

  //validaaciones
  private _fileCanBeLoaded(file:File):boolean{
    if(!this._filesDroppeado(file.name)&& this._isImage(file.type)){
      return true;
    }else{
      return false;
    }
  }

  private _prevenirDetener(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  private _filesDroppeado(fileName: string): boolean {
    for (const file of this.files) {
      if (file.nameFile === fileName) {
        console.log('The file ' + fileName + ' has already been added');
        return true;
      }
    }
    return false;
  }
  private _isImage(fileType: string): boolean {
    return (fileType === '' || fileType === undefined) ? false : fileType.startsWith('image');
  }

}
