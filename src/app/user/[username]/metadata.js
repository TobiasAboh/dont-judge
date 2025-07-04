export async function generateMetadata({ params }) {
  const username = params.username;

  return {
    title: "We Listen We Don't Judge",
    description: "Send and receive anonymous confessions. No one will judge🤫",
    openGraph: {
      title: "We Listen We Don't Judge",
      description: "Send and receive anonymous confessions. No one will judge🤫",
      url: `https://dontjudge.vercel.app/confession/${username}/sendMessage`,
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