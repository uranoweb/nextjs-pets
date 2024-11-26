import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function middleware(request) {
  if (request.url.includes("/admin")) {
    const cookieStore = await cookies()
    const petAdoptionCookie = cookieStore.get("petadoption");
    const adminCookie = petAdoptionCookie ? petAdoptionCookie.value : "";

    if (adminCookie == process.env.SESSIONCOOKIEVALUE) {
      return NextResponse.next()
    } else {
      const theUrl = request.nextUrl.clone()
      theUrl.pathname = "/login"
      return NextResponse.redirect(theUrl)
    }
  }

  return NextResponse.next()
}
