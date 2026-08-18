import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Save, User, MapPin, Clock, Share2, Eye } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card, { CardBody } from '../../components/ui/Card';
import Tabs from '../../components/ui/Tabs';
import Button from '../../components/ui/Button';
import ContactFieldsEditor from '../../components/contact/ContactFieldsEditor';
import AddressEditor from '../../components/contact/AddressEditor';
import MapPreview from '../../components/contact/MapPreview';
import BusinessHoursEditor from '../../components/contact/BusinessHoursEditor';
import SocialLinksEditor from '../../components/contact/SocialLinksEditor';
import QuickActionsPreview from '../../components/contact/QuickActionsPreview';
import ContactCardPreview from '../../components/contact/ContactCardPreview';
import { getContact, updateContact, geocodeAddress } from '../../api/contactApi';

const TABS = [
  { value: 'fields', label: 'Contact Info', icon: User },
  { value: 'address', label: 'Address & Map', icon: MapPin },
  { value: 'hours', label: 'Business Hours', icon: Clock },
  { value: 'socials', label: 'Social Links', icon: Share2 },
  { value: 'preview', label: 'Preview', icon: Eye },
];

export default function ContactInfo() {
  const [tab, setTab] = useState('fields');
  const [contact, setContact] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { getContact().then(setContact); }, []);

  const update = (key, val) => setContact((prev) => ({ ...prev, [key]: val }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const saved = await updateContact(contact);
      setContact(saved);
      toast.success('Contact info saved');
    } catch {
      toast.error('Failed to save');
    }
    setSaving(false);
  };

  const handleGeocode = async () => {
    const addr = [contact.addressLine1, contact.city, contact.state, contact.country].filter(Boolean).join(', ');
    if (!addr) { toast.error('Enter an address first'); return; }
    toast.info('Detecting coordinates...');
    const result = await geocodeAddress(addr);
    if (result) {
      update('latitude', result.lat);
      update('longitude', result.lon);
      toast.success('Coordinates detected');
    } else {
      toast.error('Could not detect coordinates');
    }
  };

  if (!contact) return null;

  const fullAddress = [contact.addressLine1, contact.city, contact.state, contact.country].filter(Boolean).join(', ');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contact Information"
        description="Manage your public contact details"
        actions={<Button size="sm" icon={Save} onClick={handleSave} loading={saving}>Save Changes</Button>}
      />

      <Tabs tabs={TABS} active={tab} onChange={setTab} />

      {tab === 'fields' && (
        <Card>
          <CardBody className="p-4 space-y-4">
            <h3 className="text-sm font-semibold">Basic Information</h3>
            <ContactFieldsEditor value={contact} onChange={setContact} />
            <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={contact.acceptingWork ?? true}
                  onChange={(e) => update('acceptingWork', e.target.checked)}
                  className="rounded border-gray-300 text-indigo-500 focus:ring-indigo-500"
                />
                Currently accepting work
              </label>
            </div>
          </CardBody>
        </Card>
      )}

      {tab === 'address' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardBody className="p-4 space-y-4">
              <h3 className="text-sm font-semibold">Address</h3>
              <AddressEditor value={contact} onChange={setContact} onGeocode={handleGeocode} />
            </CardBody>
          </Card>
          <Card>
            <CardBody className="p-4 space-y-3">
              <h3 className="text-sm font-semibold">Map Preview</h3>
              <MapPreview latitude={contact.latitude} longitude={contact.longitude} zoom={contact.mapZoom} address={fullAddress} />
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={contact.showMap ?? true}
                  onChange={(e) => update('showMap', e.target.checked)}
                  className="rounded border-gray-300 text-indigo-500 focus:ring-indigo-500"
                />
                Show map on portfolio
              </label>
            </CardBody>
          </Card>
        </div>
      )}

      {tab === 'hours' && (
        <Card>
          <CardBody className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Business Hours</h3>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={contact.showBusinessHours ?? true}
                  onChange={(e) => update('showBusinessHours', e.target.checked)}
                  className="rounded border-gray-300 text-indigo-500 focus:ring-indigo-500"
                />
                Show on portfolio
              </label>
            </div>
            <BusinessHoursEditor
              value={contact.hours}
              onChange={(hrs) => update('hours', hrs)}
              timezone={contact.timezone}
              onTimezoneChange={(tz) => update('timezone', tz)}
            />
          </CardBody>
        </Card>
      )}

      {tab === 'socials' && (
        <Card>
          <CardBody className="p-4 space-y-4">
            <h3 className="text-sm font-semibold">Social Links</h3>
            <SocialLinksEditor value={contact.socials} onChange={(s) => update('socials', s)} />
          </CardBody>
        </Card>
      )}

      {tab === 'preview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Contact Card</h3>
            <ContactCardPreview contact={contact} />
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Quick Actions</h3>
            <QuickActionsPreview contact={contact} />
          </div>
        </div>
      )}
    </div>
  );
}
