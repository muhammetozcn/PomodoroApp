import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title:'Pomodoro Timer',
      url:'/pomodoro',
      icon:'timer'
    },
    {
      title:'To-Do List',
      url:'/todolist',
      icon:'list-box'
    }

    /* {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
   {
      title: 'Portal',
      url: '/portal',
      icon: 'grid'
    },
    {
      title: 'Player',
      url: '/player',
      icon: 'musical-notes'
    }*/
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
