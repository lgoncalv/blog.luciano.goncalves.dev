import { Component, OnDestroy } from '@angular/core';
import { FileHandle } from '../shared/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireStorage } from 'angularfire2/storage'
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'lgblog-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  host: {
    "(window:paste)": "onFilePaste($event)"
  }
})
export class UploadComponent implements OnDestroy {
  files: { [index: string]: FileHandle } = {};
  objectKeys = Object.keys;

  private subscriptions: Subscription[] = [];

  constructor(private sanitizer: DomSanitizer,
    private afStorage: AngularFireStorage) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }

  onFilesDropped(droppedfiles: File[]) {
    this.prepareFiles(droppedfiles);
    this.uploadFiles();
  }

  onFilesSelected() {
    const inputNode: any = document.querySelector('#file');
    this.prepareFiles(inputNode.files);
    this.uploadFiles();
  }

  onFilePaste(event: ClipboardEvent) {
    if (
      event.clipboardData &&
      event.clipboardData.files &&
      event.clipboardData.files.length &&
      this.isImageFile(event.clipboardData.files[0])
    ) {
      this.prepareFiles([event.clipboardData.files[0]]);
      this.uploadFiles();
    }
  }

  private isImageFile(file: File): boolean {
    return (file.type.search(/^image\//i) === 0);
  }

  private prepareFiles(files: File[]) {
    for (let i = 0; i < files.length; i++) {
      const randomId = Math.random().toString(36).substring(2);
      const file = files[i];
      const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
      this.files[randomId] = { id: randomId, file, url, uploaded: false };
    }
  }

  private uploadFiles() {
    Object.keys(this.files).forEach(key => {
      this.files[key].reference = this.afStorage.ref(key);
      this.files[key].task = this.files[key].reference.put(this.files[key].file);
      this.files[key].uploadProgress = this.files[key].task.percentageChanges();
      this.subscriptions.push(this.files[key].task.snapshotChanges().pipe(finalize(() => {
        this.files[key].downloadUrl = this.files[key].reference.getDownloadURL();
        this.files[key].uploaded = true;
      })).subscribe());
    });
  }

  deleteImage(key: string) {
    this.subscriptions.push(this.files[key].reference.delete().subscribe(() => {
      delete this.files[key];
    }));
  }

  copyImageUrl(imagUrl: string): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = imagUrl;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
