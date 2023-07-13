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
} from "firebase/firestore";
import { useAuth } from "../../../../firebase/auth";
import { contactSchema } from "../schema/contactSchema";
import { useToastMessages } from "@/components/message/useToastMessages";
import { db } from "../../../../firebase/firebase";

export const useContact = () => {
  const params = useParams();
  console.log(params.contact);
  const { authUser } = useAuth();
  const { Success, Warn } = useToastMessages();

  const [allMessages, setMessages] = useState([]);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    if (!!authUser) {
      handleFetch(authUser.email);
    }
  }, [authUser]);

  useEffect(() => {
    if (params.contact) {
      // Fetch the data only when params.contact is true
      handleFetchMessage(params.contact);
    }
  }, [params.contact]);

  const handleFetchMessage = async (contactId) => {
    try {
      const q = query(
        collection(db, "contactus/"),
        where("id", "==", contactId)
      );
      const querySnapshot = await getDocs(q);
      let data = [];

      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });

      setMessage(data);
      console.log("Updated message:", message);
    } catch (error) {
      console.error(error);
    }
  };

  const initialValues = {
    name: "",
    email: authUser ? authUser.email : "",
    message: "",
  };

  const handleDelete = async (id) => {
    try {
      deleteDoc(doc(db, "contactus", id));
      Success("Message  Successful Deleted :)");
      handleFetch(authUser.email);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFetch = async (email) => {
    try {
      const q = query(collection(db, "contactus"), where("email", "==", email));
      const querySnapshot = await getDocs(q);

      console.log("i fetch:=",querySnapshot);
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
    const { name, email, message } = values;
    try {
      const docRef = await addDoc(collection(db, "contactus"), {
        subject: name,
        email: email,
        message: message,
      });
      Success("Message  Successful Delivered");
      handleFetch(email);
    } catch (error) {
      console.log(error);
      Warn("Message Not Delivered !");
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
