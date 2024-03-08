import { Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
});

export const metadata = {
  title: "atsnigram",
  description: "atsnigram",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={raleway.className}>{children}</body>
    </html>
  );
}
