"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useContact } from "./hook/useContact";
import { useAuth } from "../../../firebase/auth";
import View from "./View";

const Contact = () => {
  const { authUser } = useAuth();

  const { initialValues, schema, handleSubmit, handleDelete, allMessages } =
    useContact();



  return (
    <>
      <Formik
        initialValues={initialValues}
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
                  name="name"
                  id="name"
                  className="h-10 rounded-sm p-2"
                />
                <ErrorMessage
                  name="name"
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
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 font-semibold"
                />
              </div>
              <div className="flex flex-col justify-center items-start gap-3">
                <label>Message</label>
                <Field
                  type="textarea"
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
                Send It!
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
