
import "./globals.css";

export const metadata = {
  title: "Shanzeh Nihari | Authentic Karachi Nihari",
  description:
    "Discover the rich taste of traditional Nihari at Shanzeh Nihari. Explore our menu and order for delivery or pickup.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
