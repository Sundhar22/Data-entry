import "@/styles/globals.css";
import AuthProvider from "@/components/auth/auth-provider";

export const metadata = {
  title: "DataEntry - Agricultural Market Management",
  description:
    "Professional agricultural market management system for commissioners",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
