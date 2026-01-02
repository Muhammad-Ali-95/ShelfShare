 import "./globals.css";
import Header from "../components/Header"; 
import Footer from "../components/Footer";

export const metadata = {
  title: "Book Exchange",
  description: "Book Exchange App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {/* This div handles the green background from your App.js */}
        <div className="min-h-screen bg-green-50">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}