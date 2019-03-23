import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {

  todoListArray: any[];
  showSpinner: boolean = true;
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodolist().snapshotChanges().subscribe(item=>{
      this.todoListArray = [];
      item.forEach(element=>{
        var x=element.payload.toJSON();
        x['$key']=element.key;
        console.log(x);
        this.todoListArray.push(x);
        this.showSpinner = false;
      })

      this.todoListArray.sort((a,b)=>{
        return a.isChecked - b.isChecked;
      })

      
    });
  }

  onAdd(itemTitle){
    if(itemTitle.value!=''){
      this.todoService.addTitle(itemTitle.value);
    }
    itemTitle.value=null;
  }

  alterCheck($key:string,isChecked:boolean){
    this.todoService.checkOrUncheckTitle($key,!isChecked);
  }

  taskDelete($key: string){
    this.todoService.removeTitle($key);
  }
}
