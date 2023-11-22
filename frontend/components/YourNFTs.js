import { useEffect, useState } from "react";
import Image from "next/image";

import {
  useAccount,
  useContractRead,
  useContract,
  useSigner,
  useProvider,
} from "wagmi";
import Minter from "../contracts/Croats.json";

// https://forum.openzeppelin.com/t/what-is-the-best-way-to-fetch-all-erc721-tokens-owned-by-an-address/17285/2
// https://etherscan.io/token/0xed5af388653567af2f388e6224dc7c4b3241c544#code

export default function YourNFTs({ change }) {
  // UI state
  const [nfts, setNfts] = useState([]);
  const [tokenVisuals, setTokenVisuals] = useState([]);
  const { address, isConnected } = useAccount();

  const provider = useProvider({
    chainId: process.env.NEXT_PUBLIC_NID,
  });

  const contractConfig = {
    address: process.env.NEXT_PUBLIC_MINTER_ADDRESS,
    abi: Minter.abi,
  };

  const contract = useContract({
    ...contractConfig,
    signerOrProvider: provider,
  });

  const account = useAccount({
    onConnect({ address, connector, isReconnected }) {
      fetchNFTS().catch(console.error);
    },
  });

  useEffect(() => {
    if (isConnected && change !== 0) {
      fetchNFTS().catch(console.error);
    }
  }, [change]);

  async function fetchNFTS() {
    const length = await contract.balanceOf(address);
    setNfts([]);
    for (let i = 0; i < length.toNumber(); i++) {
      fetchTokenIDs(i).catch(console.error);
    }
  }

  async function fetchTokenIDs(iter) {
    const tokenID = await contract.tokenOfOwnerByIndex(address, iter);
    const json = await contract.tokenURI(tokenID.toNumber());

    await fetch(json)
      .then((response) => response.json())
      .then((data) => {
        setTokenVisuals((tokenVisuals) => [...tokenVisuals, data.image]);
      })
      .catch((error) => {});
    setNfts((nfts) => [...nfts, tokenID.toNumber()]);
  }

  if (nfts.length < 1) return null;

  return (
    <>
      <h2 className="text-2xl font-semibold mb-2">Your Croats</h2>
      <ul className="grid grid-cols-4 gap-6">
        {nfts.map((nft, index) => (
          <li
            key={nft}
            className="bg-gray-100 md:p-4 p-2 w-20 lg:w-32 h-20 lg:h-32 flex justify-center items-center text-lg"
          >
            <a
              href={
                process.env.NEXT_PUBLIC_OS_ASSETS +
                process.env.NEXT_PUBLIC_MINTER_ADDRESS +
                "/" +
                nft
              }
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src={tokenVisuals[index]}
                alt={`Token #${nft}`}
                title={`Token #${nft}`}
                width="100%"
                height="100%"
                className="hover:!scale-110 transition duration-300 ease-in-out"
              />
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
