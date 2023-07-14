"use client";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useParams } from "next/navigation";
import { useContact } from "./hook/useContact";
import { useAuth } from "../../../firebase/auth";
import View from "./View";

const Contact = () => {
  const params = useParams();
  const { authUser } = useAuth();

  const { initialValues, schema, handleSubmit, handleDelete, allMessages } =
    useContact();

  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="flex justify-center items-center p-8">
            <div className="bg-blue-300 flex flex-col justify-center items-start  p-10 gap-4">
              <h1>{authUser ? `Welcome ${authUser.name}` : "Welcome"}</h1>
              <div className="flex flex-col justify-center items-start gap-3">
                <label>Subject</label>
                <Field
                  type="text"
                  name="subject"
                  id="subject"
                  className="h-10 rounded-sm p-2"
                />
                <ErrorMessage
                  name="subject"
                  component="div"
                  className="text-red-600 font-semibold"
                />
              </div>
              <div className="flex flex-col justify-center items-start gap-3">
                <label>Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="h-10 rounded-sm p-2"
                  readOnly
                />
              </div>
              <div className="flex flex-col justify-center items-start gap-3">
                <label>Message</label>
                <Field
                  as="textarea"
                  name="message"
                  id="message"
                  className="h-20 rounded-sm p-2"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-red-600 font-semibold"
                />
              </div>
              <button
                type="submit"
                className="bg-slate-700 p-3 text-white font-bold rounded-lg"
              >
                {params.contact ? "Update It !" : "  Send It !"}
              </button>
            </div>
          </div>
        </Form>
      </Formik>
      <View messages={allMessages} handleDelete={handleDelete} />
    </>
  );
};

export default Contact;
