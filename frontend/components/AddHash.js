import { useEffect, useState, useRef } from "react";
import { ethers } from "ethers";
import Raffle from "../contracts/Raffle.json";

import {
  useAccount,
  useContractRead,
  useContract,
  useProvider,
  useSigner,
  useContractWrite,
  useWaitForTransaction,
  usePrepareContractWrite,
} from "wagmi";

export default function AddHash() {
  const [url, setURL] = useState("");
  const buttonRef = useRef();
  const [mintError, setMintError] = useState("");
  const [mintMessage, setMintMessage] = useState("");
  const [buttonState, setChangeButtonState] = useState(false);
  const [hash, setHash] = useState("");
  const { address, isConnected } = useAccount();

  const contractConfig = {
    address: process.env.NEXT_PUBLIC_RAFFLE_ADDRESS,
    abi: Raffle.abi,
  };
  const provider = useProvider({
    chainId: process.env.NEXT_PUBLIC_NID,
  });

  const { config, error } = usePrepareContractWrite({
    ...contractConfig,
    functionName: "enterRaffle",
    args: [hash],
    overrides: {
      gasLimit: 30e5,
    },
  });

  const {
    data: raffleData,
    write: enterRaffle,
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

  const { data, isSuccess, isError, isLoading } = useWaitForTransaction({
    hash: raffleData?.hash,
    cacheTime: 0,
    onError(error) {
      console.log("Error", error);
      setMintError(error);
      const message = error.message.slice(0, error.message.indexOf("("));
      setMintMessage(`Error: ${message}`);
    },
    onSuccess(data) {
      console.log("Success", data);
      if (data.status == 0) {
        console.log(data);
        setMintError("reverted");
        setMintMessage(`Error:  Transaction reverted`);
        reason(data);
      } else {
        setMintError("");
        setMintMessage(
          `Congrats, you entered raffle with ${hash} hash! for ${url} url`
        );
      }
      setChangeButtonState(false);
    },
  });

  async function hashToChain(url) {
    setURL(url);
    const currentHash = ethers.utils.id(url).toUpperCase();
    setHash(currentHash);
    console.log(currentHash);
  }

  // Lets try go get full reason why this happened
  async function reason(data) {
    const whatError = await getReason(data.transactionHash);
    setMintMessage(`Error: Transaction reverted. ${whatError}`);
  }

  async function getReason(hash) {
    const tx = await provider.getTransaction(hash);
    const response = await provider.call(
      {
        to: tx.to,
        from: tx.from,
        nonce: tx.nonce,
        gasLimit: tx.gasLimit,
        gasPrice: tx.gasPrice,
        data: tx.data,
        value: tx.value,
        chainId: tx.chainId,
        type: tx.type ?? undefined,
        accessList: tx.accessList,
      },
      tx.blockNumber
    );
    let reason = ethers.utils.toUtf8String("0x" + response.substring(138));
    return reason;
  }

  return (
    <div>
      <div>
        <span className={"text-green-600 text-s mt-2 mb-8 block"}>
          Add URL of social profile with Croat NFT, URL will be one way hashed
          and not seen to others
        </span>
        <input
          className={
            "border p-4 text-center rounded-tl rounded-bl focus:outline-none focus:border-blue-600 w-2/3"
          }
          placeholder="Input Link here"
          onChange={(e) => hashToChain(e.target.value)}
          value={url}
          type="text"
        />
        <button
          ref={buttonRef}
          disabled={buttonState}
          id="hashButton"
          className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-tr rounded-br w-1/3"
          onClick={() => {
            if (isConnected) {
              setChangeButtonState(true);
              enterRaffle();
            } else {
              var elem = document
                .getElementById("wallet")
                .querySelector('button[type="button"]');
              elem.click();
            }
          }}
        >
          Submit
        </button>
      </div>
      {mintMessage && (
        <span
          id="message"
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
  );
}
