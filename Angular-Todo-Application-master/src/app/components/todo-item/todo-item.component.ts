import { TodoService } from './../../services/todo.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { Todo } from '../models/Todo';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoservice: TodoService) { }

  ngOnInit() {
  }

  // Set Dynamic Classes
  setClasses() {
    let classes = {
      todo: true,
      'is-private': !this.todo.is_public
    }
    return classes;
  }

  onToggle(todo) {
    // toggle On UI
    todo.is_public = !todo.is_public;
    console.log('ENTROU NO ONTOGGLE -> ');

    // toggle On server
    this.todoservice.toggleCompleted(todo).subscribe((todo) => {
      console.log("Todo", todo);
    });

  }

  onDelete(todo) {
    console.log('ENTROU NO ONDELETE -> ');
    console.log('ENTROU NO ONDELETE -> todo',todo);
    this.deleteTodo.emit(todo);
    console.log('SAIU NO ONDELETE -> ');
    console.log('SAIU NO ONDELETE -> todo',todo);
  }
}
