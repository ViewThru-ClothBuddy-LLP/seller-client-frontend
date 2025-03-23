"use client";

import Head from "next/head";
import Landing_Hero from "@/components/landing-page-components/Landing_Hero";
import Landing_Nav from "@/components/landing-page-components/Landing_Nav";
import Landing_Boxes from "@/components/landing-page-components/Landing_Boxes";
import Landing_Footer from "@/components/landing-page-components/Landing_Footer";
import Landing_Reviews from "@/components/landing-page-components/Landing_Reviews";
import LogInPage from "@/components/LogIn";
import SignUpPage from "@/components/Signup";

export default function Home() {
  return (
    <div>
      {/* Dynamic Page Title */}
      <Head>
        <title>Landing Page - ClothBuddy</title>
        <meta
          name="description"
          content="Welcome to the landing page of our application"
        />
      </Head>

      <Landing_Nav />
      <Landing_Hero />
      <Landing_Boxes />
      <Landing_Reviews />
      <Landing_Footer />
      {/* <LogInPage/> */}
      {/* <SignUpPage/> */}
    </div>
  );
}
