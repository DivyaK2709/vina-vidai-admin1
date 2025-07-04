import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TabsPage,
        children: [
          // your tab child routes here
        ]
      }
    ]),
    TabsPage  // ✅ ADD THIS for standalone component
  ]
})
export class TabsPageModule {}
