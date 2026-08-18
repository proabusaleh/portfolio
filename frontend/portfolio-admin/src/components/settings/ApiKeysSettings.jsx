import { Key } from 'lucide-react';
import SectionCard from '../resume/SectionCard';
import MaskedKeyInput from './MaskedKeyInput';

export default function ApiKeysSettings({ data, onChange }) {
  const update = (field, value) => onChange({ ...data, [field]: value });

  return (
    <div className="space-y-6">
      <SectionCard
        icon={Key}
        title="Google Services"
        description="Analytics, Maps, and more"
      >
        <MaskedKeyInput
          label="Google Analytics ID"
          value={data.googleAnalyticsId}
          onChange={(v) => update('googleAnalyticsId', v)}
          placeholder="G-XXXXXXXXXX"
          docsLink="https://analytics.google.com"
          hint="Format: G-XXXXXXXXXX (GA4)"
        />
        <MaskedKeyInput
          label="Google API Key"
          value={data.googleApiKey}
          onChange={(v) => update('googleApiKey', v)}
          placeholder="AIzaSy..."
          docsLink="https://console.cloud.google.com"
          hint="For Google Maps, YouTube, etc."
        />
      </SectionCard>

      <SectionCard
        icon={Key}
        title="Email Services"
        description="Newsletter & transactional emails"
      >
        <MaskedKeyInput
          label="Mailchimp API Key"
          value={data.mailchimpKey}
          onChange={(v) => update('mailchimpKey', v)}
          placeholder="xxxxxxxxxxxxxxxx-usX"
          docsLink="https://mailchimp.com/help/about-api-keys/"
        />
      </SectionCard>

      <SectionCard
        icon={Key}
        title="Payments"
        description="Stripe integration for payments"
      >
        <MaskedKeyInput
          label="Stripe Publishable Key"
          value={data.stripeKey}
          onChange={(v) => update('stripeKey', v)}
          placeholder="pk_live_..."
          docsLink="https://dashboard.stripe.com/apikeys"
        />
        <MaskedKeyInput
          label="Stripe Secret Key"
          value={data.stripeSecret}
          onChange={(v) => update('stripeSecret', v)}
          placeholder="sk_live_..."
          hint="🔒 Keep this secret! Never share publicly"
        />
      </SectionCard>

      <SectionCard
        icon={Key}
        title="AI & Developer Tools"
        description="OpenAI, GitHub, media hosting"
      >
        <MaskedKeyInput
          label="OpenAI API Key"
          value={data.openaiKey}
          onChange={(v) => update('openaiKey', v)}
          placeholder="sk-..."
          docsLink="https://platform.openai.com/api-keys"
        />
        <MaskedKeyInput
          label="GitHub Personal Access Token"
          value={data.githubToken}
          onChange={(v) => update('githubToken', v)}
          placeholder="ghp_..."
          docsLink="https://github.com/settings/tokens"
        />
        <MaskedKeyInput
          label="Cloudinary URL"
          value={data.cloudinaryUrl}
          onChange={(v) => update('cloudinaryUrl', v)}
          placeholder="cloudinary://..."
          docsLink="https://cloudinary.com/console"
          hint="For image/video hosting"
        />
      </SectionCard>

      <div className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900/50">
        <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-300 mb-1">
          🔒 Security Notice
        </p>
        <p className="text-xs text-yellow-700 dark:text-yellow-400">
          All API keys are stored in your browser's localStorage. For production, use environment variables and never commit keys to git repositories.
        </p>
      </div>
    </div>
  );
}