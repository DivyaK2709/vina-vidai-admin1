import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  UserCredential,
} from '@angular/fire/auth';
import {
  Firestore,
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  // 🔹 SIGNUP for user or admin
  async signUp(
    email: string,
    password: string,
    username: string,
    collectionName: string
  ): Promise<UserCredential> {
    const userCredential = await createUserWithEmailAndPassword(
      this.auth,
      email.trim().toLowerCase(),
      password
    );
    const uid = userCredential.user.uid;

    // Always store lowercase username/email for easy lookup
    await setDoc(doc(this.firestore, collectionName, uid), {
      uid,
      username: username.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
    });

    await updateProfile(this.auth.currentUser!, { displayName: username });

    return userCredential;
  }

  // 🔹 SIGN-IN with either username or email
  async signInWithUsernameOrEmail(
    usernameOrEmail: string,
    password: string,
    collectionName: string
  ): Promise<UserCredential> {
    let emailToLogin = usernameOrEmail.trim().toLowerCase();

    // ✅ If not email, resolve username -> email
    if (!emailToLogin.includes('@')) {
      const ref = collection(this.firestore, collectionName);
      const q = query(ref, where('username', '==', emailToLogin));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        throw new Error(`❌ Username "${usernameOrEmail}" not found in ${collectionName}`);
      }

      // Use email from Firestore
      const userData = snapshot.docs[0].data();
      emailToLogin = (userData['email'] || '').toLowerCase();
    }

    // ✅ Firebase Authentication
    try {
      return await signInWithEmailAndPassword(this.auth, emailToLogin, password);
    } catch (error: any) {
      console.error('Sign-in failed:', error);
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
        throw new Error('❌ Invalid email or password.');
      }
      if (error.code === 'auth/user-not-found') {
        throw new Error('❌ User not found. Please sign up first.');
      }
      throw new Error('⚠️ ' + error.message);
    }
  }

  // 🔹 LOGOUT
  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  // 🔹 GET ALL ADMINS
  async getAllAdmins(): Promise<any[]> {
    const adminsRef = collection(this.firestore, 'admins');
    const snapshot = await getDocs(adminsRef);
    const admins: any[] = [];
    snapshot.forEach((doc) => admins.push({ id: doc.id, ...doc.data() }));
    return admins;
  }
}
