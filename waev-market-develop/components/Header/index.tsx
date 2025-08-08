"use client";

import { useState, useEffect, useCallback } from "react";
import { SlsLogo } from "@/components/Logos/SlsLogo";
import Box from "@mui/material/Box";
import { fadeInFwdKeyframes } from "@/utils";
import { ConnectWalletBtn } from "@/components/Buttons";
import ClientConfigManagerJson from "@/abi/ClientConfigManager.json";
import MarketJson from "@/abi/Market.json";
import { NavMenu } from "@/components/NavMenu";
import { Contract, EventLog, Log, ethers, formatEther } from "ethers";
import { useAccount } from "wagmi";
import { useDispatch, useSelector } from "react-redux";
import { setDeploymentId, setIsConnected, setIsAuth } from "@/store";
import { StoreStateType } from "@/types/store";
import { ApiOfferType, OfferType } from "@/types/offers";
import axios from "axios";
import Link from "next/link";
import MDTypography from "../Elements/MDTypography";
import { Card } from "@mui/material";
import { marketAddress, defaultRPC } from "@/web3/config";
import { useRouter } from "next/navigation";
import { useAccountNonce } from "@/hooks";

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { address } = useAccount();

  const { isConnected } = useSelector((state: StoreStateType) => state.auth);

  const [marketContract, setMarketContract] = useState<Contract | null>(null);

  const { mutate: accountNonceCall } = useAccountNonce(address);

  const getDeploymentId = useCallback(
    async (contract: Contract, address: string | undefined) => {
      const configMgr = new Contract(
        await contract.clientConfig(),
        ClientConfigManagerJson.abi,
        contract.runner
      );
      const [deploymentId, roles] = await configMgr.currentDeploymentId(
        address
      );
      dispatch(setDeploymentId(deploymentId));
    },
    [dispatch]
  );

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
  }, []);

  useEffect(() => {
    if (address) {
      dispatch(setIsConnected(true));
      accountNonceCall();

      const accessToken = localStorage.getItem("access_token");
      const accountAddress = localStorage.getItem("account_address");

      if (accessToken && accountAddress) {
        if (accountAddress === address) {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
          dispatch(setIsAuth(true));
        } else {
          dispatch(setIsAuth(false));
          localStorage.removeItem("access_token");
          localStorage.removeItem("account_address");
        }
      }
    } else {
      dispatch(setIsConnected(false));
      router.push("/");
    }
  }, [address]);

  useEffect(() => {
    if (marketContract && address) {
      getDeploymentId(marketContract, address);
    }
  }, [marketContract, address]);

  return (
    <header className="sticky top-0 z-50 w-full flex justify-between items-center bg-main_background/[.50] backdrop-blur transition-colors duration-500 border-b border-slate-300/10 py-5 px-10">
      <Box display="flex" alignItems="center">
        <Link href="/">
          <Box
            sx={{
              position: "relative",
              paddingBottom: 5,
              "&:hover": {
                ">#SlsLogo": { opacity: 1 },
                // ">#WaevLogoBasicLoading": { opacity: 1 },
              },
            }}
          >
            <Box
              id="SlsLogo"
              sx={{
                opacity: 1,
                transition: "opacity 500ms",
                position: "absolute",
                cursor: "pointer",
                ">svg": {
                  animation: `${fadeInFwdKeyframes()} 1s ease-in both`,
                },
              }}
            >
              <SlsLogo width={"100%"} height={"60%"} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  pt: "2px",
                  transition: "opacity 500ms",
                  opacity: 1,
                  animation: `${fadeInFwdKeyframes()} 1s ease-in both`,
                }}
              >
                <MDTypography sx={{ whiteSpace: "pre", fontSize: "1.10rem" }}>
                  {" SLS Marketplace "}
                </MDTypography>
              </Box>
            </Box>
          </Box>
        </Link>
      </Box>
      <Box display="flex" alignItems="center">
        <ConnectWalletBtn />
        {isConnected && <NavMenu />}
      </Box>
    </header>
  );
}
