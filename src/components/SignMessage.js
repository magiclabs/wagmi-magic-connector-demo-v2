import { useState } from "react";
import { useAccount, useSignMessage } from "wagmi";

const SignMessage = () => {
  const { status } = useAccount();
  const { data, isError, isSuccess, signMessage, isPending } = useSignMessage();
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signMessage({ message: message });
    setMessage("");
  };

  return (
    <div>
      <form className="sign-message-container" onSubmit={handleSubmit}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message..."
        />
        <button disabled={isPending || status !== "connected"} type="submit">
          {isPending ? "Signing..." : "Sign message"}
        </button>
      </form>
      {isSuccess && <div className="message-status">Signature: {data}</div>}
      {isError && <div className="message-status">Error signing message</div>}
    </div>
  );
};

export default SignMessage;
