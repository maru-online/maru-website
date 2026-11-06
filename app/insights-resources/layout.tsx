// Insights & Resources shell. `reader` is a parallel slot: empty by default,
// it shows an article in the reading panel when an article link is followed
// from within these pages (see @reader/(.)[section]/[slug]). A direct visit
// to an article URL renders the full article page instead.
export default function InsightsResourcesLayout({
  children,
  reader,
}: {
  children: React.ReactNode;
  reader: React.ReactNode;
}) {
  return (
    <>
      {children}
      {reader}
    </>
  );
}
