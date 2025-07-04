export async function generateMetadata({ params }) {
  const username = params.username;

  return {
    title: "Anonymous Confession",
    description: "Someone left a confession for you",
    openGraph: {
      title: "Anonymous Confession",
      description: "Someone left a confession for you",
      url: `https://dont.com/confession/${username}/sendMessage`,
      images: [
        {
          url: `https://dontjudge.vercel.app/user/${username}/opengraph-image`, // this will return PNG
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
  };
}