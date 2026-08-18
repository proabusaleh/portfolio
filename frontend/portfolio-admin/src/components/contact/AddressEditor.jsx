import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { TIMEZONES } from '../../data/contactData';
import { MapPin } from 'lucide-react';

export default function AddressEditor({ value = {}, onChange, onGeocode }) {
  const update = (key, val) => onChange({ ...value, [key]: val });

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <Input label="Address Line 1" value={value.addressLine1 || ''} onChange={(e) => update('addressLine1', e.target.value)} placeholder="Street address" />
        <Input label="Address Line 2" value={value.addressLine2 || ''} onChange={(e) => update('addressLine2', e.target.value)} placeholder="Apt, suite, etc." />
        <div className="grid grid-cols-2 gap-3">
          <Input label="City" value={value.city || ''} onChange={(e) => update('city', e.target.value)} placeholder="Dhaka" />
          <Input label="State / Province" value={value.state || ''} onChange={(e) => update('state', e.target.value)} placeholder="Dhaka Division" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input label="Postal Code" value={value.postalCode || ''} onChange={(e) => update('postalCode', e.target.value)} placeholder="1216" />
          <Input label="Country" value={value.country || ''} onChange={(e) => update('country', e.target.value)} placeholder="Bangladesh" />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={value.showFullAddress ?? true} onChange={(e) => update('showFullAddress', e.target.checked)} className="rounded border-gray-300 text-indigo-500 focus:ring-indigo-500" />
          Show full address on portfolio
        </label>
      </div>

      <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
        <h4 className="text-sm font-semibold mb-3">Map Coordinates</h4>
        <div className="grid grid-cols-3 gap-3">
          <Input label="Latitude" type="number" value={value.latitude ?? ''} onChange={(e) => update('latitude', parseFloat(e.target.value) || 0)} placeholder="23.8103" />
          <Input label="Longitude" type="number" value={value.longitude ?? ''} onChange={(e) => update('longitude', parseFloat(e.target.value) || 0)} placeholder="90.4125" />
          <Input label="Zoom" type="number" value={value.mapZoom ?? 14} onChange={(e) => update('mapZoom', parseInt(e.target.value) || 14)} />
        </div>
        {onGeocode && (
          <Button size="sm" variant="outline" icon={MapPin} onClick={onGeocode} className="mt-2">
            Auto-detect from Address
          </Button>
        )}
      </div>

      <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
        <Select
          label="Timezone"
          value={value.timezone || 'Asia/Dhaka'}
          onChange={(e) => update('timezone', e.target.value)}
          options={TIMEZONES.map((t) => ({ value: t.value, label: t.label }))}
        />
      </div>
    </div>
  );
}
