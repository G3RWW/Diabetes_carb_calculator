"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function Nav() {
  const { data: session, status } = useSession();

  if (status === "loading") return null; // avoid a flash of wrong state

  return (
    <>
      <Link href="/">Diary</Link>
      <Link href="/products/add">Add</Link>
      <Link href="/products">Products</Link>

      {session?.user ? (
        <>
          <span>{session.user.email}</span>
          <LogoutButton />
        </>
      ) : (
        <>
          <Link href="/login">Log in</Link>
          <Link href="/signup">Sign up</Link>
        </>
      )}
    </>
  );
}