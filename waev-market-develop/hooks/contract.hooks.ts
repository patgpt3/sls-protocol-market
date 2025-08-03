import { Contract, formatEther } from "ethers";
import { useDispatch } from "react-redux";
import {
  addPublicOffer,
  clearPublicOffers,
  addAccountOffer,
  clearAccountOffers,
} from "@/store";
import { ApiOfferType, OfferType } from "@/types/offers";

export const useGetContractOffers = () => {
  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
  const dispatch = useDispatch();

  // to delete
  // const getOffersFromEvents = async (
  //   events: (EventLog | Log)[],
  //   contract: Contract,
  //   apiPublicOffers: ApiOfferType[]
  // ) => {
  //   const offerIds: Set<string> = new Set<string>();
  //   const offerList: OfferType[] = [];

  //   for await (const event of events) {
  //     if (
  //       !(event instanceof EventLog) ||
  //       event.args === undefined ||
  //       offerIds.has(event.args[0])
  //     ) {
  //       continue;
  //     }
  //     const offerId = event.args[0];
  //     const offer = await contract.getOffer(offerId);
  //     if (offer["deploymentId"] == ZERO_BYTES32) continue;
  //     offerIds.add(offerId);
  //     let ethVal = BigInt(0);
  //     if (offer.token == ZERO_ADDRESS) ethVal = offer.price;

  //     const offerApiData = apiPublicOffers.find((item) => item.id === offerId);
  //     const offerObj: OfferType = {
  //       id: offerId,
  //       title: offerApiData?.attributes?.name ?? "",
  //       description: offerApiData?.attributes?.description ?? "",
  //       price: formatEther(ethVal),
  //       deploymentId: offer.deploymentId,
  //       beneficiary: offer.beneficiary,
  //       requiredFlags: offer.requiredFlags.toString(),
  //       readRoles: offer.readRoles.toString(),
  //       term: offer.term.toString(),
  //     };

  //     offerList.push(offerObj);
  //   }

  //   return offerList;
  // };

  // to delete
  // const getPublicOffers = async (
  //   contract: Contract,
  //   apiPublicOffers: ApiOfferType[]
  // ) => {
  //   const filter = await contract.filters.OfferPosted(null);
  //   const events = await contract.queryFilter(filter);
  //   const offers = await getOffersFromEvents(events, contract, apiPublicOffers);
  //   dispatch(setPublicOffers(offers));
  // };

  async function iterateOverOffers(
    market: Contract,
    deploymentId: string,
    offerIdCallback: Function
  ) {
    const dinfo = await market.getDeploymentInfo(deploymentId);
    //fetch head of list
    let next = dinfo[0] as BigInt;
    while (next != BigInt(0)) {
      offerIdCallback(next);
      const olr = await market.getOfferLeftRight(next);
      // walk right
      next = olr[1];
    }
  }

  async function iterateOverDeployments(
    market: Contract,
    deploymentIdCallback: Function
  ) {
    let next = await market.deploymentsLLHead();
    while (next != BigInt(0)) {
      deploymentIdCallback(next);
      const dinfo = await market.getDeploymentInfo(next);
      // walk right
      next = dinfo[3];
    }
  }

  async function getAllOffers(
    market: Contract,
    apiPublicOffers: ApiOfferType[]
  ) {
    dispatch(clearPublicOffers());
    await iterateOverDeployments(market, async (deploymentId: string) => {
      await iterateOverOffers(market, deploymentId, async (offerId: string) => {
        const offer = await market.getOffer(offerId);
        let ethVal = BigInt(0);
        if (offer.token == ZERO_ADDRESS) ethVal = offer.price;
        const offerApiData = apiPublicOffers.find(
          (item) => item.id === offerId
        );
        const offerObj: OfferType = {
          id: offerId,
          title: offerApiData?.attributes?.name ?? "",
          description: offerApiData?.attributes?.description ?? "",
          price: formatEther(ethVal),
          deploymentId: offer.deploymentId,
          beneficiary: offer.beneficiary,
          requiredFlags: offer.requiredFlags.toString(),
          readRoles: offer.readRoles.toString(),
          term: offer.term.toString(),
        };
        dispatch(addPublicOffer(offerObj));
      });
    });
  }

  async function getAccountOffers( // to do - next
    market: Contract,
    apiPublicOffers: ApiOfferType[],
    deploymentId: string,
    address: string
  ) {
    dispatch(clearAccountOffers());
    const _deploymentId = deploymentId;
    await iterateOverOffers(market, _deploymentId, async (offerId: string) => {
      const offer = await market.getOffer(offerId);
      if (offer.beneficiary === address) {
        let ethVal = BigInt(0);
        if (offer.token == ZERO_ADDRESS) ethVal = offer.price;
        const offerApiData = apiPublicOffers.find(
          (item) => item.id === offerId
        );
        const offerObj: OfferType = {
          id: offerId,
          title: offerApiData?.attributes?.name ?? "",
          description: offerApiData?.attributes?.description ?? "",
          price: formatEther(ethVal),
          deploymentId: offer.deploymentId,
          beneficiary: offer.beneficiary,
          requiredFlags: offer.requiredFlags.toString(),
          readRoles: offer.readRoles.toString(),
          term: offer.term.toString(),
        };
        dispatch(addAccountOffer(offerObj));
      }
    });
  }

  return { getAllOffers, getAccountOffers };
};
