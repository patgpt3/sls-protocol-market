export type OfferType = {
  id: string;
  title: string;
  description: string;
  price: string;
  deploymentId: string;
  beneficiary: string;
  requiredFlags: string;
  readRoles: string;
  term: string;
};

export interface CreateOfferPayload {
  data: {
    type: "market_offers";
    attributes: {
      offer_id: `0x${string}`;
      account_address: `0x${string}`;
      name: string;
      description: string;
    };
  };
}

export type ApiOfferType = {
  type: "market_public_offers";
  id: `0x${string}`;
  attributes: {
    account_address: `0x${string}`;
    name: string;
    description: string;
  };
};
