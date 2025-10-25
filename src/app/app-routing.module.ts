import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.page').then(m => m.ProfilePage)
  },
  {
    path: 'signin',
    loadComponent: () => import('./signin/signin.page').then(m => m.SigninPage),
  },
   {
    path: 'upload',
    loadComponent: () => import('./upload/upload.page').then( m => m.UploadPage)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'test',
        loadComponent: () => import('./test/test.page').then(m => m.TestPage)
      },
      {
        path: 'progress',
        loadComponent: () => import('./progress/progress.page').then(m => m.ProgressPage)
      },
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then(m => m.HomePage)
      },
      {
        path: 'search',
        loadComponent: () => import('./search/search.page').then(m => m.SearchPage)
      },
      {
        path: 'settings',
        loadComponent: () => import('./settings/settings.page').then(m => m.SettingsPage)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
