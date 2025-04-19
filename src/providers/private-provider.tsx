import SignInPage from "@/pages/bye";
import { useQuery } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { type FC, useEffect, useState } from "react";
import { hasAuthParams, useAuth } from "react-oidc-context";

const getAuthHealth = async () => {
  const response = await fetch(import.meta.env.VITE_AUTHORITY);
  if (!response.ok) {
    throw new Error("Please confirm your auth server is up");
  }
  return await response.json();
};

interface IPrivateProvider {
  children: React.ReactNode;
}

export const PrivateProvider: FC<IPrivateProvider> = (props) => {
  const { children } = props;
  const auth = useAuth();

  const { isPending: getAuthHealthIsPending, error: getAuthHealthError } = useQuery({
    queryKey: ["getAuthHealth"],
    queryFn: getAuthHealth,
    retry: false,
  });

  const [hasTriedSignin, setHasTriedSignin] = useState(false);
  useEffect(() => {
    if (getAuthHealthIsPending || getAuthHealthError) {
      return;
    }
    if (!(hasAuthParams() || auth.isAuthenticated || auth.activeNavigator || auth.isLoading || hasTriedSignin)) {
      void auth.signinRedirect();
      setHasTriedSignin(true);
    }
  }, [auth, hasTriedSignin, getAuthHealthIsPending, getAuthHealthError]);

  const anyLoading = getAuthHealthIsPending || auth.isLoading;
  const anyErrorMessage = getAuthHealthError?.message || auth.error?.message;

  if (anyLoading) {
    return (
      <>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true} storageKey="dashboard-theme">
          <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
              <div className="flex flex-col gap-6">
                <p>Loading...</p>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </>
    );
  }
  if (anyErrorMessage) {
    return (
      <>
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm">
            <p>Login error: {anyErrorMessage}</p>
          </div>
        </div>
      </>
    );
  }
  if (!auth.isAuthenticated) return <SignInPage />;
  return <>{children}</>;
};
