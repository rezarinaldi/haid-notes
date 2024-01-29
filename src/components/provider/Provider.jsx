"use client";

import { Toaster } from "react-hot-toast";
import { NextUIProvider } from "@nextui-org/react";

export const Provider = ({ children }) => {
  return (
    <NextUIProvider>
      <div>{children}</div>
      <Toaster />
    </NextUIProvider>
  );
};
