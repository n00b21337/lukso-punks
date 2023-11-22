import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Wallet() {
  return (
    <nav className="p-5 border-b-2 flex flex-row">
      <div className="ml-auto py-2 px-4" id="wallet">
        <ConnectButton />
      </div>
    </nav>
  );
}
