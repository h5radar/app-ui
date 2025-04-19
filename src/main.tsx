import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "@/index.css";

// Include layout
import AccountLayout from "@/layouts/account";
import BillingLayout from "@/layouts/billing";
import NotificationsLayout from "@/layouts/notifications";
import LegalLayout from "@/layouts/legal";
import AppLayout from "@/layouts/app-layout";
import RadarLayout from "@/layouts/radar";

// Include root pages at alphabet
import AboutPage from "@/pages/about";
import AccountPage from "@/pages/account";
import AdaptersPage from "@/pages/adapters";
import AuthorsPage from "@/pages/authors/list";
import BiSystemsPage from "@/pages/bi-systems";
import BillingPage from "@/pages/billing";
import ChannelsPage from "@/pages/channels";
import CobwebsPage from "@/pages/cobwebs";
import HomePage from "@/pages/home";
import LicensesPage from "@/pages/licenses";
import InvoicesPage from "@/pages/invoices";
import NotificationsPage from "@/pages/notifications";
import ParticipantsPage from "@/pages/participants";
import PiesPage from "@/pages/pies";
import PlatformsPage from "@/pages/platforms";
import PracticesPage from "@/pages/practices";
import ProductsPage from "@/pages/products/list";
import ProfilePage from "@/pages/profile";
import RadarsPage from "@/pages/radars/list";
import RaysPage from "@/pages/rays";
import RepositoriesPage from "@/pages/repositories/list";
import RingsPage from "@/pages/rings/list";
import SegmentsPage from "@/pages/segments/list";
import TeamsPage from "@/pages/teams/list";
import TechnologiesPage from "@/pages/technologies/list";
import TechnologyBlipsPage from "@/pages/technology-blips/list";
import WelcomePage from "@/pages/bye";

// Include product resource pages at alphabet
import ShowProductCommunicationsPage from "@/pages/products/show-communications";
import ShowProductContributionsPage from "@/pages/products/show-contributions";
import ShowProductFinancesPage from "@/pages/products/show-finances";
import ShowProductLicensesPage from "@/pages/products/show-licenses";
import ShowProductPracticesPage from "@/pages/products/show-practices";
import ShowProductTechnologiesPage from "@/pages/products/show-technologies";

// Include radar resource pages at alphabet
import NewRadarPage from "@/pages/radars/new";
import EditRadarPage from "@/pages/radars/edit";
import ShowRadarPage from "@/pages/radars/show";

// Include technology resource pages at alphabet
import NewTechnologyPage from "@/pages/technologies/new";
import EditTechnologyPage from "@/pages/technologies/edit";
import { PrivateProvider } from "@/providers/private-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { onSigninCallback, userManager } from "@/providers/auth-config";
import { AuthProvider } from "react-oidc-context";

export const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AuthProvider userManager={userManager} onSigninCallback={onSigninCallback}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateProvider>
                  <AccountLayout />
                </PrivateProvider>
              }
            >
              <Route path="/account" element={<AccountPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route path="/" element={<AppLayout />}>
              <Route path="/welcome" element={<WelcomePage />} />
            </Route>
            <Route
              path="/"
              element={
                <PrivateProvider>
                  <BillingLayout />
                </PrivateProvider>
              }
            >
              <Route path="/billing" element={<BillingPage />} />
              <Route path="/invoices" element={<InvoicesPage />} />
            </Route>
            <Route
              path="/"
              element={
                <PrivateProvider>
                  <NotificationsLayout />
                </PrivateProvider>
              }
            >
              <Route path="/notifications" element={<NotificationsPage />} />
            </Route>
            <Route
              path="/"
              element={
                <PrivateProvider>
                  <LegalLayout />
                </PrivateProvider>
              }
            >
              <Route path="/about" element={<AboutPage />} />
            </Route>
            <Route
              path="/"
              element={
                <PrivateProvider>
                  <RadarLayout />
                </PrivateProvider>
              }
            >
              <Route index element={<HomePage />} />
              <Route path="/adapters" element={<AdaptersPage />} />
              <Route path="/authors" element={<AuthorsPage />} />
              <Route path="/bi-systems" element={<BiSystemsPage />} />
              <Route path="/cobwebs" element={<CobwebsPage />} />
              <Route path="/channels" element={<ChannelsPage />} />
              <Route path="/licenses" element={<LicensesPage />} />
              <Route path="/participants" element={<ParticipantsPage />} />
              <Route path="/pies" element={<PiesPage />} />
              <Route path="/platforms" element={<PlatformsPage />} />
              <Route path="/practices" element={<PracticesPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/show-communications/:id" element={<ShowProductCommunicationsPage />} />
              <Route path="/products/show-contributions/:id" element={<ShowProductContributionsPage />} />
              <Route path="/products/show-finances/:id" element={<ShowProductFinancesPage />} />
              <Route path="/products/show-licenses/:id" element={<ShowProductLicensesPage />} />
              <Route path="/products/show-practices/:id" element={<ShowProductPracticesPage />} />
              <Route path="/products/show-technologies/:id" element={<ShowProductTechnologiesPage />} />
              <Route path="/radars" element={<RadarsPage />} />
              <Route path="/radars/new" element={<NewRadarPage />} />
              <Route path="/radars/edit/:id" element={<EditRadarPage />} />
              <Route path="/radars/show/:id" element={<ShowRadarPage />} />
              <Route path="/rays" element={<RaysPage />} />
              <Route path="/repositories" element={<RepositoriesPage />} />
              <Route path="/rings" element={<RingsPage />} />
              <Route path="/segments" element={<SegmentsPage />} />
              <Route path="/teams" element={<TeamsPage />} />
              <Route path="/technologies" element={<TechnologiesPage />} />
              <Route path="/technologies/new" element={<NewTechnologyPage />} />
              <Route path="/technologies/edit/:id" element={<EditTechnologyPage />} />
              <Route path="/technology-blips" element={<TechnologyBlipsPage />} />
            </Route>
          </Routes>
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
