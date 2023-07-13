import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { useToastMessages } from "@/components/message/useToastMessages";
import { registerSchema } from "../schema/registerSchema";

import { auth } from "../../../../firebase/firebase";
import { useAuth } from "../../../../firebase/auth";

const provider = new GoogleAuthProvider();

export const useRegister = () => {
  const router = useRouter();

  const { Success, Warn } = useToastMessages();
  const { setAuthUser } = useAuth();
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleNavigate = (url) => {
    router.push(`/${url}`);
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, provider);
      Success("LoggedIn 😄");
      handleNavigate("contact");
    } catch (error) {
      console.error("Error..", error);
      Warn("Something Wrong :(");
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    const { name, email, password } = values;

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, { displayName: name });
      setAuthUser({
        uid: user.uid,
        email: user.email,
        name: user.displayName,
      });
      Success("Registration DONE 😄");
      handleNavigate("contact");
      resetForm();
    } catch (error) {
      Warn("Something Wrong  😑!");
    }
  };

  return {
    initialValues,
    schema: registerSchema,
    handleSubmit,
    navigate: handleNavigate,
    googleSignUp: handleGoogleSignUp,
  };
};
