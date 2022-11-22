import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Nav from "../components/Nav";
import styles from "../styles/Home.module.css";
import Results from "../components/Results";
import requests from "../utils/requests";

export default function Home({ results }) {
  const API_KEY = "750ed1365630dca3f197150d19508b33";

  return (
    <div className={styles.container}>
      <Head>
        <title>Hulu 2.0</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Nav />
      <Results results={results} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const genre = context.query.genre;

  const request = await fetch(
    `https://api.themoviedb.org/3${
      requests[genre]?.url || requests.fetchTrending.url
    }`
  ).then((res) => res.json());

  return {
    props: {
      results: JSON.parse(JSON.stringify(request.results)),
    },
  };
}
