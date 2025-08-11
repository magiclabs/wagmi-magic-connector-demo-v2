"use client";

import { parseEther } from "ethers/lib/utils.js";
import { useState, type FormEvent } from "react";
import { useAccount, useSendTransaction } from "wagmi";
import { useDebounce } from "use-debounce";
import type { Address } from "viem";

export default function SendTransaction() {
  const {
    data: hash,
    sendTransaction,
    isPending,
    error,
  } = useSendTransaction();
  const { status } = useAccount();
  const [address, setAddress] = useState<Address>(
    "0x8bdCE5551B544AF8dFfB09Ff34c34da7FC241Bd0" as Address
  );
  const [amount, setAmount] = useState<string>("0.01");

  // Note: The debounced values are for UI purposes, such as validation or UI updates,
  // and shouldn't be used directly for sending transactions on form submit.
  const [debouncedAddress] = useDebounce(address, 500);
  const [debouncedAmount] = useDebounce(amount, 500);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Use the actual input values, not the debounced ones, for sending transactions.
    sendTransaction({
      to: debouncedAddress,
      value: parseEther(debouncedAmount),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      }}
    >
      <input
        value={address}
        placeholder="Receiving Address"
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        value={amount}
        placeholder="Amount of ETH"
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        disabled={isPending || !address || !amount || status !== "connected"}
        type="submit"
      >
        {isPending ? "Sending..." : "Send Transaction"}
      </button>
      {hash && <div>Transaction Hash: {hash}</div>}
      {error && (
        <div>An error occurred preparing the transaction: {error.message}</div>
      )}
    </form>
  );
}
