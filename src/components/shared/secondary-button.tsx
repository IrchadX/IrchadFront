"use client";
import { Button } from "./button";

interface ButtonSecondaryProps {
  title: string;
  disabled: boolean;
  onClick: () => void;
}

export function ButtonSecondary({
  title,
  onClick,
  disabled = false,
}: ButtonSecondaryProps) {
  return (
    <Button
      variant="secondary"
      onClick={onClick}
      size="lg"
      className={`${disabled ? "cursor-not-allowed" : ""}`}>
      {title}
    </Button>
  );
}
