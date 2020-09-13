import { Component, OnInit } from '@angular/core';
import { SQLService } from "../../services/sql/sql.service";

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.page.html',
  styleUrls: ['./todolist.page.scss'],
})
export class TodolistPage implements OnInit {
  portals = [];

  constructor(private sqlService:SQLService) { 
    this.sqlService.getDbState().subscribe(ready => {
      if (ready) {
      console.log("constructor ready");
       this.getPortals();
       for(let i =0;i<this.portals.length;i++){
          console.log(this.portals["content"]);
       }
     
      }
    });
  }

  ngOnInit() {
  }
  todo=[];
  

  getPortals() {
    console.log("portal2")
    this.sqlService.db.executeSql('SELECT * FROM portal').then((rs: any) => {
      console.log(rs);  
      if(rs.rows.length>0){
          this.todo=[];
          for(let i=0;i<rs.rows.length;i++){
          let itesm={icerik:rs.rows.item(i).content,index:i}
          console.log(itesm);
          this.todo.push(itesm);
          }
        }
        console.log(this.todo);
        
    
      });
    };

  ekleDB(){
    if(this.todo!=[]){
      console.log(this.todo[0].icerik);
      console.log(this.todo[0].index);
      this.sqlService.getDbState().subscribe(ready => {
      if (ready) {
      console.log("insert ready")
      this.sqlService.db.executeSql("DELETE FROM portal WHERE 1 ;");
      for(let i=0;i<this.todo.length;i++){
        console.log("icerik ekleniyor"+this.todo[i].icerik);
        let ic=this.todo[i].icerik;
        let ind=this.todo[i].index;
        console.log("icerik:"+ic+"index:"+ind);
      
        this.sqlService.db.executeSql("INSERT INTO portal (content,todoIndex) VALUES ('"+ic+"','"+ind+"');");

      }}})



    }
  }


 
 ekle(item){
   this.todo.push({icerik:item,index:this.todo.length});
   console.log(this.todo[this.todo.length-1].index);
 }
 icerikSil(itemIndex:number){
   for(let i=0;i<this.todo.length;i++){
     if(this.todo[i].index==itemIndex){
       this.todo.splice(itemIndex,1);
       for(let y=i;y<this.todo.length;y++){
         this.todo[y].index--;
       }
     }
   }
   this.sqlService.getDbState().subscribe(ready => {
    if (ready) { 
      this.sqlService.db.executeSql("DELETE FROM portal WHERE todoIndex ='"+itemIndex+"';");
    }});



}

}
