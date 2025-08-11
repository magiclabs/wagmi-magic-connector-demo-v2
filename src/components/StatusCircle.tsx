"use client";

type Status = "connected" | "connecting" | "reconnecting" | "disconnected";

interface StatusCircleProps {
  status: Status;
}

export default function StatusCircle({ status }: StatusCircleProps) {
  return <div className={`circle ${status}`} />;
}
