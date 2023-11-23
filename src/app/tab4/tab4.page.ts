import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';
import { Router, RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { trashBin } from 'ionicons/icons';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [IonicModule, TodoListComponent, TodoDetailComponent, RouterModule]
})
export class Tab4Page {

  constructor(
      private router : Router
  ) {
    addIcons({ trashBin })
  }

  async create () {
    await this.router.navigate(['tabs/tab4/todo'])
  }

}
