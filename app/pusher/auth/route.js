import { cookies } from "next/headers"
import { NextResponse } from "next/server"
const Pusher = require("pusher")

export async function POST(request) {
  const cookieStore = await cookies();
  const petAdoptionCookie = cookieStore.get("petadoption");

  // Safely extract the cookie value or default to an empty string
  const adminCookie = petAdoptionCookie ? petAdoptionCookie.value : "";

  if (adminCookie == process.env.SESSIONCOOKIEVALUE) {
    const pusher = new Pusher({
      appId: process.env.PUSHERID,
      key: process.env.NEXT_PUBLIC_PUSHERKEY,
      secret: process.env.PUSHERSECRET,
      cluster: "us2",
      useTLS: true
    })

    const ourData = await request.formData()
    const theSocketId = ourData.get("socket_id")
    const authResponse = pusher.authorizeChannel(theSocketId, "private-petchat")
    return NextResponse.json(authResponse)
  }

  return NextResponse.json({ message: "Message sent" })
}
