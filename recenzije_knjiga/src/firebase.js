import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDK8GRJ8cp2uMlu77atEwSwTx5S9omZZJA",
  authDomain: "knjigokaz.firebaseapp.com",
  databaseURL: "https://knjigokaz-default-rtdb.firebaseio.com",
  projectId: "knjigokaz",
  storageBucket: "knjigokaz.firebasestorage.app",
  messagingSenderId: "26459470197",
  appId: "1:26459470197:web:4b90350f01346df1d07b3c"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);