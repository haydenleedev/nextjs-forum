"use client";

import { useRouter } from "next/navigation";
const BackBtn = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.back();
      }}
    >
      Back to List
    </button>
  );
};

export default BackBtn;
