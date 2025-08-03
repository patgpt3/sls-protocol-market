"use client";

import { useMutation, useQuery } from "react-query";
import {
  apiGetPublicOffers,
  apiCreateOffer,
  apiDeleteOffer,
} from "@/network/offers.network";
import { CreateOfferPayload } from "@/types/offers";
import { useDispatch } from "react-redux";
import { setPublicOffers, setAccountOffers } from "@/store"; // to do

export const useGetPublicOffers = (options?: {}) => {
  const dispatch = useDispatch();
  return useQuery(
    ["PublicOffers"],
    () => {
      return apiGetPublicOffers();
    },
    {
      select: (result: any) => {
        // to do - result type
        return result?.data?.data;
      },
      onError: (error) => {
        console.error("Get Public Offers Error", error);
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      retry: false,
      // cacheTime: Infinity,
      // staleTime: 15 * 60 * 1000, // 15 minutes.
      ...options,
    }
  );
};

export const useCreateOffer = (
  offer_id: `0x${string}` | null,
  account_address: `0x${string}` | undefined,
  name: string,
  description: string,
  options?: {}
) => {
  const { refetch: getPublicOffersCall } = useGetPublicOffers();
  return useMutation(
    "CreateOffer",
    () => {
      if (!offer_id || !account_address || !name) {
        return Promise.reject("No offer_id, account_address or name provided!");
      }
      const payload: CreateOfferPayload = {
        data: {
          type: "market_offers",
          attributes: {
            offer_id,
            account_address,
            name,
            description,
          },
        },
      };
      return apiCreateOffer(payload);
    },
    {
      onError: (e) => {
        console.info("Create Offer Error: ", e); // to do - display notification
      },
      onSuccess: (result: any) => {
        // to do - display notification
        getPublicOffersCall();
        return result?.data?.data;
      },
      ...options,
    }
  );
};

export const useDeleteOffer = (offerId: string | null, options?: {}) => {
  return useMutation(
    async () => {
      if (!offerId) {
        return Promise.reject("No offer ID provided!");
      }
      return apiDeleteOffer(offerId);
    },
    {
      onSuccess: (result) => {
        if (result) {
          // to do - diplay success notification
        }
      },
      onError: (error) => {
        console.error("Error:", error); // to delete
        // to do - diplay error notification
      },
      ...options,
    }
  );
};
