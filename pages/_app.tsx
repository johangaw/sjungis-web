import "bootstrap/dist/css/bootstrap.min.css";

import type { AppProps } from "next/app";
import { Navbar } from "../components/Navbar";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <header>
        <Navbar></Navbar>
      </header>
      <main className="container pt-3 ">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default App;
