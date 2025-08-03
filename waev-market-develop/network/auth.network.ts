"use client";

import axios from "axios";
import { AccountVerifyPayload, AccountNoncePayload } from "@/types/auth";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"; // todo - change the url and move from here
export const ACCOUNT_NONCE_URL = `${API_URL}/market_public/accounts/nonce`;
export const ACCOUNT_VERIFY_URL = `${API_URL}/market_public/accounts/verify`;

export const apiAccountNonce = (
  data: AccountNoncePayload
): Promise<Response> => {
  return axios.post(ACCOUNT_NONCE_URL, data);
};

export const apiAccountVerify = (
  data: AccountVerifyPayload
): Promise<Response> => {
  return axios.post(ACCOUNT_VERIFY_URL, data);
};
