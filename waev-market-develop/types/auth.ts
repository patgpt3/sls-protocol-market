export interface AccountNoncePayload {
  data: {
    type: "market_accounts";
    attributes: {
      account_address: `0x${string}`;
    };
  };
}

export interface AccountVerifyPayload {
  data: {
    type: "market_accounts";
    attributes: {
      account_address: `0x${string}`;
      message: string | null;
      signature: `0x${string}`;
    };
  };
}
