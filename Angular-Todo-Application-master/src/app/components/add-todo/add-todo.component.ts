import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  @Output() addTodo: EventEmitter<any> = new EventEmitter;

  title: string;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log("Clicou no botão")
    let todo = {
      title: this.title,
      is_public: true,
    }
    this.addTodo.emit(todo); // Substituir por API Zendesk
		console.log("TCL: AddTodoComponent -> onSubmit -> todo", todo)
  }

}
