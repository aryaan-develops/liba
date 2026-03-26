import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required');
        }

        await connectDB();

        const user = await User.findOne({ email: credentials.email });

        if (!user || !user.password) {
          throw new Error('No user found');
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error('Invalid email or password');
        }

        console.log('Login successful. Raw role from DB:', user.role);
        
        const finalRole = (user.role && (user.role as any) !== 'undefined') ? String(user.role) : 'user';

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: finalRole as any,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    error: '/login',
    },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = (user.role && (user.role as any) !== 'undefined') ? user.role : 'user';
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id;
        session.user.role = (token.role && (token.role as any) !== 'undefined') ? token.role : 'user';
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
