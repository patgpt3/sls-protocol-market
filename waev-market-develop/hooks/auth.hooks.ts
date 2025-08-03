"use client";

import axios from "axios";
import { useMutation } from "react-query";
import { apiAccountVerify, apiAccountNonce } from "@/network/auth.network";
import { AccountVerifyPayload, AccountNoncePayload } from "@/types/auth";
import { useDispatch } from "react-redux";
import { setIsAuth, setNonce } from "@/store";

export const useAccountNonce = (
  account_address: `0x${string}` | undefined,
  options?: {}
) => {
  const dispatch = useDispatch();
  return useMutation(
    "AccountNonce",
    () => {
      if (!account_address) {
        return Promise.reject("No account_address provided!");
      }
      const payload: AccountNoncePayload = {
        data: {
          type: "market_accounts",
          attributes: {
            account_address,
          },
        },
      };
      return apiAccountNonce(payload);
    },
    {
      onError: (e) => {
        console.info("Get Nonce Error: ", e);
      },
      onSuccess: (result: any) => {
        const nonce = result?.data?.data?.attributes?.nonce;
        if (nonce) {
          dispatch(setNonce(nonce));
        }
      },
      ...options,
    }
  );
};

export const useAccountVerify = (
  account_address: `0x${string}` | undefined,
  message: string | null,
  signature: `0x${string}` | undefined,
  options?: {}
) => {
  const dispatch = useDispatch();
  return useMutation(
    "AccountVerify",
    () => {
      if (!account_address || !message || !signature) {
        return Promise.reject(
          "No account_address, message or signature provided!"
        );
      }
      const payload: AccountVerifyPayload = {
        data: {
          type: "market_accounts",
          attributes: {
            account_address,
            message,
            signature,
          },
        },
      };
      return apiAccountVerify(payload);
    },
    {
      onError: (e) => {
        console.info("Verify Error", e); // to do - display "Failed Authentication" notification
      },
      onSuccess: (result: any) => {
        const accessToken = result?.data?.data?.attributes?.access_token;
        if (accessToken) {
          localStorage.setItem("access_token", accessToken);
          localStorage.setItem(
            "account_address",
            result?.data?.data?.attributes?.account_address
          );
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
          dispatch(setIsAuth(true));
        } else {
          // to do - display "Failed Authentication" notification
        }
      },
      ...options,
    }
  );
};
