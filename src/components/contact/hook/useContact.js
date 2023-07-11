import { useState } from "react";
import { contactSchema } from "../schema/contactSchema";
import { useToastMessages } from "@/components/message/useToastMessages";

export const useContact = () => {
  const { Success, Warn } = useToastMessages();
  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    const valueEntry = {
      id: new Date().getTime().toString(),
      ...values,
    };

    console.log("i am values", valueEntry);

    const { id, name, email, message } = valueEntry;

    const res = await fetch(
      "https://curd-fd3f2-default-rtdb.firebaseio.com/student.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, name, email, message }),
      }
    );
    if (res) {
      Success("Message  Successful Delivered");






      const pp = await fetch(
        "https://curd-fd3f2-default-rtdb.firebaseio.com/student.json",
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.parse({ id, name, email, message }),
        }
      );






      console.log(pp);
    } else {
      Warn("Message Not Delivered !");
    }
    resetForm();
  };

  return {
    initialValues,
    schema: contactSchema,
    handleSubmit,
  };
};
