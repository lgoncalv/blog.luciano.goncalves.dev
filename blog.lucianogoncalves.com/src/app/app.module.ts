import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { MatToolbarModule, MatDividerModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";

import { FlexLayoutModule } from "@angular/flex-layout";
import { PostComponent } from './post/post.component';
import { PostListComponent } from './post/post-list.component';
import { PostService } from './post.service';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, HeaderComponent, PostComponent, PostListComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatDividerModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [ PostService ],
  bootstrap: [AppComponent]
})
export class AppModule {}
