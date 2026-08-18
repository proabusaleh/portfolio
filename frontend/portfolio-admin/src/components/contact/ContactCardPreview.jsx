import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactCardPreview({ contact }) {
  const fullAddress = [contact.addressLine1, contact.addressLine2, contact.city, contact.state, contact.postalCode, contact.country].filter(Boolean).join(', ');

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-600" />
      <div className="px-6 pb-6 -mt-8">
        <div className="w-16 h-16 rounded-xl bg-white dark:bg-gray-800 border-4 border-white dark:border-gray-900 shadow flex items-center justify-center text-xl font-bold text-indigo-500 mb-3 overflow-hidden">
          {contact.avatar ? (
            <img src={contact.avatar} alt={contact.displayName} className="w-full h-full object-cover" />
          ) : (
            contact.displayName?.charAt(0) || '?'
          )}
        </div>
        <h3 className="text-lg font-bold">{contact.displayName || 'Your Name'}</h3>
        <p className="text-sm text-gray-500">{contact.jobTitle || 'Your Title'}</p>
        {contact.tagline && <p className="text-xs text-gray-400 mt-0.5">{contact.tagline}</p>}

        {contact.acceptingWork && (
          <p className="mt-2 text-xs text-green-600 dark:text-green-400 font-medium">Available for opportunities</p>
        )}

        <div className="mt-4 space-y-2.5 text-sm">
          {contact.email && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Mail className="w-4 h-4 shrink-0" /> {contact.email}
            </div>
          )}
          {contact.phone && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Phone className="w-4 h-4 shrink-0" /> {contact.phone}
            </div>
          )}
          {fullAddress && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <MapPin className="w-4 h-4 shrink-0" /> {fullAddress}
            </div>
          )}
        </div>

        {contact.socials?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {contact.socials.map((s) => (
              <a key={s.id} href={s.url} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition">
                <i className={`bx ${s.icon}`} /> {s.platform}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
