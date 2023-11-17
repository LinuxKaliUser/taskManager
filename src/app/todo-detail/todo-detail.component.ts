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
  //todoForm: FormGroup<{ id: FormControl<number | 0>; title: FormControl<string | ''>; description: FormControl<string | ''>; doneDate: FormControl<string | null>; Image: FormControl<Blob | null >; location: FormControl<string | ''>; }> ;

  public todoForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    doneDate: new FormControl(null, Validators.required), // This is now typed to allow Date or null
    image: new FormControl(null, Validators.required),
    location: new FormControl('', Validators.required)
  });

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
              title: [this.todo?.title || '', Validators.required],
              description: [this.todo?.description || '', Validators.required],
              doneDate: [this.todo?.doneDate || null, Validators.required],
              image: [this.todo?.image || null, Validators.required],
              location: [this.todo?.location || '', Validators.required],
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
      this.todoService.updateTodo(this.todo)
        .then(payload=>{
          this.back()
        })
      } else {
        this.todoService.createTodo(this.todo)
          .then(payload=>{
            this.back()
          })
      }
  }


}
