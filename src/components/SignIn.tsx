"use client";

import { useConnect } from "wagmi";

export default function SignIn() {
  const { connect, connectors, isLoading, pendingConnector } = useConnect();

  return (
    <div className="sign-in-container">
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          className="sign-in-button primary-button"
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {isLoading && pendingConnector?.id === connector.id
            ? " (connecting...)"
            : ""}
        </button>
      ))}
    </div>
  );
}
