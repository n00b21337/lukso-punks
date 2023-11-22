export default function MintedOut({}) {
  return (
    <>
      <p>All Croats have been minted out</p>
      <a
        href={process.env.NEXT_PUBLIC_OS_BASE}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-700 inline-block"
      >
        Check collection on Opensea
      </a>
    </>
  );
}
