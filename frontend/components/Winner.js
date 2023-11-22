import { useEffect, useState } from "react";

import { useAccount, useContract, useProvider } from "wagmi";
import Minter from "../contracts/Raffle.json";

export default function Winner({ change }) {
  // UI state
  const [winner, setWinner] = useState(undefined);
  const [winnerAddy, setWinnerAddy] = useState("");
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
      fetchWinner().catch(console.error);
    },
  });

  useEffect(() => {
    if (isConnected && change !== 0) {
      fetchWinner().catch(console.error);
    }
  }, [change]);

  async function fetchWinner() {
    const winnerInfo = await contract.showWinner();
    // console.log(winnerInfo);
    setWinner(winnerInfo[0]);
    setWinnerAddy(winnerInfo[1]);
  }

  //if (winner == undefined) return null;

  return (
    <>
      <h2 className="text-2xl font-semibold mb-2">Winner info</h2>
      <div>Hash: {winner}</div>
      <div>Address: {winnerAddy}</div>
    </>
  );
}
