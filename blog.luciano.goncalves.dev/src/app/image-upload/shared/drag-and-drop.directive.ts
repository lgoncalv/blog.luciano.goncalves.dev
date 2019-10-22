import { Directive, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[lgblogDragAndDrop]'
})
export class DragAndDropDirective {
  @Output() files: EventEmitter<File[]> = new EventEmitter();
  @HostBinding("style.border") border = "4px dashed #eee";

  constructor() { }

  @HostListener("dragover", ["$event"]) 
  public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.border = "4px dashed #999";
  }

  @HostListener("dragleave", ["$event"]) 
  public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.border = "4px dashed #eee";
  }

  @HostListener('drop', ['$event'])
  public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.border = "4px dashed #eee";
  
    let files: File[] = [];
    for (let i = 0; i < evt.dataTransfer.files.length; i++) {
      files.push(evt.dataTransfer.files[i]);
    }
    if (files.length > 0) {
      this.files.emit(files);
    }
  }
}
