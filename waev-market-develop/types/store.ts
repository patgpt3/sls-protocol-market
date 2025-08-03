import { OfferType, ApiOfferType } from "./offers";

export interface authStateType {
  isConnected: boolean;
  isAuth: boolean;
  nonce: string;
  signinMessage: string | null;
}

export interface contractStateType {
  deploymentId?: string | null;
  publicOffers: OfferType[] | null;
  accountOffers: OfferType[] | null;
  offerIds: BigInt[] | null;
}

export interface apiDataStateType {
  apiPublicOffers: ApiOfferType[];
}

export interface StoreStateType {
  auth: authStateType;
  contract: contractStateType;
  api_data: apiDataStateType;
}
