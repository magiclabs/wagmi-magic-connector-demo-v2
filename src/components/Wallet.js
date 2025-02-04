import { useAccount, useEnsName, useDisconnect, useSwitchChain } from "wagmi";
import Balance from "./Balance";
import SignMessage from "./SignMessage";
import SendTransaction from "./SendTransaction";
import StatusCircle from "./StatusCircle";
import Divider from "./Divider";
import { useState } from "react";

const Wallet = () => {
  const {
    address,
    connector: activeConnector,
    status,
    chain,
    chainId,
  } = useAccount();
  const {
    switchChain,
    error,
    isPending,
    status: switchStatus,
    isSuccess,
  } = useSwitchChain();
  const { data: ensName } = useEnsName({ address });
  const { disconnect } = useDisconnect();
  const [selectedChain, setSelectedChain] = useState(chainId);

  // console.log("switchStatus", switchStatus);
  // console.log("isPending", isPending);
  // console.log("isSuccess", isSuccess);
  if (error) {
    console.log("---error---", error);
  }

  const handleSwitchChain = () => {
    console.log("Switching chain to", selectedChain);
    switchChain({ chainId: selectedChain });
  };

  const handleChange = (event) => {
    const chainId = Number(event.target.value);
    setSelectedChain(chainId);
    // switchChain({ chainId });
  };

  return (
    <div className="wallet-container">
      <div>Connector: {activeConnector?.name}</div>
      <div className="status-container">
        <div>Status:</div> <StatusCircle status={status} />
      </div>

      {chain && <div>Chain: {chain?.name}</div>}
      <select>
        <option value={1}>Mainnet</option>
        <option value={11155111}>Sepolia</option>
        <option value={80002}>Amoy</option>
      </select>

      <Divider />
      <input
        type="text"
        value={selectedChain}
        onChange={(e) => setSelectedChain(e.target.value)}
      />
      <button onClick={handleSwitchChain}>Switch Chain</button>
      <Divider />
      <div>Connected to {ensName ?? address}</div>
      <Balance address={address} />
      <Divider />
      <SignMessage />
      <Divider />
      <SendTransaction />
      <Divider />
      <button className="disconnect-button" onClick={() => disconnect()}>
        Disconnect
      </button>
    </div>
  );
};

export default Wallet;
