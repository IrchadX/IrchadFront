"use client";
import { Button } from "./button";

interface ButtonPrimaryProps {
  title: string;
  onClick: () => void;
}

export function ButtonPrimary({ title, onClick }: ButtonPrimaryProps) {
  return (
    <Button variant="default" onClick={onClick}>
      {title}
    </Button>
  );
}
