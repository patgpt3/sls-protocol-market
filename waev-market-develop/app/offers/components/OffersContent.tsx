"use client";

import { useEffect, useState, useMemo } from "react";
import OfferItem from "@/components/OfferItem";
import { useSelector, useDispatch } from "react-redux";
import { StoreStateType } from "@/types/store";
import { WaevAvatarIcon } from "@/components/WaevAvatar";
import MarketJson from "@/abi/Market.json";
import { useContractWrite, useAccount } from "wagmi";
import AddOfferDialog from "./AddOfferDialog";
import { marketAddress, chainId } from "@/web3/config";
import { Contract, Signer } from "ethers";
import {
  useEthersSigner,
  useGetPublicOffers,
  useDeleteOffer,
  useGetContractOffers,
} from "@/hooks";
import { setApiPublicOffers, setAccountOffers, setPublicOffers } from "@/store";

export default function OffersContent() {
  const dispatch = useDispatch();
  const ethersSigner = useEthersSigner();
  const { address } = useAccount();
  const { getAccountOffers } = useGetContractOffers();

  const { deploymentId, accountOffers, publicOffers } = useSelector(
    (state: StoreStateType) => state.contract
  );
  const { apiPublicOffers } = useSelector(
    (state: StoreStateType) => state.api_data
  );

  const [marketContract, setMarketContract] = useState<Contract | null>(null);
  const [removeOfferId, setRemoveOfferId] = useState<string | null>(null);

  const { mutate: deleteOfferApiData } = useDeleteOffer(removeOfferId);

  const {
    isLoading, // to do - use this for processing notification
    isSuccess: isRemoveSuccess,
    write: remove,
  } = useContractWrite({
    address: marketAddress,
    abi: MarketJson.abi,
    functionName: "removeOffer",
    chainId: chainId,
  });

  const getMarketContract = async (signer: Signer) => {
    const marketplaceContract = await new Contract(
      marketAddress,
      MarketJson.abi,
      signer
    );
    setMarketContract(marketplaceContract);
  };

  const { data: apiPublicOffersData, refetch: getApiPublicOffers } =
    useGetPublicOffers();

  useEffect(() => {
    ethersSigner && getMarketContract(ethersSigner);
  }, [ethersSigner]);

  useEffect(() => {
    if (deploymentId) {
      getApiPublicOffers();
    }
  }, [deploymentId]);

  useEffect(() => {
    if (apiPublicOffersData) {
      dispatch(setApiPublicOffers(apiPublicOffersData));
    }
  }, [apiPublicOffersData]);

  useEffect(() => {
    if (apiPublicOffers && deploymentId && address && marketContract) {
      getAccountOffers(marketContract, apiPublicOffers, deploymentId, address);
    }
  }, [apiPublicOffers, deploymentId, marketContract]);

  useEffect(() => {
    if (isRemoveSuccess && removeOfferId) {
      deleteOfferApiData();
      if (accountOffers) {
        const filteredAccountOffers = accountOffers.filter(
          (item) => item.id !== removeOfferId
        );
        dispatch(setAccountOffers(filteredAccountOffers));
      }
      if (publicOffers) {
        const filteredPublicOffers = publicOffers.filter(
          (item) => item.id !== removeOfferId
        );

        dispatch(setPublicOffers(filteredPublicOffers));
      }
      setRemoveOfferId(null);
    }
  }, [isRemoveSuccess]);

  return (
    <div className="w-full xl:w-[1200px]">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl text-slate-400 font-semibold">
          Your Market Offers
        </h1>
        {marketContract && deploymentId && (
          <AddOfferDialog
            deploymentId={deploymentId}
            contract={marketContract}
          />
        )}
      </div>
      {accountOffers ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-10">
          {accountOffers.map((offer) => {
            return (
              <OfferItem
                key={offer.id}
                offer={offer}
                deploymentId={deploymentId}
                purchase={() => {}}
                remove={remove}
                setRemoveOfferId={setRemoveOfferId}
              />
            );
          })}
        </div>
      ) : (
        <div className="w-full flex justify-center mt-10">
          <WaevAvatarIcon alt="loading" isAnimating={true} size="lg" />
        </div>
      )}
    </div>
  );
}
