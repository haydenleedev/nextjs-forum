import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      //1. 로그인페이지 폼 자동생성해주는 코드
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      //2. 로그인요청시 실행되는코드
      //직접 DB에서 아이디,비번 비교하고
      //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
      async authorize(credentials) {
        let db = (await connectDB).db("forum");
        let user = await db
          .collection("user_cred")
          .findOne({ email: credentials.email });
        if (!user) {
          console.log("The email doesn't exist");
          return null;
        }
        const pwcheck = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!pwcheck) {
          console.log("Wrong password");
          return null;
        }
        return user;
      },
    }),
  ],

  //3. jwt 써놔야 잘됩니다 + jwt 만료일설정
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, //30일
  },

  callbacks: {
    //4. jwt 만들 때 실행되는 코드
    //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name;
        token.user.email = user.email;
        token.user.role = user.role;
      }
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },

  secret: process.env.JWT_SECRET, // jwt 생성시 쓰는 암호
  adapter: MongoDBAdapter(connectDB),
};

export default NextAuth(authOptions);

/* 

Next-auth 라이브러리를 사용하면 기본적으로 모든 방식이 JWT입니다.
유저 세션데이터를 DB에 저장해두지 않고 JWT만 유저에게 보내고
유저가 로그인이 필요한 페이지 방문시 유저가 제출한 JWT만 검사해서 입장시켜주는 방식입니다. 

아무튼 JWT를 사용하면 로그인 구현은 쉬워지는데
JWT방식의 단점같은게 마음에 안들어서 
session 방식으로 회원기능을 만들고 싶으면 DB adapter 기능을 쓰면 됩니다.
DB adapter 기능을 켜놓으면  

1. 첫 로그인시 자동으로 유저를 회원가입 시켜서 DB에 유저 회원정보를 보관해줍니다. 
2. 로그인시 자동으로 유저가 언제 로그인했는지 세션정보를 DB에 보관해줍니다.
3. 서버에서 지금 로그인된 유저정보가 필요하면 JWT가 아니라 DB에 있던 세션정보를 조회해서 가져옵니다. 
4. 로그아웃시 유저 세션정보는 DB에서 삭제됩니다. 

그래서 가입된 유저정보를 DB에 저장하는게 필요하거나
유저 로그인상태를 엄격하게 관리하고 싶으면 DB adapter 기능을 사용해봅시다. 

*** MongoDB adapter 설정하기
npm install @next-auth/mongodb-adapter 

MongoDB말고 다른 DB에 유저 세션을 저장하고 싶으면 다른 DB adapter를 찾아서 사용하면 됩니다. 
redis같은 것들 쓰면 데이터 저장시 하드말고 램을 사용하기 때문에 빨라서 session 방식 구현할 때 인기있습니다.
*/
