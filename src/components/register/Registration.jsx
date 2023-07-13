"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FcGoogle } from "react-icons/fc";
import { useRegister } from "./hook/useRegister";
import { useAuth } from "../../../firebase/auth";
import { useEffect } from "react";
import Loading from "../loader/Loading";
const Registration = () => {
  const { initialValues, schema, handleSubmit, navigate, googleSignUp } =
    useRegister();

  const { authUser, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && authUser) {
       navigate("contact");
    }
  }, [isLoading, authUser]);
  return isLoading || (!isLoading && authUser) ? (
    <Loading />
  ) : (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form>
          <main className="flex lg:h-[100vh]">
            <div className="w-full  p-8 md:p-14 flex items-center justify-center ">
              <div className="p-8 w-[600px]">
                <h1 className="text-6xl font-semibold">Sign Up</h1>
                <p className="mt-6 ml-1">
                  Already have an account ?{" "}
                  <span
                    className="underline hover:text-blue-400 cursor-pointer"
                    onClick={() => {
                      navigate("login");
                    }}
                  >
                    Login
                  </span>
                </p>

                <div
                  className="bg-black/[0.05] text-white w-full py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90 flex justify-center items-center gap-4 cursor-pointer group"
                  onClick={() => {
                    googleSignUp();
                  }}
                >
                  <FcGoogle size={22} />
                  <span className="font-medium text-black group-hover:text-white">
                    Login with Google
                  </span>
                </div>

                <div className="mt-10 pl-1 flex flex-col">
                  <label>Name</label>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-600 font-semibold"
                  />
                </div>
                <div className="mt-10 pl-1 flex flex-col">
                  <label>Email</label>
                  <Field
                    type="text"
                    name="email"
                    id="email"
                    className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600 font-semibold"
                  />
                </div>
                <div className="mt-10 pl-1 flex flex-col">
                  <label>Password</label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600 font-semibold"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-black text-white w-44 py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </main>
        </Form>
      </Formik>
    </>
  );
};

export default Registration;
