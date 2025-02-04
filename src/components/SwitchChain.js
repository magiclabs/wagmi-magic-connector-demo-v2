import { useAccount, useSwitchChain } from "wagmi";
import { useState } from "react";

const SwitchChain = () => {
  const { chainId } = useAccount();
  const { switchChain, error, isPending } = useSwitchChain();
  const [selectedChain, setSelectedChain] = useState(chainId);

  console.log("selectedChain", selectedChain);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Switching chain to", selectedChain);
    switchChain({ chainId: selectedChain });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <select
          style={{
            width: "100%",
            height: 48,
            borderRadius: 10,
            padding: "8px",
            fontSize: "1.5rem",
          }}
          onChange={(e) => setSelectedChain(Number(e.target.value))}
        >
          <option value={11155111}>Sepolia</option>
          <option value={80002}>Amoy</option>
          <option value={84532}>Base Sepolia</option>
        </select>
        <button disabled={isPending} type="submit">
          {isPending ? "Switching Chains" : "Switch Chain"}
        </button>
      </form>
      {error && <div>Error switching chain</div>}
    </div>
  );
};

export default SwitchChain;
