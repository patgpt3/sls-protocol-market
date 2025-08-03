"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MDInput from "@/components/Elements/MDInput";
import AddCircleIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useAccount, useSignMessage } from "wagmi";
import { parseEther } from "ethers";
import { StoreStateType } from "@/types/store";
import { walletSignin } from "@/utils";
import { setSigninMessage } from "@/store";
import { useAccountVerify, useCreateOffer } from "@/hooks";
import { Contract, TransactionResponse, EventLog } from "ethers";

type AddOfferDialogProps = {
  deploymentId?: string;
  contract: Contract;
};

export default function AddOfferDialog({
  deploymentId,
  contract,
}: AddOfferDialogProps) {
  const dispatch = useDispatch();
  const { address } = useAccount();
  const {
    data: signMessageData,
    signMessage,
    error: signError,
  } = useSignMessage();

  const { isAuth, nonce, signinMessage } = useSelector(
    (state: StoreStateType) => state.auth
  );
  const { apiPublicOffers } = useSelector(
    (state: StoreStateType) => state.api_data
  );

  const [open, setOpen] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [offerTitle, setOfferTitle] = useState("");
  const [offerDescription, setOfferDescription] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [requiredFlags, setRequiredFlags] = useState("1");
  const [readRoles, setReadRoles] = useState("1");
  const [term, setTerm] = useState("1");
  const [dataIds, setDataIds] = useState("");
  const [offerId, setOfferId] = useState(null);

  const clearState = () => {
    setOfferTitle("");
    setOfferDescription("");
    setOfferPrice("");
    setRequiredFlags("1");
    setReadRoles("1");
    setTerm("1");
    setDataIds("");
  };

  const closeDialog = () => {
    setOpen(false);
    clearState();
  };

  const onNewOfferClick = async () => {
    if (isAuth) {
      setOpen(true);
    } else {
      const message = await walletSignin(nonce, address, signMessage);
      console.log("---- sign in message:", message); // to delete
      dispatch(setSigninMessage(message));
      setIsSigning(true);
    }
  };

  const onSubmit = async () => {
    const dataIds = [
      "0x35b7cedc9d1feae95b41395a8e7a5f133c908e302fa8807100284fefa684fc7b",
    ]; // anon
    const price = parseEther(offerPrice);
    const token = "0x0000000000000000000000000000000000000000";

    const newOffer = [
      deploymentId,
      dataIds,
      requiredFlags,
      readRoles,
      term,
      price,
      token,
      address,
    ];
    const txResponse: TransactionResponse = await contract.addOffer(newOffer);
    setOpen(false);

    const txReceipt = await txResponse.wait();
    if (!txReceipt) {
      // to do - Error notification
      console.log(`Add new offer TX not confirmed ${txResponse.hash}`);
      return;
    }
    for (let event of txReceipt.logs) {
      if (!(event instanceof EventLog) || event.args === undefined) continue;
      if (event.eventName != "OfferPosted") continue;
      const newOfferId = event.args[0];
      setOfferId(newOfferId);
      break;
    }
  };

  const { data: newOfferApiData, mutate: createOfferApiCall } = useCreateOffer(
    offerId,
    address,
    offerTitle,
    offerDescription
  );

  useEffect(() => {
    if (offerId) {
      createOfferApiCall();
      clearState();
    }
  }, [offerId]);

  useEffect(() => {
    if (newOfferApiData && deploymentId) {
      // to do - stop/remove processing toaster
      console.log("------------- newOfferApiData:", newOfferApiData); // to delete
    }
  }, [newOfferApiData]);

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
    if (isAuth && isSigning) {
      setOpen(true);
      setIsSigning(false);
    }
  }, [isAuth]);

  useEffect(() => {
    if (signError) {
      setIsSigning(false);
    }
  }, [signError]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        type="button"
        variant="outline"
        className="inline-flex items-center justify-center border-none rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-sky-600 hover:bg-main_gray text-white"
        onClick={onNewOfferClick}
      >
        <AddCircleIcon fontSize="small" className="mr-2" />
        New Offer
      </Button>
      <DialogOverlay className="bg-black/50" />
      <DialogContent className="bg-main_color border-none backdrop:bg-gray">
        <DialogHeader>
          <DialogTitle>New Offer</DialogTitle>
        </DialogHeader>
        <div className="py-3 px-8">
          <div className="pb-4">
            <MDInput
              inputProps={{
                data: `add-offer-title`,
                autoComplete: "off",
              }}
              type="text"
              label={"Offer Title"}
              variant="standard"
              fullWidth
              value={offerTitle}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setOfferTitle(event.target.value)
              }
            />
          </div>
          <div className="pb-4">
            <MDInput
              inputProps={{
                data: `add-offer-description`,
                autoComplete: "off",
              }}
              type="text"
              label={"Offer Description"}
              variant="standard"
              fullWidth
              value={offerDescription}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setOfferDescription(event.target.value)
              }
            />
          </div>
          <div className="pb-4">
            <MDInput
              inputProps={{
                data: `add-offer-term`,
                autoComplete: "off",
              }}
              type="text"
              label={"Access Type"}
              variant="standard"
              fullWidth
              value={term}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setTerm(event.target.value)
              }
            />
            <div className="pb-4">
              <MDInput
                inputProps={{
                  data: `add-offer-price`,
                  autoComplete: "off",
                }}
                type="text"
                label={"Price (WAEV)"}
                variant="standard"
                fullWidth
                value={offerPrice}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setOfferPrice(event.target.value)
                }
              />
            </div>
            <div className="pb-4">
              <MDInput
                inputProps={{
                  data: `add-offer-required-flags`,
                  autoComplete: "off",
                }}
                type="text"
                label={"Required Flags"}
                variant="standard"
                fullWidth
                value={requiredFlags}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setRequiredFlags(event.target.value)
                }
              />
            </div>
            <div className="pb-4">
              <MDInput
                inputProps={{
                  data: `add-offer-read-roles`,
                  autoComplete: "off",
                }}
                type="text"
                label={"Read Roles"}
                variant="standard"
                fullWidth
                value={readRoles}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setReadRoles(event.target.value)
                }
              />
            </div>
          </div>
          {/* <div className="pb-4">
            <MDInput
              inputProps={{
                data: `add-offer-data-ids`,
                autoComplete: "off",
              }}
              type="text"
              label={"Data IDs"}
              variant="standard"
              fullWidth
              value={dataIds}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setDataIds(event.target.value)
              }
            />
          </div> */}
        </div>
        <DialogFooter className="sm:justify-between">
          <Button
            type="button"
            variant="outline"
            className="hover:bg-main_gray"
            onClick={closeDialog}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-sky-600 hover:bg-main_gray text-white"
            onClick={onSubmit}
            disabled={
              !offerTitle ||
              !offerPrice ||
              !requiredFlags ||
              !readRoles ||
              !term
            }
          >
            Post Offer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
