"use client";

import { useEffect, useState } from "react";
import OfferItem from "@/components/OfferItem";
import { WaevAvatarIcon } from "../../../components/WaevAvatar";
import { StoreStateType } from "@/types/store";
import MarketJson from "@/abi/Market.json";
import { useContractWrite } from "wagmi";
import { marketAddress, chainId, defaultRPC } from "@/web3/config";
import { useGetPublicOffers, useGetContractOffers } from "@/hooks";
import { useSelector, useDispatch } from "react-redux";
import { setApiPublicOffers } from "@/store";
import { Contract, ethers } from "ethers";

export default function HomeContent() {
  const dispatch = useDispatch();
  const { getAllOffers } = useGetContractOffers();

  const { deploymentId, publicOffers } = useSelector(
    (state: StoreStateType) => state.contract
  );
  const { apiPublicOffers } = useSelector(
    (state: StoreStateType) => state.api_data
  );

  const [marketContract, setMarketContract] = useState<Contract | null>(null);

  const { write: purchase } = useContractWrite({
    address: marketAddress,
    abi: MarketJson.abi,
    functionName: "purchase",
    chainId: chainId,
  });

  const { data: apiPublicOffersData, refetch: getApiPublicOffers } =
    useGetPublicOffers();

  const getMarketContract = async () => {
    const provider = await new ethers.JsonRpcProvider(defaultRPC);
    const marketplaceContract = new Contract(
      marketAddress,
      MarketJson.abi,
      provider
    );
    setMarketContract(marketplaceContract);
  };

  useEffect(() => {
    getMarketContract();
    getApiPublicOffers();
  }, []);

  useEffect(() => {
    if (apiPublicOffersData) {
      dispatch(setApiPublicOffers(apiPublicOffersData));
    }
  }, [apiPublicOffersData]);

  useEffect(() => {
    if (apiPublicOffers && marketContract) {
      getAllOffers(marketContract, apiPublicOffers);
    }
  }, [apiPublicOffers, marketContract]);

  return (
    <div className="w-full xl:w-[1200px]">
      <h1 className="text-2xl text-slate-400 font-semibold">Market Offers</h1>
      {publicOffers ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-10">
          {publicOffers.map((offer) => {
            return (
              <OfferItem
                key={offer.id}
                offer={offer}
                deploymentId={deploymentId}
                purchase={purchase}
                remove={() => {}}
                setRemoveOfferId={() => {}}
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
