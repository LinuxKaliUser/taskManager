import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TodoService } from '../services/todo.service';
import { CommonModule } from '@angular/common';
import { Todo } from 'src/app/data/todo';
import { Router } from '@angular/router';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';
import { options } from 'ionicons/icons';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  imports: [IonicModule,CommonModule],
  standalone: true
})
export class TodoListComponent  implements OnInit {

  todos : Array<Todo> | null = []

  constructor(
    private todoService : TodoService,
    private router : Router) { }

  ngOnInit() {
    this.loadData()
  }

  loadData () {
   /**  this.todoService.getCategories()
      .then(data => {
        this.categories = data
      }) */
    this.todoService.getTodos()
      .then(data => {
        this.todos = data
      })
  }

  /**getFoodsOfCategory (category : number) {
    let filteredFoods : Array<Todo> = []
    if (this.foods) {
      filteredFoods = this.foods
        .filter(food => food.category == category)
    }
    return filteredFoods

  }*/

  async scheduleNotification() {
    const today = new Date();
    this.todos?.forEach(async (todo) => {
      const todoDate = todo.doneDate;

      if (todoDate === today) {
        let options: ScheduleOptions = {
          notifications: [{
            title: 'Todo Reminder',
            body: todo.title,
            id: todo.id,
            schedule: { at: todoDate }
          }
        ]
        }
        try {
          await LocalNotifications.schedule(options);
        } catch (error: any) {
          console.error(error);
        }
      }

    

    });
  }
       
  

  getTodoOfLocation (location : string) {
    let filteredTodos : Array<Todo> = []
    if (this.todos) {
      filteredTodos = this.todos
        .filter(todo => todo.location == location)
    }
    return filteredTodos
  }

  async handleRefresh (event : any) {
    await this.loadData()
    event.target.complete()
  }


  async edit (todo:Todo) {
    await this.router.navigate(['tabs/tab4/todo', todo.id])
  }
  async create() {
    await this.router.navigate(['tabs/tab4/todo'])
  }

  delete (todo:Todo) {
    this.todoService.deleteTodo(todo)
      .then(payload =>  {
        this.todoService.getTodos()
          .then(data => {
            this.todos = data
          })
      })
  }

}
