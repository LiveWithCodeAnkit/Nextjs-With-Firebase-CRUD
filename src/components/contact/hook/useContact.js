import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  addDoc,
  collection,
  where,
  query,
  deleteDoc,
  updateDoc,
  doc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../firebase/auth";
import { contactSchema } from "../schema/contactSchema";
import { useToastMessages } from "@/components/message/useToastMessages";
import { db } from "../../../../firebase/firebase";

export const useContact = () => {
  const params = useParams();
  const router = useRouter();
  const { authUser } = useAuth();
  const { Success, Warn } = useToastMessages();
  const [allMessages, setMessages] = useState([]);
  const [messageUp, setMessage] = useState([]);

  useEffect(() => {
    if (!!authUser) {
      handleFetch(authUser.email);
    }
  }, [authUser]);

  useEffect(() => {
    if (params.contact) {
      handleFetchMessage(params.contact);
    } else {
      setMessage({});
    }
  }, [params.contact]);

  const handleFetchMessage = async (contactId) => {
    try {
      const docRef = doc(db, "contactus", contactId);

      const querySnapshot = await getDoc(docRef);

      if (querySnapshot.exists()) {
        const data = querySnapshot.data();

        setMessage(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const initialValues = {
    subject: messageUp && messageUp.subject ? messageUp.subject : "",
    email: authUser ? authUser.email : "",
    message: messageUp && messageUp.message ? messageUp.message : "",
  };

  const handleDelete = async (id) => {
    try {
      deleteDoc(doc(db, "contactus", id));
      Success("Message  Successful Deleted :)");
     await handleFetch(authUser.email);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFetch = async (email) => {
    try {
      const q = query(collection(db, "contactus"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      let data = [];

      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setMessages(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    const { subject, email, message } = values;
    try {
      if (params.contact !== undefined && params.contact !== "") {
        const docRef = doc(db, "contactus", params.contact);
        await updateDoc(docRef, values);
        router.push("/contact");
      } else {
        const docRef = await addDoc(collection(db, "contactus"), {
          subject: subject,
          email: email,
          message: message,
        });
      }

      Success("Message  Successful Delivered");
      handleFetch(email);
    } catch (error) {
      console.error(error);
      Warn("Something Wrong");
    }

    resetForm();
  };

  return {
    initialValues,
    schema: contactSchema,
    handleSubmit,
    handleDelete,
    allMessages,
  };
};
