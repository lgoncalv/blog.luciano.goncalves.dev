import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { MatToolbarModule, MatDividerModule, MatButtonModule, MatIconModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";

import { FlexLayoutModule } from "@angular/flex-layout";
import { PostComponent } from './post/post.component';
import { PostListComponent } from './post/post-list.component';
import { PostService } from './post.service';
import { HttpClientModule } from "@angular/common/http";

import { RouteRoutingModule } from './route/route-routing.module';
import { PostEditComponent } from './post/post-edit.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, PostComponent, PostListComponent, PostEditComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    HttpClientModule,
    RouteRoutingModule
  ],
  providers: [ PostService ],
  bootstrap: [AppComponent]
})
export class AppModule {}
