import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterPageComponent } from './register-page/register-page.component';

const routes: Routes = [
  { path: 'register', component: RegisterPageComponent },
  { path: '', component: HomepageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [RegisterPageComponent, HomepageComponent];