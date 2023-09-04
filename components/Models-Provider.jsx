"use client";
import {
  useEffect,
  useState,
} from "react";

import ProModal from "./ProModal";

const ModalProvider = () => {
  // Avoid the Hydration Mismatch error by using useState
  const [mounted, setMounted] =
    useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      <ProModal />
    </>
  );
};

export default ModalProvider;
