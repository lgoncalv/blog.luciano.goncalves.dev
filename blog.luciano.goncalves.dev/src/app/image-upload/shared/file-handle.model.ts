import { SafeUrl } from '@angular/platform-browser';
import { AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';

// export interface FileHandleList {
//   [index: string]: FileHandle;
// }

export interface FileHandle {
    id: string,
    reference?: AngularFireStorageReference | undefined,
    task?: AngularFireUploadTask | undefined,
    file: File,
    url: SafeUrl,
    uploadProgress?: Observable<number>;
    downloadUrl?: Observable<string>;
    uploaded?: boolean;
  }
  