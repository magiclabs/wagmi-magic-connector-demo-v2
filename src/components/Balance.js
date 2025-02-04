import { useBalance } from "wagmi";

const Balance = ({ address }) => {
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
};

export default Balance;
