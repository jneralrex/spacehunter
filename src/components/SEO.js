import Head from "next/head";

const SEO = () => {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "HouseMatters",
              "url": "https://housematters.vercel.app",
              "description": "Find and rent houses from verified landlords.",
              "publisher": {
                "@type": "Organization",
                "name": "HouseMatters",
                "logo": "https://housematters.vercel.app/logo.png"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://housematters.vercel.app/search?q={search_term}",
                "query-input": "required name=search_term"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "HouseMatters",
              "url": "https://housematters.vercel.app",
              "description": "A trusted real estate platform for renting and leasing houses.",
              "logo": "https://housematters.vercel.app/logo.png",
              "sameAs": [
                "https://twitter.com/housematters",
                "https://www.facebook.com/housematters",
                "https://www.instagram.com/housematters"
              ]
            }
          ]),
        }}
      />
    </Head>
  );
};

export default SEO;
