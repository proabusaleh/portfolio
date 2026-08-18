import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Globe, FileText, Code, Link2, BarChart3 } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Tabs from '../../components/ui/Tabs';
import Card, { CardBody } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import GooglePreview from '../../components/seo/GooglePreview';
import FacebookPreview from '../../components/seo/FacebookPreview';
import TwitterPreview from '../../components/seo/TwitterPreview';
import PageOverrides from '../../components/seo/PageOverrides';
import SitemapGenerator from '../../components/seo/SitemapGenerator';
import RobotsEditor from '../../components/seo/RobotsEditor';
import SchemaBuilder from '../../components/seo/SchemaBuilder';
import GoogleSearchConsole from '../../components/seo/GoogleSearchConsole';
import { getSeoSettings, saveSeoSettings } from '../../api/seoApi';

const TABS = [
  { value: 'general', label: 'General', icon: Globe },
  { value: 'pages', label: 'Pages', icon: FileText },
  { value: 'sitemap', label: 'Sitemap', icon: Link2 },
  { value: 'robots', label: 'Robots', icon: FileText },
  { value: 'schema', label: 'Schema', icon: Code },
  { value: 'gsc', label: 'Search Console', icon: BarChart3 },
];

export default function SeoManager() {
  const [tab, setTab] = useState('general');
  const [settings, setSettings] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => { getSeoSettings().then(setSettings); }, []);

  const update = (key, val) => setSettings((prev) => ({ ...prev, [key]: val }));

  const handleSave = async () => {
    setSaving(true);
    try { await saveSeoSettings(settings); toast.success('SEO settings saved'); } catch { toast.error('Failed'); }
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="SEO Manager"
        description="Optimize your site for search engines"
        actions={<Button size="sm" onClick={handleSave} loading={saving}>Save Settings</Button>}
      />

      <Tabs tabs={TABS} active={tab} onChange={setTab} />

      {tab === 'general' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardBody className="p-4 space-y-4">
              <h3 className="text-sm font-semibold">Site Settings</h3>
              <Input label="Site Title" value={settings.siteTitle || ''} onChange={(e) => update('siteTitle', e.target.value)} />
              <Input label="Site Description" value={settings.siteDescription || ''} onChange={(e) => update('siteDescription', e.target.value)} />
              <Input label="Site URL" value={settings.siteUrl || ''} onChange={(e) => update('siteUrl', e.target.value)} />
              <Input label="Twitter Handle" value={settings.twitterHandle || ''} onChange={(e) => update('twitterHandle', e.target.value)} />
              <Input label="Google Analytics ID" value={settings.googleAnalyticsId || ''} onChange={(e) => update('googleAnalyticsId', e.target.value)} />
              <Input label="Google Verification" value={settings.googleVerification || ''} onChange={(e) => update('googleVerification', e.target.value)} />
            </CardBody>
          </Card>
          <div className="space-y-4">
            <GooglePreview title={settings.siteTitle} description={settings.siteDescription} url={settings.siteUrl} />
            <FacebookPreview title={settings.siteTitle} description={settings.siteDescription} url={settings.siteUrl} image={settings.defaultImage} />
            <TwitterPreview title={settings.siteTitle} description={settings.siteDescription} url={settings.siteUrl} image={settings.defaultImage} />
          </div>
        </div>
      )}

      {tab === 'pages' && <Card><CardBody className="p-4"><PageOverrides /></CardBody></Card>}
      {tab === 'sitemap' && <Card><CardBody className="p-4"><SitemapGenerator /></CardBody></Card>}
      {tab === 'robots' && <Card><CardBody className="p-4"><RobotsEditor /></CardBody></Card>}
      {tab === 'schema' && <Card><CardBody className="p-4"><SchemaBuilder /></CardBody></Card>}
      {tab === 'gsc' && <Card><CardBody className="p-4"><GoogleSearchConsole /></CardBody></Card>}
    </div>
  );
}
