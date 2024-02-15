import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_auth/auth.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { UpdateDetailsComponent } from './update-details/update-details.component';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';



const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'user', component:UserComponent, canActivate: [AuthGuard], data:{roles:['User']}},
  {path:'admin', component:AdminComponent, canActivate: [AuthGuard], data:{roles:['Admin']}},
  {path:'forbidden', component:ForbiddenComponent},
  {path:'login', component:LoginComponent},
  {path:'add-product', component:AddProductComponent, canActivate: [AuthGuard], data:{}},
  {path:'product-details', component:ProductDetailsComponent, canActivate: [AuthGuard], data:{roles:['Admin']}},
  {path:'view-details/:id', component:ViewDetailsComponent,
},
  {path: 'update-details', component:UpdateDetailsComponent},
  {path: 'imageDialog', component:ImageDialogComponent},
 {path: 'register', component:RegisterComponent},
 {path: 'cart', component:CartComponent, canActivate: [AuthGuard], data:{roles:['User']}}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
