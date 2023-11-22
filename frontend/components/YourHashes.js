import { useEffect, useState } from "react";
import Image from "next/image";

import {
  useAccount,
  useContractRead,
  useContract,
  useSigner,
  useProvider,
} from "wagmi";
import Minter from "../contracts/Raffle.json";

export default function YourHashes({ change }) {
  // UI state
  const [hashes, setHashes] = useState([]);
  const [hashesTotal, setHashesTotal] = useState();

  const [tokenVisuals, setTokenVisuals] = useState([]);
  const { address, isConnected } = useAccount();

  const provider = useProvider({
    chainId: process.env.NEXT_PUBLIC_NID,
  });

  const contractConfig = {
    address: process.env.NEXT_PUBLIC_RAFFLE_ADDRESS,
    abi: Minter.abi,
  };

  const contract = useContract({
    ...contractConfig,
    signerOrProvider: provider,
  });

  const account = useAccount({
    onConnect({ address, connector, isReconnected }) {
      fetchHashes().catch(console.error);
    },
  });

  useEffect(() => {
    if (isConnected && change !== 0) {
      fetchHashes().catch(console.error);
    }
  }, [change]);

  async function fetchHashes() {
    const length = await contract.balanceOf(address);
    const total = await contract.showTotalEntries();
    setHashesTotal(total.toNumber());

    setHashes([]);
    for (let i = 0; i < length.toNumber(); i++) {
      fetchHashIDs(i).catch(console.error);
    }
  }

  async function fetchHashIDs(iter) {
    const hash = await contract.hashOfOwnerByIndex(address, iter);
    console.log(hash);
    setHashes((hashes) => [...hashes, hash]);
  }

  if (hashes.length < 1) return null;

  return (
    <>
      <h3 className="text-xl font-semibold mb-2">Your Hashes</h3>
      <ul className="grid grid-cols-1 gap-6">
        {hashes.map((hash, index) => (
          <li key={hash} className="bg-gray-100 pb-4 pt-4 pl-2">
            {hashes[index]}
          </li>
        ))}
      </ul>
      <h3 className="text-xl font-semibold mb-2">
        Current number of entries {hashesTotal}
      </h3>
    </>
  );
}
