import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

userdatalist: boolean;
albumdatalist: boolean;
imagedatalist: boolean;
userdata: any = [];
albumdata: any = [];
imgdata: any = [];
resdata: any = [];
	//userdatalist boolean;
	constructor(private http: HttpClient){}

ngOnInit() {
    this.userdatalist = true;
	this.albumdatalist = false;
	this.imagedatalist = false;
	this.getUserList();
}
  
  getUserList(): void{
	  this.userdata = [];
	  this.http.get('https://jsonplaceholder.typicode.com/users').subscribe(res => {
		  //console.log(res);
		  this.userdata = res;
	  });
  }
  
  getAlbum(userid: number): void{
		this.albumdata = [];
		this.userdatalist= false;
		this.albumdatalist= true;
	  this.http.get('https://jsonplaceholder.typicode.com/albums').subscribe(res => {
		  this.resdata = res;
		  for(var i=0;i<this.resdata.length;i++){
		   if(this.resdata[i].userId == userid){
				this.albumdata.push(this.resdata[i]);
			}
		  }
		  this.resdata = [];
	  });
  }
  
  getImages(albumid: number): void{
	this.imgdata= [];
	//this.userdatalist = false;
	this.albumdatalist = false;
	this.imagedatalist = true;
	  this.http.get('https://jsonplaceholder.typicode.com/photos').subscribe(res => {
		  console.log(res);
		  this.resdata = res;
		for(var i=0;i<this.resdata.length;i++){
		   if((this.resdata[i].albumId == albumid) && (this.imgdata.length < 5)){
				this.imgdata.push(this.resdata[i]);
			}
		  }
		this.resdata = [];
	  });
  }
  
  goback(loc):void{
	  if(loc === "user"){
		this.userdatalist = true;
		this.albumdatalist = false;
		this.imagedatalist = false;
	  }else if(loc === "album"){
		this.userdatalist = false;
		this.albumdatalist = true;
		this.imagedatalist = false;
	  }
  }
}
