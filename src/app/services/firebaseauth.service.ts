import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  UserCredential,
  updateProfile
} from '@angular/fire/auth';
import {
  Firestore,
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs
} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private auth: Auth, private firestore: Firestore) {}

  // 🔹 Generic signup (user or admin based on collection)
  async signUp(email: string, password: string, username: string, collectionName: string): Promise<UserCredential> {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const uid = userCredential.user.uid;

    await setDoc(doc(this.firestore, collectionName, uid), { username, email });
    await updateProfile(this.auth.currentUser!, { displayName: username });

    return userCredential;
  }

  // 🔹 Sign in with username or email from specific collection (users/admins)
  async signInWithUsernameOrEmail(usernameOrEmail: string, password: string, collectionName: string): Promise<UserCredential> {
    let emailToLogin = usernameOrEmail;

    // If input is username, resolve to email via Firestore
    if (!usernameOrEmail.includes('@')) {
      const ref = collection(this.firestore, collectionName);
      const q = query(ref, where('username', '==', usernameOrEmail));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        throw new Error(`${collectionName.slice(0, -1)} username not found`);
      }

      emailToLogin = snapshot.docs[0].data()['email'];
    }

    return await signInWithEmailAndPassword(this.auth, emailToLogin, password);
  }

  // 🔹 Logout
  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  // 🔹 Get all admins (optional utility)
  async getAllAdmins(): Promise<any[]> {
    const adminsRef = collection(this.firestore, 'admins');
    const snapshot = await getDocs(adminsRef);
    const admins: any[] = [];
    snapshot.forEach(doc => admins.push({ id: doc.id, ...doc.data() }));
    return admins;
  }
  
}


