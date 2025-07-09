import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private storage = getStorage(); // ✅ initialize here

  constructor() {}

  async uploadProfileImage(file: File, uid: string): Promise<string> {
    const storageRef = ref(this.storage, `profile_images/${uid}/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  }
}
