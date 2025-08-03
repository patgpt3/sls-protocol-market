"use client";
import { GrantType } from "@/types/grants";

type OfferItemProps = {
  grant: GrantType;
};

export default function GrantItem({ grant }: OfferItemProps) {
  return (
    <div className="w-[380px] group flex flex-col items-center rounded-md overflow-hidden gap-x-8 bg-main_color cursor-pointer transition py-4 px-8 shadow-[rgba(0,0,0,0.14)_0_0.125rem_0.125rem_0,rgba(0,0,0,0.2)_0_0.1875rem_0.0625rem_-0.125rem,rgba(0,0,0,0.12)_0_0.0625rem_0.3125rem_0]">
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="truncate w-full pb-4">Data ID: {grant.dataId}</p>
        <p className="text-slate-400 text-sm pb-4 w-full truncate">
          Data IDs List:
        </p>
        <p className="truncate w-full pb-4">
          Deployment ID: {grant.grantorDeploymentId}
        </p>
        <p className="text-slate-400 text-sm pb-4 w-full truncate">
          Required Flags: {grant.requiredFlags}
        </p>
        <p className="text-slate-400 text-sm pb-4 w-full truncate">
          Read Roles: {grant.readRoles}
        </p>
        <p className="text-slate-400 text-sm pb-4 w-full truncate">
          Term: {grant.expires}
        </p>
      </div>
      <div className="flex justify-center w-full"></div>
    </div>
  );
}
