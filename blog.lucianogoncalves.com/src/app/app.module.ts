import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import {
  MatToolbarModule,
  MatCardModule,
  MatDividerModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";

import { FlexLayoutModule } from "@angular/flex-layout";
import { PostComponent } from "./post/post.component";
import { PostListComponent } from "./post/post-list.component";
import { PostService } from "./post.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireModule } from "angularfire2";

import { RouteRoutingModule } from "./route/route-routing.module";
import { PostEditComponent } from "./post/post-edit.component";
import { environment } from "../environments/environment";
import { AuthService } from "./auth/auth.service";
import { AuthGuard } from "./auth/auth.guard";
import { LoginComponent } from "./login/login.component";
import { AddAuthHeaderInterceptor } from "./auth/add-auth-header-interceptor";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostComponent,
    PostListComponent,
    PostEditComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    HttpClientModule,
    RouteRoutingModule,
    AngularFireModule.initializeApp(environment.firebird),
    AngularFireAuthModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddAuthHeaderInterceptor,
      multi: true
    },
    PostService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
