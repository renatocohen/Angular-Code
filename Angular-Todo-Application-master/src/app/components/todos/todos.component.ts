import { Todo } from './../models/Todo';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos: Observable <Todo[]>;

  constructor(private todoservice: TodoService) {

  }

  ngOnInit() {

    this.todos = this.todoservice.getTodos();
//    console.log("CAPTANDO TODOS OS COMENTÁRIOS", this.todos)

    /*
    this.todoservice.getTodos().subscribe(r => {
      this.todos = r;
			console.log("TCL: TodosComponent -> ngOnInit -> todos", this.todos)
    });
    */
  }
  deleteTodo(todo: Todo) {
//		console.log("TCL: TodosComponent -> deleteTodo -> todo", todo)
    // Adapt interface
//    this.todos = this.todos.filter(t => t.id !== todo.id);

    // Ajustar cor
    console.log('COMENTÁRIO INTERNO -> todo ',todo);
    console.log('COMENTÁRIO INTERNO -> this.todos ',this.todos);

    for(let i=0; i< this.todos.length; i++){
      console.log('COMENTÁRIO INTERNO -> NO FOR ' + i + ' - ' + this.todos[i]);
      if(todo.id === this.todos[i].id){
        console.log('COMENTÁRIO INTERNO -> DENTRO DO IF');
        this.todos[i].is_public = false;
      }
    }

    // Remove from server
    this.todoservice.deleteTodo(todo).subscribe();
  }

  addTodo(todo: Todo) {
    this.todoservice.addTodo(todo).subscribe((td: any) => {

			console.log("TCL: TodosComponent -> addTodo -> td", td)
      console.log("VALIDANDO A RESPOSTA -> id_audit ", td.audit.id);
      console.log("VALIDANDO A RESPOSTA -> length ", td.audit.events.length);
      console.log("VALIDANDO A RESPOSTA -> id_comentario ", td.audit.events[0].id);
      console.log("VALIDANDO A RESPOSTA -> title ", td.audit.events[0].body);
      console.log("VALIDANDO A RESPOSTA -> public ", td.audit.events[0].public);
      console.log("VALIDANDO A RESPOSTA -> data_criacao ", td.audit.created_at);

      var comentario_inserido: Todo = {id: td.audit.events[0].id, title: td.audit.events[0].body, is_public: td.audit.events[0].public, data_criacao: td.audit.created_at};
      this.todos.push((comentario_inserido));
       this.todoservice.getTodos().subscribe(r => {
         this.todos = r;});
    })
  }

  }
