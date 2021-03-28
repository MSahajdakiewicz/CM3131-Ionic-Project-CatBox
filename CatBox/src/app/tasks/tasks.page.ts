import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})

  //--------------------------------------------------------

export class TasksPage implements OnInit {

  tasks: any;

  //--------------------------------------------------------

  constructor(private alertController: AlertController, private storage: Storage) { }

  //--------------------------------------------------------

  ngOnInit() {
    this.tasks = [];

    this.storage.get('tasks').then((data) => {
      if (data) {
        this.tasks = data;
      }
    });
  }

  //--------------------------------------------------------

  //---Add new task
  async addNewTask() {
    const alert = await this.alertController.create({
      header: 'New Task 🐱',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Pet all the cats in the world!'
        },
        {
          name: 'datetime',
          type: 'datetime-local',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, 
        {
          text: 'Add Task',
          handler: (data) => {
            data.isCompleted = false;

            let temp = this.tasks
            temp.push(data)

            temp.sort(function (a, b) {
              return +new Date(a.datetime) - +new Date(b.datetime);
            });

            this.tasks = temp

            this.storage.set('tasks', this.tasks);
          }
        }
      ]
    });
    await alert.present();
  }

  //--------------------------------------------------------

  //---Delete task
  delete(index) {
    console.log(index);
    this.tasks.splice(index,1);
    this.storage.set("tasks", this.tasks);
  }

  //--------------------------------------------------------

  //---Mark task as done
  mark(task) {
    task.isCompleted = !task.isCompleted;
    this.storage.set("tasks", this.tasks);
    console.log(task);
  }

}
