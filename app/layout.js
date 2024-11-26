import "./globals.css"
import { Source_Sans_3 } from "next/font/google"
import Footer from "../lib/footer"
import { cookies } from "next/headers"

const ss3 = Source_Sans_3({ subsets: ["latin"] })

export const metadata = {
  title: "Pet Adoption",
  description: "The best local pet adoption center."
}

// After updating Next.js to 15.0.3, error occured, so got chatgpt's help to rewrite the codes here
export default async function RootLayout({ children }) {
  const cookieStore = await cookies() // Await `cookies()` here
  const petAdoptionCookie = cookieStore.get("petadoption"); // Get the specific cookie
  const adminCookie = petAdoptionCookie ? petAdoptionCookie.value : "";

  const isAdmin = adminCookie === process.env.SESSIONCOOKIEVALUE;

  return (
    <html lang="en">
      <body className={ss3.className}>
        {children}
        <Footer isAdmin={isAdmin} />
      </body>
    </html>
  )
}
