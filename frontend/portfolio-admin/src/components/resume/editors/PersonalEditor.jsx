import { User, Mail, Phone, MapPin, Globe, Camera } from 'lucide-react';
import Input from '../../ui/Input';
import Textarea from '../../ui/Textarea';
import SectionCard from '../SectionCard';
import { useResumeStore } from '../../../store/resumeStore';

export default function PersonalEditor() {
  const personal = useResumeStore((s) => s.resume.personal);
  const update = useResumeStore((s) => s.updatePersonal);

  return (
    <SectionCard icon={User} title="Personal Information" description="Basic details shown at the top of your CV">
      <div className="flex items-center gap-4 mb-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50">
        {personal.avatar ? (
          <img src={personal.avatar} alt="Profile" className="w-20 h-20 rounded-lg object-cover border-2 border-indigo-500" />
        ) : (
          <div className="w-20 h-20 rounded-lg bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold">
            {personal.name?.[0]?.toUpperCase() || '?'}
          </div>
        )}
        <div className="flex-1">
          <Input
            label="Profile Photo URL"
            icon={Camera}
            placeholder="https://example.com/photo.jpg"
            value={personal.avatar}
            onChange={(e) => update('avatar', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input label="Full Name" value={personal.name} onChange={(e) => update('name', e.target.value)} />
        <Input label="Job Title" value={personal.title} onChange={(e) => update('title', e.target.value)} />
      </div>

      <Textarea
        label="Professional Summary"
        rows={4}
        className="mt-3"
        value={personal.summary}
        onChange={(e) => update('summary', e.target.value)}
        hint="A short summary of your professional background"
      />

      <h4 className="text-xs font-semibold uppercase text-gray-500 mt-6 mb-3">Contact</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input label="Email" icon={Mail} value={personal.email} onChange={(e) => update('email', e.target.value)} />
        <Input label="Phone" icon={Phone} value={personal.phone} onChange={(e) => update('phone', e.target.value)} />
        <Input label="Location" icon={MapPin} value={personal.location} onChange={(e) => update('location', e.target.value)} />
        <Input label="Website" icon={Globe} value={personal.website} onChange={(e) => update('website', e.target.value)} />
      </div>
    </SectionCard>
  );
}
