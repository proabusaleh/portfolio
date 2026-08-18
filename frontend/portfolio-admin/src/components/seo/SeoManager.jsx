import { useState, useEffect, useCallback } from 'react';
import { Save, Settings, Globe, Bot, FileCode, Link2, Search } from 'lucide-react';
import { toast } from 'sonner';

import PageHeader from '../../components/ui/PageHeader';
import Card, { CardBody } from '../../components/ui/Card';
import Tabs from '../../components/ui/Tabs';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Toggle from '../../components/ui/Toggle';
import Select from '../../components/ui/Select';
import TagsInput from '../../components/forms/TagsInput';
import FormSection from '../../components/forms/FormSection';

import SeoScore from '../../components/seo/SeoScore';
import GooglePreview from '../../components/seo/GooglePreview';
import FacebookPreview from '../../components/seo/FacebookPreview';
import TwitterPreview from '../../components/seo/TwitterPreview';
import SitemapGenerator from '../../components/seo/SitemapGenerator';
import RobotsEditor from '../../components/seo/RobotsEditor';
import SchemaBuilder from '../../components/seo/SchemaBuilder';
import PageOverrides from '../../components/seo/PageOverrides';
import GoogleSearchConsole from '../../components/seo/GoogleSearchConsole';

import {
  getSeoSettings, updateSeoSettings,
  getRobots, getSitemap, getOverrides, getSchemas,
  analyzeSeoScore,
} from '../../api/seoApi';

const TABS = [
  { value: 'general',   label: 'General',       icon: Settings },
  { value: 'previews',  label: 'Previews',      icon: Globe    },
  { value: 'sitemap',   label: 'Sitemap',       icon: Link2    },
  { value: 'robots',    label: 'Robots.txt',    icon: Bot      },
  { value: 'schema',    label: 'Schema',        icon: FileCode },
  { value: 'overrides', label: 'Page Meta',     icon: FileCode },
  { value: 'gsc',       label: 'Search Console',icon: Search   },
];

export default function SeoManager() {
  const [tab, setTab]           = useState('general');
  const [settings, setSettings] = useState(null);
  const [robots, setRobots]     = useState('');
  const [sitemap, setSitemap]   = useState([]);
  const [overrides, setOverrides] = useState([]);
  const [schemas, setSchemas]   = useState([]);
  const [saving, setSaving]     = useState(false);
  const [dirty, setDirty]       = useState(false);

  const fetch = useCallback(async () => {
    try {
      const [s, r, sm, ov, sc] = await Promise.all([
        getSeoSettings(),
        getRobots(),
        getSitemap(),
        getOverrides(),
        getSchemas(),
      ]);
      setSettings(s);
      setRobots(r);
      setSitemap(sm);
      setOverrides(ov);
      setSchemas(sc);
    } catch {
      toast.error('Failed to load SEO data');
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const updateField = (field, value) => {
    setSettings((s) => ({ ...s, [field]: value }));
    setDirty(true);
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      await updateSeoSettings(settings);
      toast.success('SEO settings saved ✓');
      setDirty(false);
    } catch {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (!settings) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const analysis = analyzeSeoScore(settings);

  return (
    <div>
      <PageHeader
        title="SEO Manager"
        subtitle={dirty ? '⚠ You have unsaved changes' : 'Optimize your site for search engines'}
        actions={
          tab === 'general' && (
            <Button icon={Save} onClick={handleSaveSettings} loading={saving}>
              Save Settings
            </Button>
          )
        }
      />

      <Card className="overflow-hidden">
        <Tabs tabs={TABS} active={tab} onChange={setTab} />

        <CardBody>
          {/* ─── GENERAL ─── */}
          {tab === 'general' && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 space-y-6">
                <FormSection title="Site Identity" description="How your site identifies itself">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input label="Site Name" value={settings.siteName} onChange={(e) => updateField('siteName', e.target.value)} />
                    <Input label="Author" value={settings.author} onChange={(e) => updateField('author', e.target.value)} />
                  </div>
                  <Input
                    label="Default Page Title"
                    value={settings.defaultTitle}
                    onChange={(e) => updateField('defaultTitle', e.target.value)}
                    hint={`${settings.defaultTitle?.length || 0}/60 characters`}
                  />
                  <Input
                    label="Title Template"
                    value={settings.titleTemplate}
                    onChange={(e) => updateField('titleTemplate', e.target.value)}
                    hint="Use %s as page title placeholder. E.g., '%s | My Site'"
                  />
                  <Textarea
                    label="Site Description"
                    rows={3}
                    value={settings.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    hint={`${settings.description?.length || 0}/160 characters`}
                  />
                  <TagsInput
                    label="Keywords"
                    value={settings.keywords}
                    onChange={(v) => updateField('keywords', v)}
                    hint="Add 5-10 relevant keywords"
                  />
                </FormSection>

                <FormSection title="Open Graph (Facebook)" description="How your site appears when shared on social media">
                  <Input
                    label="Default OG Image URL"
                    value={settings.ogImage}
                    onChange={(e) => updateField('ogImage', e.target.value)}
                    hint="1200×630 recommended"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Select
                      label="OG Type"
                      value={settings.ogType}
                      onChange={(e) => updateField('ogType', e.target.value)}
                      options={[
                        { value: 'website', label: 'Website' },
                        { value: 'article', label: 'Article' },
                        { value: 'profile', label: 'Profile' },
                      ]}
                      placeholder=""
                    />
                    <Input
                      label="OG Site Name"
                      value={settings.ogSiteName}
                      onChange={(e) => updateField('ogSiteName', e.target.value)}
                    />
                  </div>
                </FormSection>

                <FormSection title="Twitter / X">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Select
                      label="Card Type"
                      value={settings.twitterCard}
                      onChange={(e) => updateField('twitterCard', e.target.value)}
                      options={[
                        { value: 'summary',              label: 'Summary' },
                        { value: 'summary_large_image',  label: 'Summary large image' },
                      ]}
                      placeholder=""
                    />
                    <Input
                      label="Twitter Handle"
                      placeholder="@username"
                      value={settings.twitterHandle}
                      onChange={(e) => updateField('twitterHandle', e.target.value)}
                    />
                  </div>
                </FormSection>

                <FormSection title="Analytics & Tracking">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Input label="Google Analytics ID" placeholder="G-XXXXXXXXXX" value={settings.gaTrackingId} onChange={(e) => updateField('gaTrackingId', e.target.value)} />
                    <Input label="Google Tag Manager"  placeholder="GTM-XXXXXX"   value={settings.gtmId}        onChange={(e) => updateField('gtmId', e.target.value)} />
                    <Input label="Facebook Pixel"      placeholder="123456789"     value={settings.fbPixelId}    onChange={(e) => updateField('fbPixelId', e.target.value)} />
                  </div>
                </FormSection>

                <FormSection title="Site Verification">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Input label="Google" value={settings.googleVerification} onChange={(e) => updateField('googleVerification', e.target.value)} />
                    <Input label="Bing"   value={settings.bingVerification}   onChange={(e) => updateField('bingVerification', e.target.value)} />
                    <Input label="Yandex" value={settings.yandexVerification} onChange={(e) => updateField('yandexVerification', e.target.value)} />
                  </div>
                </FormSection>

                <FormSection title="Advanced">
                  <Input
                    label="Canonical URL"
                    value={settings.canonicalUrl}
                    onChange={(e) => updateField('canonicalUrl', e.target.value)}
                  />
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 space-y-3">
                    <Toggle
                      checked={settings.noindex}
                      onChange={(v) => updateField('noindex', v)}
                      label="🚫 No-index the entire site"
                      description="Prevents search engines from indexing your site (use with caution!)"
                    />
                    <Toggle
                      checked={settings.nofollow}
                      onChange={(v) => updateField('nofollow', v)}
                      label="🔗 No-follow all links"
                      description="Tell search engines not to follow links"
                    />
                  </div>
                </FormSection>
              </div>

              {/* SEO Score sidebar */}
              <div className="xl:sticky xl:top-4 xl:h-fit">
                <SeoScore analysis={analysis} />
              </div>
            </div>
          )}

          {/* ─── PREVIEWS ─── */}
          {tab === 'previews' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <GooglePreview
                title={settings.defaultTitle}
                description={settings.description}
                url={settings.canonicalUrl}
              />
              <FacebookPreview
                title={settings.defaultTitle}
                description={settings.description}
                image={settings.ogImage}
                url={settings.canonicalUrl}
              />
              <TwitterPreview
                title={settings.defaultTitle}
                description={settings.description}
                image={settings.ogImage}
                url={settings.canonicalUrl}
                handle={settings.twitterHandle}
              />
              <div className="lg:col-span-1">
                <SeoScore analysis={analysis} />
              </div>
            </div>
          )}

          {/* ─── SITEMAP ─── */}
          {tab === 'sitemap' && (
            <SitemapGenerator urls={sitemap} onSave={fetch} />
          )}

          {/* ─── ROBOTS ─── */}
          {tab === 'robots' && (
            <RobotsEditor initialText={robots} onSave={fetch} />
          )}

          {/* ─── SCHEMA ─── */}
          {tab === 'schema' && (
            <SchemaBuilder
              schemas={schemas}
              siteName={settings.siteName}
              siteUrl={settings.canonicalUrl}
              onSave={fetch}
            />
          )}

          {/* ─── OVERRIDES ─── */}
          {tab === 'overrides' && (
            <PageOverrides overrides={overrides} onSave={fetch} />
          )}

          {/* ─── GSC ─── */}
          {tab === 'gsc' && (
            <GoogleSearchConsole />
          )}
        </CardBody>
      </Card>
    </div>
  );
}