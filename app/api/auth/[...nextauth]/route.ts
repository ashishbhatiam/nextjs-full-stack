import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. 'Sign in with...')
          name: 'Credentials',
          // The credentials is used to generate a suitable form on the sign in page.
          // You can specify whatever fields you are expecting to be submitted.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            email: { label: "Email", type: "email", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {

                const res = await fetch("https://jobs-api-g0fe.onrender.com/api/v1/auth/login", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()
                console.log('user: ', user);

                // If no error and we have user data, return it
                if (res.ok && user) {
                    return user
                }
                // Return null if user data could not be retrieved
                return null
          }
        })
    ],
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        async jwt({ token, user }: { token: any; user: any }) {
          return { ...token, ...user };
        },
        async session({ session, token }: { session: any; token: any }) {
          session = { ...session, ...token, user: token.user };
          return session;
        },
      },
})

export { handler as GET, handler as POST }