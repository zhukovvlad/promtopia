"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePromt = () => {
  const [setsubmitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    promt: "",
    tag: "",
  });
  return <Form />;
};

export default CreatePromt;
