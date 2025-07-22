import ClientAuthLayout from "../components/provider/clientAuthLayout";

export const metadata = {
  title: "ShopSmart: Auth",
  description: "Modern E-commerce Store",
};

export default function AuthLayout({ children }) {
  return <ClientAuthLayout>{children}</ClientAuthLayout>;
}
