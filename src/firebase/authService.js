import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "./firebaseConfig"; // Ensure this points to your Firebase configuration

const auth = getAuth(app); // Get the Firebase auth instance

// Function to handle Google Sign-In
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider(); // Create a new Google auth provider

  try {
    // Sign in with popup
    const result = await signInWithPopup(auth, provider);

    // Google user info
    const user = result.user;

    // Get user display name, email, and ID token
    const { displayName, email } = user;
    const idToken = await user.getIdToken(); // This token can be used for server-side authentication

    // Return user info (you can also return the token if you need it)
    return { displayName, email, accessToken: idToken };
  } catch (error) {
    console.error("Error during Google sign-in:", error);
    throw error; // You can handle the error further as needed
  }
};
