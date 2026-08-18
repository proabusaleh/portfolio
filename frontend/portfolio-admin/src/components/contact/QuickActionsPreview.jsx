import { Mail, Phone, MessageCircle, Send } from 'lucide-react';

export default function QuickActionsPreview({ contact }) {
  const phone = contact.phone?.replace(/[^\d+]/g, '') || '';
  const wa = contact.whatsapp?.replace(/[^\d]/g, '') || '';

  return (
    <div className="flex flex-wrap gap-2">
      {contact.email && (
        <a href={`mailto:${contact.email}`} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 transition">
          <Mail className="w-4 h-4" /> Email
        </a>
      )}
      {phone && (
        <a href={`tel:${phone}`} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition">
          <Phone className="w-4 h-4" /> Call
        </a>
      )}
      {wa && (
        <a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition">
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </a>
      )}
      {contact.telegram && (
        <a href={`https://t.me/${contact.telegram.replace('@', '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition">
          <Send className="w-4 h-4" /> Telegram
        </a>
      )}
    </div>
  );
}
