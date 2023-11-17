import { Injectable } from "@angular/core";

import { LoadingController } from "@ionic/angular";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Todo as Todo } from "src/app/data/todo";
import { environment } from "src/environments/environment";

export const TODO_TABLE = 'todo'

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  private supabase: SupabaseClient

  constructor (private loadingCtrl: LoadingController) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  createLoader() {
    return this.loadingCtrl.create()
  }
  
  async uploadImage(file: File) {
    const filePath = `uploads/${file.name}`;
    let { error } = await this.supabase.storage.from('images').upload(filePath, file);
  
    if (error) {
      throw error;
    }
  
    return `https://your-supabase-url/storage/v1/object/public/images/${filePath}`;
  }

  /**async getCategories () {
    const { data, error } = await this.supabase
      .from(CATEGORIES_TABLE)
      .select('*')
      .order('name')

    return data || []
  }*/

  async getTodo (id: number) {
    const { data, error } = await this.supabase
      .from(TODO_TABLE)
      .select('*')
      .eq('id', id)
      .single()

    return data
  }

  async getTodos () {
    const { data, error} = await this.supabase
      .from(TODO_TABLE)
      .select('*')
      .order('title')

    return data
  }

  async updateTodo (todo: Todo, imageFile: File) {
    const imageUrl = imageFile?await this.uploadImage(imageFile):'';

    if (!todo.id || !todo.title || !todo.description || !todo.doneDate || !todo.location) {
        console.log
        ('Invalid todo object');
    }

    const {data, error} = await this.supabase
      .from(TODO_TABLE)
      .update({
        id:todo.id, 
        title:todo.title, 
        description:todo.description, 
        doneDate:todo.doneDate,
        image:imageUrl, 
        location:todo.location })
      .eq('id', todo.id)
      .select()

    return data
  }

  async createTodo (todo: Todo, imageFile: File) {
    const imageUrl = imageFile?await this.uploadImage(imageFile):'';
    const { data, error } = await this.supabase
      .from(TODO_TABLE)
      .insert({
        title: todo.title,
        description: todo.description,
        doneDate: todo.doneDate,
        image: imageUrl,
        location: todo.location
      })
      .select('*')
      .single();

    return data
  }

  async deleteTodo (todo: Todo) {
    const {data, error} = await this.supabase
      .from(TODO_TABLE)
      .delete()
      .eq('id', todo.id)
      .select()

    return data
  }

}
