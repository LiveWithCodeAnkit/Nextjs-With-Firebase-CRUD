import { useRouter } from "next/navigation";
import { useToastMessages } from "@/components/message/useToastMessages";
import { loginSchema } from "../schema/loginSchema";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "../../../../firebase/firebase";

const provider = new GoogleAuthProvider();

export const useLogin = () => {
  const router = useRouter();

  const { Success, Warn } = useToastMessages();
  const initialValues = {
    email: "",
    password: "",
  };

  const handleNavigate = (url) => {
    router.push(`/${url}`);
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, provider);
      Success("Login DONE 😄");
      handleNavigate("contact");
    } catch (error) {
      console.error("Error..", error);
      Warn("Something Wrong :(");
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    const { email, password } = values;

    try {
      const user = await signInWithEmailAndPassword(auth, email, password);

      Success("Login DONE 😄");
      handleNavigate("contact");
      resetForm();
    } catch (error) {
      Warn("Something Wrong  😑!");
    }
  };

  return {
    initialValues,
    schema: loginSchema,
    handleNavigate,
    handleSubmit,
    googleSignIn: handleGoogleSignUp,
  };
};
