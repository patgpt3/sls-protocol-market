"use client";
import MarketJson from "@/abi/Market.json";
import AccessPermissionsJson from "@/abi/AccessPermissions.json";
import { StoreStateType } from "@/types/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Contract, EventLog, ethers } from "ethers";
import { GrantType } from "@/types/grants";
import GrantItem from "@/components/GrantItem";
import { WaevAvatarIcon } from "../../../components/WaevAvatar";
import { marketAddress, defaultRPC } from "@/web3/config";

export default function OffersContent() {
  const [access, setAccessContract] = useState<Contract | null>(null);
  const [grantList, setGrantList] = useState<GrantType[] | null>(null);

  const { deploymentId } = useSelector(
    (state: StoreStateType) => state.contract
  );

  const getMarketContract = async () => {
    const provider = await new ethers.JsonRpcProvider(defaultRPC);
    const marketplaceContract = await new Contract(
      marketAddress,
      MarketJson.abi,
      provider
    );

    marketplaceContract.accessPermissions().then((address) => {
      const accessContract = new Contract(
        address,
        AccessPermissionsJson.abi,
        provider
      );
      setAccessContract(accessContract);
    });
  };

  const getGrants = async (deploymentId: string, contract: Contract) => {
    const filter = await contract?.filters.AccessSet(null, deploymentId);
    const events = await contract?.queryFilter(filter);
    const grantList: GrantType[] = [];

    events?.forEach(async (event) => {
      if (!(event instanceof EventLog)) return;
      if (event.args === undefined) return;
      const alreadySeen: Set<string> = new Set<string>();
      const grantorDeploymentId = event.args[0];
      const dataId = event.args[2];
      const id =
        deploymentId &&
        deploymentId?.toString() + deploymentId?.toString() + dataId.toString();
      if (alreadySeen.has(id!!)) return;
      if (access !== null) {
        const [requiredFlags, readRoles, expires] = await access.getPermissions(
          grantorDeploymentId,
          deploymentId,
          dataId
        );
        const grantObj: GrantType = {
          dataId: dataId,
          grantorDeploymentId: grantorDeploymentId,
          requiredFlags: requiredFlags.toString(),
          readRoles: readRoles.toString(),
          expires: expires.toString(),
        };
        grantList.push(grantObj);
        setGrantList(grantList);
      }
    });
  };

  useEffect(() => {
    getMarketContract();
  }, []);

  useEffect(() => {
    if (deploymentId && access) {
      getGrants(deploymentId, access);
    }
  }, [deploymentId, access]);

  return (
    <div>
      {grantList ? (
        <>
          <h1 className="text-2xl text-slate-400 font-semibold">
            Your Purchased Dataset Grants
          </h1>
          <br />
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-2">
            {grantList.map((grant) => {
              return <GrantItem key={grant.dataId} grant={grant} />;
            })}
          </div>
        </>
      ) : (
        <WaevAvatarIcon alt="loading" isAnimating={true} size="lg" />
      )}
    </div>
  );
}
