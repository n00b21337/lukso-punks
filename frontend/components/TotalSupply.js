import { useEffect, useState } from "react";
import Minter from "../contracts/Croats.json";

import { useContractRead } from "wagmi";

export default function TotalSupply({ change }) {
  const [loading, setLoading] = useState(true);
  const [totalMinted, setTotalMinted] = useState(0);
  const [total, setTotal] = useState(0);

  const contractConfig = {
    address: process.env.NEXT_PUBLIC_MINTER_ADDRESS,
    abi: Minter.abi,
  };

  const { data: totalSupplyData, refetch: refetchSupply } = useContractRead({
    ...contractConfig,
    functionName: "totalSupply",
    chainId: process.env.NEXT_PUBLIC_NID,
  });

  const { data: maxTokenSupplyData } = useContractRead({
    ...contractConfig,
    functionName: "maxTokenSupply",
    chainId: process.env.NEXT_PUBLIC_NID,
  });

  useEffect(() => {
    console.log("triggered");
    console.log(totalSupplyData);
    if (totalSupplyData) {
      refetchSupply();
      console.log(totalSupplyData);
      setTotalMinted(totalSupplyData.toNumber());
      setLoading(false);
    }
  }, [totalSupplyData, change]);

  useEffect(() => {
    if (maxTokenSupplyData) {
      setTotal(maxTokenSupplyData.toNumber());
      setLoading(false);
    }
  }, [maxTokenSupplyData, change]);

  return (
    <>
      <p>Minted tokens: {loading ? "Loading..." : `${totalMinted}/${total}`}</p>
    </>
  );
}
