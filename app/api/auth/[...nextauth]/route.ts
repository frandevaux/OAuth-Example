import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID || "",
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET || "",
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
              params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code",
              },
            },
          }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
