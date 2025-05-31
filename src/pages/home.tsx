import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

import { userSchema } from "@/schemas/user";

import { useCreateAccountUser } from "@/queries/account-user";
import { useCreateRadarUser } from "@/queries/radar-user";

export default function HomePage() {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const { mutate: createAccountUser, isPending: isPendingAccount } = useCreateAccountUser(auth, queryClient);
  const { mutate: createRadarUser, isPending: isPendingRadar } = useCreateRadarUser(auth, queryClient);

  useEffect(() => {
    createAccountUser(
      userSchema.parse({ id: 0, sub: auth.user?.profile.sub, username: auth.user?.profile.preferred_username }),
    );

    createRadarUser(
      userSchema.parse({ id: 0, sub: auth.user?.profile.sub, username: auth.user?.profile.preferred_username }),
    );
  }, [auth, createAccountUser, createRadarUser]);

  if (isPendingAccount || isPendingRadar) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">Home</h1>
    </>
  );
}
