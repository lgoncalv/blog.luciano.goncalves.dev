import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { PostListPageComponent } from './posts/container/post-list-page/post-list-page.component';
import { HttpClientModule } from '@angular/common/http';
import { PostListComponent } from './posts/presentation/post-list/post-list.component';
import { PostComponent } from './posts/presentation/post/post.component';
import { PostSummaryComponent } from './posts/presentation/post-summary/post-summary.component';
import { PostPageComponent } from './posts/container/post-page/post-page.component';
import { HttpErrorInterceptorProvider } from './404.interceptor';
import { MarkdownModule } from 'ngx-markdown';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostListPageComponent,
    PostListComponent,
    PostComponent,
    PostSummaryComponent,
    PostPageComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    AppRoutingModule,
    MarkdownModule.forRoot()
  ],
  providers: [HttpErrorInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
