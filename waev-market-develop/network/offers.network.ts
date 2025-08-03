"use client";

import axios from "axios";
import { CreateOfferPayload } from "@/types/offers";
import { marketAddress } from "@/web3/config";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"; // todo - change the url and move from here
export const PUBLIC_OFFERS_URL = `${API_URL}/market_public/${marketAddress}/offers`;
export const OFFER_URL = `${API_URL}/market/${marketAddress}/offers`;

export const apiGetPublicOffers = (): Promise<Response> => {
  return axios.get(PUBLIC_OFFERS_URL, {});
};

export const apiCreateOffer = (data: CreateOfferPayload): Promise<Response> => {
  return axios.post(OFFER_URL, data);
};

export const apiDeleteOffer = (id: string) => {
  return axios.delete(`${OFFER_URL}/${id}`, {});
};
