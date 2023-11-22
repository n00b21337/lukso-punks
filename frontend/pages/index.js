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

import TotalSupply from "../components/MintedOut";
import Wallet from "../components/Wallet";
import YourNFTs from "../components/YourNFTs";
import FAQ from "../components/FAQ";
import Minter from "../contracts/Croats.json";

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

  const { config, error } = usePrepareContractWrite({
    ...contractConfig,
    functionName: "mint",
    args: [mintQuantity],
    overrides: {
      gasLimit: 30e5,
      // TODO calculate gaslimit according to number of items as more mint items ask for more gas
      value: ethers.utils.parseUnits(payment.toString()),
    },
  });

  const {
    data: mintData,
    write: mint,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
  } = useContractWrite({
    ...config,
    onError(error) {
      setMintError(error);
      const message = error.message.slice(0, error.message.indexOf("("));
      setMintMessage(`Error: ${message}`);
      setChangeButtonState(false);
    },
  });

  const {
    data: txData,
    isSuccess: txSuccess,
    error: txError,
  } = useWaitForTransaction({
    hash: mintData?.hash,
    onSettled(data, error) {
      console.log("Settled", { data, error });
    },
    onError(error) {
      console.log("Error", error);
    },
    onSuccess(data) {
      console.log("Success", data);
      mintQuantityInputRef.current.value = 0;
      setMintError("");
      setMintMessage(`Congrats, you minted ${mintQuantity} token(s)!`);
      setChange(change + 1);
      setChangeButtonState(false);
      fetchMintBalance(false);
    },
  });

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
  }, []);

  useEffect(() => {
    if (chain?.id !== process.env.NEXT_PUBLIC_NID) {
      switchNetwork?.(process.env.NEXT_PUBLIC_NID);
    }
  }, [isConnected]);

  // Make payments only when above 4 items, calculate it from SC data
  useEffect(() => {
    if (parseInt(mintQuantity) + alreadyMintedQuantity > MAX_FREE_MINT) {
      // 2 scenarios
      var paymentQuantity;
      if (alreadyMintedQuantity > MAX_FREE_MINT) {
        paymentQuantity = parseInt(mintQuantity);
      } else {
        paymentQuantity =
          parseInt(mintQuantity) + alreadyMintedQuantity - MAX_FREE_MINT;
      }
      setMintPayment(parseFloat(currentPrice) * paymentQuantity);
    } else {
      setMintPayment("0");
    }
  }, [mintQuantity, alreadyMintedQuantity, isConnected]);

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
        <TotalSupply change={change} />
        <div className="space-y-8">
          <div className="bg-gray-100 p-4 lg:p-8">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Mint NFT</h2>
              <label className="text-gray-600 text-sm mb-2 inline-block">
                How many NFTs would you like to mint?
              </label>
              <div className="flex">
                <input
                  className={
                    !mintError
                      ? "border p-4 text-center rounded-tl rounded-bl focus:outline-none focus:border-blue-600 w-2/3"
                      : "border border-red-500 p-4 text-center rounded-tl rounded-bl focus:outline-none focus:border-blue-600 w-2/3"
                  }
                  onChange={(e) => setMintQuantity(e.target.value)}
                  value={mintQuantity}
                  placeholder="1"
                  type="number"
                  min="1"
                  max="12"
                  ref={mintQuantityInputRef}
                />
                <button
                  id="mintButton"
                  ref={buttonRef}
                  disabled={buttonState}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-tr rounded-br w-1/3"
                  data-mint-loading={isMintLoading}
                  data-mint-started={isMintStarted}
                  onClick={() => {
                    if (isConnected) {
                      mint();
                      setChangeButtonState(true);
                      setMintMessage(
                        `Preparing to mint ${mintQuantity} token(s)!`
                      );
                    } else {
                      var elem = document
                        .getElementById("wallet")
                        .querySelector('button[type="button"]');
                      elem.click();
                    }
                  }}
                >
                  {isMintLoading && "Waiting for approval"}
                  {isMintStarted && !txSuccess && "Minting..."}
                  {!isMintLoading && !isMintStarted && "Mint"}
                  {txSuccess && "Mint more"}
                </button>
              </div>
              {mintMessage && (
                <span
                  className={
                    mintError
                      ? "text-red-600 text-xs mt-2 block"
                      : "text-green-600 text-xs mt-2 block"
                  }
                >
                  {mintMessage}
                </span>
              )}
            </div>
          </div>
        </div>
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
