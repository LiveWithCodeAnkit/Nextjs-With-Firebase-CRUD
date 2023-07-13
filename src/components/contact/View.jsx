"use client";
import { useRouter } from "next/navigation";
import { Typography } from "@material-tailwind/react";
import { BsPencilFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";

const TABLE_HEAD = ["Subject", "Email", "Message", "Action"];

const View = ({ messages, handleDelete }) => {
  const router = useRouter();
  const handleUpdate = (id) => {
    router.push(`/contact/${id}`);
  };
  return (
    <>
      <table className="mt-4 w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head, index) => (
              <th
                key={head}
                className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                >
                  {head}{" "}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {messages.map(({ id, email, subject, message }, index) => {
            const isLast = index === messages.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={id}>
                <td className={classes}>
                  <div className="flex flex-col">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {subject}
                    </Typography>
                  </div>
                </td>

                <td className={classes}>
                  <div className="flex flex-col">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {email}
                    </Typography>
                  </div>
                </td>

                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {message}
                  </Typography>
                </td>

                <td className="flex justify-center items-center gap-8 p-3">
                  <button
                    onClick={() => {
                      handleUpdate(id);
                    }}
                  >
                    <BsPencilFill className="text-blue-700 text-xl" />
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(id);
                    }}
                  >
                    <MdDeleteForever className=" text-3xl text-red-500" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default View;
