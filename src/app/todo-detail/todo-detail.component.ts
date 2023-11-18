import { Component, OnInit } from '@angular/core';
import { Todo } from '../data/todo';
import { CommonModule } from '@angular/common';
import { TodoService } from '../services/todo.service';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss'],
  imports: [IonicModule,FormsModule,ReactiveFormsModule,CommonModule],
  standalone: true
})
export class TodoDetailComponent  implements OnInit {

  todo : Todo = new Todo()

  public todoForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    title: new FormControl(''),
    description: new FormControl(''),
    doneDate: new FormControl(null), // This is now typed to allow Date or null
    image: new FormControl(''),
    location: new FormControl('')
  });
  imageFile: any;

  constructor(
      private todoService : TodoService,
      private formBuilder : FormBuilder,
      private router : Router,
      private route : ActivatedRoute) { }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id') !== null) {
        const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);
        this.todoService.getTodo(id).then(
          data => {
            this.todo = data
            this.todoForm = this.formBuilder.group({
              id: [this.todo?.id || 0],
              title: [this.todo?.title || ''],
              description: [this.todo?.description || ''],
              doneDate: [this.todo?.doneDate || null],
              image: [this.todo?.image || ''],
              location: [this.todo?.location || ''],
            });
        })
    }
  
  }

  async back () {
    await this.router.navigate(['tabs','tab4'])
  }

  saveTodo (formData : any) {
    this.todo = Object.assign(formData)

    if (this.todo.id) {
      this.todoService.updateTodo(this.todo, this.imageFile)
        .then(payload=>{
          this.back()
        })
      } else {
        this.todoService.createTodo(this.todo,  this.imageFile)
          .then(payload=>{
            this.back()
          })
      }
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

  if (input && input.files && input.files.length) {
    this.imageFile = input.files[0];
  }
  }


}
