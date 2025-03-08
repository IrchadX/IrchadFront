"use client";
import { Button } from "./button";

interface ButtonSecondaryProps {
  title: string;
  onClick: () => void;
}

export function ButtonSecondary({ title, onClick }: ButtonSecondaryProps) {
  return (
    <Button variant="secondary" onClick={onClick} size="lg">
      {title}
    </Button>
  );
}
