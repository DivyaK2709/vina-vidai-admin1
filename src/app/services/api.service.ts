import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  async uploadProfileImage(file: File, uid: string): Promise<string> {
    const storage = getStorage();
    const storageRef = ref(storage, `profileImages/${uid}/${file.name}`);

    try {
      // ✅ Read file as ArrayBuffer if you want explicit binary data upload
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      // ✅ Upload as binary bytes
      await uploadBytes(storageRef, uint8Array);

      // ✅ Get and return the download URL
      const url = await getDownloadURL(storageRef);
      console.log('Uploaded file URL:', url);
      return url;

    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }
}
