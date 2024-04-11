"use client";

import { signOut } from "next-auth/react";
import { toast } from "sonner";

const SignOutButton = () => {
  const signUserOut = async () => {
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      toast.error("Error signing out. Please try again");
    }
  };

  return (
    // TODO add loading
    <button className="text-red-600" onClick={signUserOut}>
      Log out
    </button>
  );
};

export default SignOutButton;
