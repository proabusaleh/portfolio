export default function MapPreview({ latitude, longitude, zoom = 14, address }) {
  if (!latitude || !longitude) {
    return (
      <div className="aspect-video rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm text-gray-400">
        Set coordinates to see map
      </div>
    );
  }

  const query = address || `${latitude},${longitude}`;
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(query)}&zoom=${zoom}`;

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <iframe
        title="Map Preview"
        width="100%"
        height="300"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={embedUrl}
        className="w-full"
      />
    </div>
  );
}
