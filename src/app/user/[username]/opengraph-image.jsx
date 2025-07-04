// app/confession/[id]/opengraph-image.jsx
import { ImageResponse } from 'next/og';



export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage({ params }) {
  const { username } = params;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ffffff',
          fontSize: 48,
          fontWeight: 'bold',
          padding: '60px',
        }}
      >
        <img
          src="http://dontjudge.vercel.app/Title3.svg" // replace with your real domain
          width="600"
          height="200"
          alt="Title"
        />
      </div>
    ),
    size
  );
}
