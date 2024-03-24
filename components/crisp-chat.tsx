

"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("28d7da67-77ad-4417-a333-1aaaa29006ca");
  }, []);

  return null;
};