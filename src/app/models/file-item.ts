export class Fileitem {
    
    public file: File;
    public nameFile:string;
    public url:string;
    public state:boolean;
    public progress:number;

    constructor(file:File){
        this.file=file;
        this.nameFile=file.name;
        this.state=false;
        this.progress=0;
    }
}