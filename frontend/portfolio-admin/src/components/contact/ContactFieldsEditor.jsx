import Input from '../ui/Input';
import Textarea from '../ui/Textarea';

const FIELDS = [
  { key: 'displayName', label: 'Display Name', placeholder: 'Abu Saleh' },
  { key: 'jobTitle', label: 'Job Title', placeholder: 'WordPress & Flutter Developer' },
  { key: 'tagline', label: 'Tagline', placeholder: 'Building fast, scalable web & mobile solutions' },
  { key: 'bio', label: 'Bio', multiline: true, placeholder: 'Short bio about yourself...' },
  { key: 'email', label: 'Primary Email', type: 'email', placeholder: 'hello@example.com' },
  { key: 'emailAlt', label: 'Alternate Email', type: 'email', placeholder: '' },
  { key: 'phone', label: 'Phone', type: 'tel', placeholder: '+1 (555) 123-4567' },
  { key: 'whatsapp', label: 'WhatsApp', placeholder: '+15551234567' },
  { key: 'telegram', label: 'Telegram', placeholder: '@username' },
  { key: 'skype', label: 'Skype', placeholder: '' },
  { key: 'avatar', label: 'Avatar URL', placeholder: 'https://...' },
];

export default function ContactFieldsEditor({ value = {}, onChange }) {
  const update = (key, val) => onChange({ ...value, [key]: val });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {FIELDS.map(({ key, label, type, placeholder, multiline }) => (
        multiline ? (
          <div key={key} className="md:col-span-2">
            <Textarea
              label={label}
              value={value[key] || ''}
              onChange={(e) => update(key, e.target.value)}
              placeholder={placeholder}
              rows={3}
            />
          </div>
        ) : (
          <Input
            key={key}
            label={label}
            type={type || 'text'}
            value={value[key] || ''}
            onChange={(e) => update(key, e.target.value)}
            placeholder={placeholder}
          />
        )
      ))}
    </div>
  );
}
