import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Todo } from '../components/models/Todo';
import { Observable } from 'rxjs';
import { ActivatedRoute } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  /*
  todosUrl =  'https://jsonplaceholder.typicode.com/todos';
  todoLimit = '?_limit=5';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  */

  public ZendeskTicketId: string;

  ZendeskhttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer 0b7d3ac316ee572aee2f76c6f7a2a182cb0197127e7b87a756db4735a7e81c30`,
    })
  }


  constructor(
    private http: HttpClient, private route: ActivatedRoute
  ) {
    console.log('------------------------------------------------------------------------');
    console.log('------------------------------------------------------------------------');
    this.ZendeskTicketId = this.route.snapshot.queryParamMap.get('id'); 
    console.log('CAPTURAR A URL -> ', this.ZendeskTicketId);
    console.log('------------------------------------------------------------------------');
    console.log('------------------------------------------------------------------------');
  }


  getTodos(): Observable<Todo[]> {

    let comentarios:Array<Todo> = [];
    let ZendeskUrl =  'https://z3n-itau-credit-card.zendesk.com/api/v2/tickets/'+this.ZendeskTicketId+'/comments';
//    console.log('ANTES DE CHAMAR A API');
    this.http.get(`${ZendeskUrl}`,this.ZendeskhttpOptions).subscribe(data => {
      /*
      console.log('CHAMOU A API -> RETORNO DOS DADOS',data);
      console.log('CHAMOU A API -> QUANTIDADE DE ITENS',data.count);
      console.log('CHAMOU A API -> PRIMEIRO COMENTÁRIO',data.comments[0]);
      */
      for (let i = 0; i < data.count; i++) {
        var comentario: Todo = {id: data.comments[i].id, title: data.comments[i].body, is_public: data.comments[i].public, data_criacao:data.comments[i].created_at};
        comentarios.push(comentario);
//        console.log("DENTRO DO FOR ->> TODOS OS COMENTÁRIOS", comentarios);
      }
    });
//    console.log("TODOS OS COMENTÁRIOS", comentarios)
    return comentarios;
//    console.log('CHAMANDO ZENDESK->zendeskcall ' + zendeskcall);
//    return this.http.get<Todo[]>(`${this.todosUrl}${this.todoLimit}`);
  }

  toggleCompleted(todo: Todo) {
    let url = `${this.todosUrl}/${todo.id}`
    return this.http.put(url, todo, this.httpOptions);

  }

  deleteTodo(todo: Todo) {

//    console.log('CLICOU EM DELETAR');
    let ZendeskPrivateUrl =  'https://z3n-itau-credit-card.zendesk.com/api/v2/tickets/'+this.ZendeskTicketId+'/comments/'+todo.id+'/make_private.json';
//    console.log('CLICOU EM DELETAR - URL ', ZendeskPrivateUrl);
//    let url = `${this.todosUrl}/${todo.id}`
//    return this.http.delete(url, this.httpOptions);
    return this.http.put(ZendeskPrivateUrl, null, this.ZendeskhttpOptions);
  }

  addTodo(todo: Todo) {

    console.log('CLICOU EM ADICIONAR');
    let ZendeskAddUrl =  'https://z3n-itau-credit-card.zendesk.com/api/v2/tickets/'+this.ZendeskTicketId+'.json';
    console.log('CLICOU EM ADD - URL ', ZendeskAddUrl);
    let item = '{"ticket": {"comment": { "body": "'+todo.title+'","public": '+todo.is_public+' , "author_id": 390717392811 }}}';
    console.log('CLICOU EM ADD - item ', item);
    return this.http.put(ZendeskAddUrl, item, this.ZendeskhttpOptions);
//    return this.http.post(this.todosUrl, todo, this.httpOptions);
  }
}
