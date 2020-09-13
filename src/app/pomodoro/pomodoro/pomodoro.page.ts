import { Component, OnInit } from '@angular/core';
import { SQLService } from 'src/app/services/sql/sql.service';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.page.html',
  styleUrls: ['./pomodoro.page.scss'],
})
export class PomodoroPage implements OnInit {

  constructor(private sqlService:SQLService) {
    this.sqlService.getDbState().subscribe(ready => {
      if (ready) {
      this.getPomodoro();

         
      }})

  }
  ngOnInit() {
  }
  Psayi:number=0;

  pomodoroPlus(){
    this.Psayi++;
  }
  pomodoroMinus(){
    if(this.Psayi!=0){
      this.Psayi--;
    }
 
  }
  pomodoroDb(){
   
      this.sqlService.getDbState().subscribe(ready => {
        if (ready) {
          this.sqlService.db.executeSql("DELETE FROM portalPomodoro WHERE 1 ;");
          this.sqlService.db.executeSql("INSERT INTO portalPomodoro (pomodoroSayisi) VALUES('"+this.Psayi+"');");
        }})
    

  }

  getPomodoro(){
    this.sqlService.db.executeSql('SELECT * FROM portalPomodoro').then((rs: any) => {
      console.log(rs);  
      if(rs.rows.length>0){
          this.Psayi=rs.rows.item(0).pomodoroSayisi;
          }
        })
        console.log(this.Psayi);
  
      }
 
  todoList:string[];
  zaman:string="25:00";
  dakika:number=25;
  saniye:number=0;
  kontrol:boolean=true;
  interval;
  basla(){
    if(this.kontrol){
      this.kontrol=false;
       this.interval=setInterval(function(){
        if(this.saniye==0){
          this.saniye=60;
          this.dakika--;
        }
        this.saniye--;
        if(this.saniye<10){
          this.zaman=`${this.dakika}:0${this.saniye}`;
        }else{
          this.zaman=`${this.dakika}:${this.saniye}`;
        }
  
        if(this.dakika==0 && this.saniye==0){
          clearInterval(this.interval);
        }
      }.bind(this),1000)
  
    }
   
    }
  bitir(){
    clearInterval(this.interval);
    this.kontrol=true;
    this.dakika=25;
    this.saniye=0;
    this.zaman="25:00";
  }
  durdur(){
    clearInterval(this.interval);
    this.kontrol=true;
  }

  shortBreak(){
    clearInterval(this.interval);
    this.kontrol=true;
    this.dakika=5;
    this.saniye=0;
    this.zaman="5:00";
  }
  longBreak(){
    clearInterval(this.interval);
    this.kontrol=true;
    this.dakika=15;
    this.saniye=0;
    this.zaman="15:00";
  }

}

  

