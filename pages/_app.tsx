import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { Liff } from "@line/liff/exports";

function MyApp({ Component, pageProps }: AppProps) {
  const [liffObject, setLiffObject] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    // to avoid `window is not defined` error
    import("@line/liff")
      .then((liff) => liff.default)
      .then((liff) => {
        console.log("LIFF init...");
        liff
          .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! })
          .then(() => {
            console.log("LIFF init succeeded.");
            if (!liff.isLoggedIn()) {
              liff.login({
                redirectUri:
                  // 絶対パスで指定しないとurlの認証で弾かれる
                  `${process.env.NEXT_PUBLIC_FRONT_ENDPOINT}/profile`,
              });
            }
            setLiffObject(liff);
          })
          .catch((error: Error) => {
            console.log("LIFF init failed.");
            setLiffError(error.toString());
          });
      });
  }, []);

  // Provide `liff` object and `liffError` object
  // to page component as property
  pageProps.liff = liffObject;
  pageProps.liffError = liffError;
  pageProps.setLiffObject = setLiffObject;
  return <Component {...pageProps} />;
}

export default MyApp;
