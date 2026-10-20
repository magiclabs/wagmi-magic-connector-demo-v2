"use client";

import { useBalance } from "wagmi";
import type { Address } from "viem";

interface BalanceProps {
  address: Address;
}

export default function Balance({ address }: BalanceProps) {
  const { data, isError, isLoading } = useBalance({
    address,
  });

  if (isLoading) return <div>Fetching balance...</div>;
  if (isError) return <div>Error fetching balance</div>;
  return (
    <div>
      Balance:{" "}
      <span style={{ fontWeight: 500 }}>
        {data?.formatted} {data?.symbol}
      </span>
    </div>
  );
}
