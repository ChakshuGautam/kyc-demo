import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="icon"
          href={`${process.env.NEXT_PUBLIC_URL}/icons/favicon.ico`}
          sizes="16x16"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="Family ID, passbook" />
        <meta
          name="description"
          content="Family Passbook is a citizen facing app envisioned to make scheme delivery seamless and convenient for the families of Uttar Pradesh. The passbook app will contain a ledger of benefits recieved by a family along with enabling discovery of schemes for which a family is eligible."
        />
        <meta name="author" content="@passbook" />
        <meta name="theme-color" content="#e1703b" />

        <meta name="twitter:card" content="Summary" />
        <meta name="twitter:site" content="@passbook" />
        <meta name="twitter:title" content="Family ID | Passbook" />
        <meta
          name="twitter:description"
          content="Family Passbook is a citizen facing app envisioned to make scheme delivery seamless and convenient for the families of Uttar Pradesh. The passbook app will contain a ledger of benefits recieved by a family along with enabling discovery of schemes for which a family is eligible."
        />
        <meta name="twitter:creator" content="@passbook" />
        <meta
          name="twitter:image:src"
          content={`${process.env.NEXT_PUBLIC_URL}/icons/logo512.png`}
        />

        <meta property="og:title" content="Family ID | Passbook" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}`} />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_URL}/icons/logo512.png`}
        />
        <meta
          property="og:description"
          content="Family Passbook is a citizen facing app envisioned to make scheme delivery seamless and convenient for the families of Uttar Pradesh. The passbook app will contain a ledger of benefits recieved by a family along with enabling discovery of schemes for which a family is eligible."
        />
        <meta property="og:site_name" content="Family ID | Passbook" />
        {/* <meta http-equiv="X-Frame-Options" content="SAMEORIGIN" />
        <meta
          http-equiv="Content-Security-Policy"
          content="frame-ancestors 'self'"
        /> */}

        <link
          rel="apple-touch-icon"
          href={`${process.env.NEXT_PUBLIC_URL}/icons/logo192.png`}
        />
        <link
          rel="manifest"
          href={`${process.env.NEXT_PUBLIC_URL}/manifest.json`}
        />
        <link
          rel="icon"
          href={`${process.env.NEXT_PUBLIC_URL}/icons/favicon.ico`}
        />

        <title>पासबुक</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
