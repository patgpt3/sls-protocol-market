"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { OfferType } from "@/types/offers";
import { usePathname } from "next/navigation";
import { useAlertsService } from "@/components/services/useAlertsService";
import { useAccount, useSignMessage } from "wagmi";
import { parseEther } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { walletSignin } from "@/utils";
import { setSigninMessage } from "@/store";
import { StoreStateType } from "@/types/store";
import { useAccountVerify } from "@/hooks";

type OfferItemProps = {
  offer: OfferType;
  deploymentId?: string | null;
  purchase: Function;
  remove: Function;
  setRemoveOfferId: Function;
};

export default function OfferItem({
  offer,
  deploymentId,
  purchase,
  remove,
  setRemoveOfferId,
}: OfferItemProps) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { address } = useAccount();
  const {
    data: signMessageData,
    signMessage,
    error: signError,
  } = useSignMessage();
  const { setSuccessAlert, setErrorAlert } = useAlertsService();

  const { isAuth, nonce, signinMessage } = useSelector(
    (state: StoreStateType) => state.auth
  );

  const [isSigning, setIsSigning] = useState(false);
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);

  const buyOffer = async (item: OfferType) => {
    if (!address) {
      setErrorAlert("No Wallet Connection", "The wallet is not connected.");
      return;
    }
    // to do - get duration from input
    const duration = 1; // to do - change 1 second to 1 hour as default and minimum
    await purchase({
      args: [[item.id], deploymentId, BigInt(duration)],
      from: address,
      value: parseEther(offer.price),
    });
    // setSuccessAlert("Success", "The offer was successfully purchased.");
  };

  const removeOffer = async (item: OfferType) => {
    if (!address) {
      alert("Wallet not connected"); // to do - notification
      return;
    }
    setRemoveOfferId(item.id);
    if (isAuth) {
      await remove({ args: [item.id] });
    } else {
      setSelectedOfferId(item.id);
      const message = await walletSignin(nonce, address, signMessage);
      dispatch(setSigninMessage(message));
      setIsSigning(true);
    }
  };

  const { mutate: verifyAccount } = useAccountVerify(
    address,
    signinMessage,
    signMessageData
  );

  useEffect(() => {
    if (signMessageData && signinMessage) {
      verifyAccount();
    }
  }, [signMessageData, signinMessage]);

  useEffect(() => {
    if (signError) {
      setIsSigning(false);
      setRemoveOfferId(null);
      setSelectedOfferId(null);
    }
  }, [signError]);

  useEffect(() => {
    if (isAuth && isSigning && selectedOfferId) {
      remove({ args: [selectedOfferId] });
      setIsSigning(false);
      setSelectedOfferId(null);
    }
  }, [isAuth]);

  return (
    <div className="w-[380px] group flex flex-col items-center rounded-md overflow-hidden gap-x-8 bg-main_color cursor-pointer transition py-4 px-8 shadow-[rgba(0,0,0,0.14)_0_0.125rem_0.125rem_0,rgba(0,0,0,0.2)_0_0.1875rem_0.0625rem_-0.125rem,rgba(0,0,0,0.12)_0_0.0625rem_0.3125rem_0]">
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        {/* <p className="truncate w-full pb-4">ID: {offer.id}</p> */}
        {offer.title ? (
          <p className="truncate w-full pb-4">{offer.title}</p>
        ) : (
          <p className="text-slate-500 text-sm pb-4 w-full">No Title</p>
        )}
        {offer.description ? (
          <p className="text-slate-300 text-sm pb-4 w-full truncat">
            {offer.description}
          </p>
        ) : (
          <p className="text-slate-500 text-sm pb-4 w-full">No Description</p>
        )}
        {/* <p className="text-slate-300 text-sm pb-4 w-full truncate">
          {offer.description ? offer.description : "-"}
        </p> */}
        <p className="text-slate-300 text-sm pb-4 w-full truncate">
          Beneficiary: {offer.beneficiary}
        </p>
        <p className="text-slate-300 text-sm pb-4 w-full truncate">
          Private, Anon, Meta
        </p>
        <p className="truncate w-full pb-4">Offer ID: {offer.id}</p>
        <p className="truncate w-full pb-4">
          Deployment ID: {offer.deploymentId}
        </p>
        {/* <p className="text-slate-400 text-sm pb-4 w-full truncate">
          Required Flags: {offer.requiredFlags}
        </p> */}
        {/* <p className="text-slate-400 text-sm pb-4 w-full truncate">
          Read Roles: {offer.readRoles}
        </p> */}
        <p className="text-slate-300 text-sm pb-4 w-full truncate">
          {offer.term === "0"
            ? "Unlimted Duration Access"
            : "Limited Duration Access"}
        </p>
        <p className="truncate w-full pb-4">{`${
          offer.term === "0"
            ? "Unlimited Access Price"
            : "Access Per Second Price"
        }: ${offer.price} WAEV`}</p>
      </div>
      <div className="flex justify-center w-full">
        {pathname === "/offers" && (
          <Button
            className="hover:bg-main_gray"
            variant={"outline"}
            onClick={() => removeOffer(offer)}
          >
            Remove
          </Button>
        )}
        {pathname === "/" && (
          <Button
            className="hover:bg-main_gray"
            variant={"outline"}
            onClick={() => buyOffer(offer)}
          >
            Buy
          </Button>
        )}
      </div>
    </div>
  );
}
