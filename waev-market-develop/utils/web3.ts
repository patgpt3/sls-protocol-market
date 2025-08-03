import { SiweMessage } from "siwe";
import { chainId } from "@/web3/config";

export const walletSignin = async (
  nonce: string,
  address: `0x${string}` | undefined,
  signMessage: Function
) => {
  const messageRaw = new SiweMessage({
    domain: window.location.host,
    address: address,
    statement: "Wallet authentication by signing a message",
    uri: window.location.origin,
    version: "1",
    chainId: chainId,
    nonce: nonce,
  });
  const message = messageRaw.prepareMessage();
  await signMessage({ message });
  return message;
};
