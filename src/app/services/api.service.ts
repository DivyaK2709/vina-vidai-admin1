import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private storage = getStorage(); // Correct Firebase Storage instance

  constructor() {}

  async uploadProfileImage(file: File, uid: string): Promise<string> {
    // ✅ Correct path — do NOT put http:// or https://
    const storageRef = ref(this.storage, `profile_images/${uid}/${file.name}`);

    // ✅ Upload the file
    await uploadBytes(storageRef, file);

    // ✅ Get the download URL
    const url = await getDownloadURL(storageRef);
    return url; // Return the photo URL to save in Firestore
  }
}
