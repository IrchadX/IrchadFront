"use client";
import { useParams } from "next/navigation";
import {UserModification} from "@/components/admin/users/user_modification";

export default function UserModificationPage() {
  const { id: userId } = useParams();

  if (!userId) {
    return <div>Invalid user ID</div>;
  }
  return <UserModification userId={Array.isArray(userId) ? userId[0] : userId} />;
}