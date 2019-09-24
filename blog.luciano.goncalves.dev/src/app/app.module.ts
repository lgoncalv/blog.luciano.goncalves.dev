import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MatToolbarModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { PostListPageComponent } from './posts/container/post-list-page/post-list-page.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryPostService } from './in-memory-posts.service';
import { PostListComponent } from './posts/presentation/post-list/post-list.component';
import { PostComponent } from './posts/presentation/post/post.component';
import { PostSummaryComponent } from './posts/presentation/post-summary/post-summary.component';
import { PostPageComponent } from './posts/container/post-page/post-page.component';
import { HttpErrorInterceptorProvider } from './404.inerceptor';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostListPageComponent,
    PostListComponent,
    PostComponent,
    PostSummaryComponent,
    PostPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    MatToolbarModule,
    FlexLayoutModule,
    HttpClientModule,
    //HttpClientInMemoryWebApiModule.forRoot(InMemoryPostService, { delay: 100 }),
    AppRoutingModule,
    MarkdownModule.forRoot()
  ],
  providers: [HttpErrorInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
