import Head from "next/head";
import { ethers } from "ethers";
import { useState, useRef, useEffect } from "react";

import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useProvider,
  useContract,
} from "wagmi";

import { useSwitchNetwork, useNetwork, useAccount } from "wagmi";

import AddHash from "../components/AddHash";
import YourHashes from "../components/YourHashes";
import MintedOut from "../components/MintedOut";
import Wallet from "../components/Wallet";
import YourNFTs from "../components/YourNFTs";
import FAQ from "../components/FAQ";
import Minter from "../contracts/Croats.json";
import Winner from "../components/Winner";

export default function Home() {
  // Constants
  const MINT_PRICE = 0;
  const MAX_MINT = 12;
  const MAX_FREE_MINT = 4;

  // UI state
  const [mintQuantity, setMintQuantity] = useState(1);
  const [mintError, setMintError] = useState("");
  const [alreadyMintedQuantity, setAlreadyMintedQuantity] = useState(0);
  const [payment, setMintPayment] = useState(0);
  const [currentPrice, setCurrentPrice] = useState("0");
  const mintQuantityInputRef = useRef();
  const buttonRef = useRef();
  const [mintMessage, setMintMessage] = useState("");
  const [change, setChange] = useState(0);
  const [buttonState, setChangeButtonState] = useState(false);

  const { chain } = useNetwork();
  const { chains, errorSwitch, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();
  const { connector: activeConnector, address, isConnected } = useAccount();

  const contractConfig = {
    address: process.env.NEXT_PUBLIC_MINTER_ADDRESS,
    abi: Minter.abi,
  };

  const provider = useProvider({
    chainId: process.env.NEXT_PUBLIC_NID,
  });

  const contract = useContract({
    ...contractConfig,
    signerOrProvider: provider,
  });

  const fetchMintBalance = async (message) => {
    const mintBalance = await contract.mintedPerAddress(address);
    setAlreadyMintedQuantity(mintBalance.toNumber());
    if (mintBalance >= 12) {
      mintQuantityInputRef.current.value = 0;
      setChangeButtonState(true);
      document.getElementById("mintButton").innerText = "Can't Mint";
      if (message) {
        setMintError("Max");
        setMintMessage(`You minted maximum allowed, 12 tokens!`);
      }
    }
  };

  const fetchPrice = async () => {
    const mintPrice = await contract.price();
    const transformToString = ethers.utils.formatUnits(mintPrice, "ether");
    setCurrentPrice(transformToString);
  };

  useEffect(() => {
    fetchMintBalance(true).catch(console.error);
    fetchPrice().catch(console.error);
    //    check(ethers);

    listOwner(
      process.env.NEXT_PUBLIC_MINTER_ADDRESS,
      address,
      provider,
      ethers
    );
  }, []);

  useEffect(() => {
    if (chain?.id !== process.env.NEXT_PUBLIC_NID) {
      switchNetwork?.(process.env.NEXT_PUBLIC_NID);
    }
  }, [isConnected]);

  return (
    <div className="max-w-xl mx-auto px-4">
      <Head>
        <title>The Croats - NFT</title>
        <meta
          name="description"
          content="Beskope collection of Croatian nation"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wallet />
      <main className="space-y-8">
        <img
          className="mb-8 mt-6"
          src="https://bah5acgzamtui6zbtdssobug3eack5kg32rjdivw2q7zhaxncrb7e64etp23q.bzz.link"
        />
        <h1 className="text-4xl font-semibold mb-8 mt-6">The Croats</h1>
        <div className="space-y-8">
          <div className="bg-gray-100 p-4 lg:p-8">
            <div>
              <h3 className="text-xl font-semibold mb-0">
                <AddHash />
              </h3>
            </div>
          </div>
        </div>
        <YourHashes change={change} />
        <Winner change={change} />
        <FAQ />
        <YourNFTs change={change} />
      </main>

      <footer className="mt-20 text-center">
        <a
          href={process.env.NEXT_PUBLIC_OS_BASE}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 mb-8 inline-block"
        >
          Check collection on Opensea
        </a>
      </footer>
    </div>
  );
}
