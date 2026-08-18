import { useState } from 'react';
import { Plus, Trash2, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import Card, { CardBody } from '../ui/Card';
import Button from '../ui/Button';
import Select from '../ui/Select';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import { copyToClipboard, cn } from '../../lib/utils';
import { SCHEMA_TYPES } from '../../data/seoData';
import { saveSchema, deleteSchema } from '../../api/seoApi';

/* Schema templates by type */
const SCHEMA_TEMPLATES = {
  Person: (name, url) => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: name || 'Abu Saleh',
    url: url || 'https://yourportfolio.com',
    jobTitle: 'WordPress & Flutter Developer',
    email: 'abusaleh@example.com',
    sameAs: [
      'https://linkedin.com/in/abusaleh',
      'https://github.com/abusaleh',
      'https://twitter.com/abusaleh',
    ],
  }),
  Organization: (name, url) => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: name || 'Your Company',
    url: url || 'https://yourportfolio.com',
    logo: 'https://yourportfolio.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+880-1712-345678',
      contactType: 'Customer Service',
    },
  }),
  WebSite: (name, url) => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: name || 'Your Portfolio',
    url: url || 'https://yourportfolio.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${url || 'https://yourportfolio.com'}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }),
  Article: () => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Your Article Title',
    author: { '@type': 'Person', name: 'Abu Saleh' },
    datePublished: new Date().toISOString().split('T')[0],
    image: 'https://yourportfolio.com/article-image.jpg',
  }),
  Service: () => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'WordPress Development',
    provider: { '@type': 'Person', name: 'Abu Saleh' },
    areaServed: 'Worldwide',
  }),
  FAQPage: () => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is your first question?',
        acceptedAnswer: { '@type': 'Answer', text: 'Your answer here.' },
      },
    ],
  }),
  BreadcrumbList: () => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://yourportfolio.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://yourportfolio.com/blog' },
    ],
  }),
};

export default function SchemaBuilder({ schemas: initialSchemas, siteName, siteUrl, onSave }) {
  const [schemas, setSchemas] = useState(initialSchemas || []);
  const [selectedType, setSelectedType] = useState('Person');
  const [copiedId, setCopiedId] = useState(null);

  const addSchema = () => {
    const template = SCHEMA_TEMPLATES[selectedType]?.(siteName, siteUrl);
    if (!template) return;

    const newSchema = {
      id: Date.now(),
      type: selectedType,
      name: `${selectedType} Schema`,
      json: JSON.stringify(template, null, 2),
    };
    setSchemas([...schemas, newSchema]);
  };

  const updateSchemaJson = (id, json) => {
    setSchemas(schemas.map((s) => s.id === id ? { ...s, json } : s));
  };

  const updateSchemaName = (id, name) => {
    setSchemas(schemas.map((s) => s.id === id ? { ...s, name } : s));
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this schema?')) return;
    await deleteSchema(id);
    setSchemas(schemas.filter((s) => s.id !== id));
    toast.success('Schema deleted');
    onSave?.();
  };

  const handleSaveAll = async () => {
    for (const schema of schemas) {
      await saveSchema(schema);
    }
    toast.success('All schemas saved ✓');
    onSave?.();
  };

  const handleCopy = async (schema) => {
    await copyToClipboard(schema.json);
    setCopiedId(schema.id);
    toast.success('JSON-LD copied');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const validateJson = (json) => {
    try {
      JSON.parse(json);
      return { valid: true };
    } catch (e) {
      return { valid: false, error: e.message };
    }
  };

  return (
    <div className="space-y-4">
      {/* Add form */}
      <Card>
        <CardBody>
          <h3 className="font-semibold mb-1">Add Schema Markup</h3>
          <p className="text-xs text-gray-500 mb-4">
            Structured data helps Google understand your content better
          </p>

          <div className="flex gap-2">
            <Select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              options={SCHEMA_TYPES.map((t) => ({ value: t.value, label: t.label }))}
              placeholder=""
              className="flex-1"
            />
            <Button icon={Plus} onClick={addSchema}>Add Schema</Button>
          </div>

          {/* Type descriptions */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
            {SCHEMA_TYPES.map((t) => (
              <button
                key={t.value}
                onClick={() => setSelectedType(t.value)}
                className={cn(
                  'p-2 rounded-lg text-left transition text-xs border-2',
                  selectedType === t.value
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30'
                    : 'border-gray-200 dark:border-gray-800 hover:border-indigo-300'
                )}
              >
                <div className="font-semibold">{t.label}</div>
                <div className="text-gray-500 text-[10px] mt-0.5">{t.description}</div>
              </button>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Schema list */}
      {schemas.length === 0 ? (
        <Card>
          <CardBody className="text-center py-12">
            <div className="text-4xl mb-2">📋</div>
            <p className="font-semibold">No schemas yet</p>
            <p className="text-xs text-gray-500 mt-1">
              Add your first schema to enhance search results
            </p>
          </CardBody>
        </Card>
      ) : (
        <>
          <AnimatePresence>
            {schemas.map((schema) => {
              const validation = validateJson(schema.json);
              return (
                <motion.div
                  key={schema.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card>
                    <CardBody>
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-primary text-white flex items-center justify-center shrink-0 text-lg">
                          {SCHEMA_TYPES.find((t) => t.value === schema.type)?.label.split(' ')[0] || '📋'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <input
                            value={schema.name}
                            onChange={(e) => updateSchemaName(schema.id, e.target.value)}
                            className="w-full font-semibold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-indigo-500/30 rounded px-1"
                          />
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-gray-500">{schema.type}</span>
                            <span className={cn(
                              'text-xs font-semibold',
                              validation.valid ? 'text-green-500' : 'text-red-500'
                            )}>
                              {validation.valid ? '✓ Valid JSON' : '✗ Invalid JSON'}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleCopy(schema)}
                            className={cn(
                              'p-1.5 rounded transition',
                              copiedId === schema.id
                                ? 'bg-green-500 text-white'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                            )}
                            title="Copy JSON-LD"
                          >
                            {copiedId === schema.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => remove(schema.id)}
                            className="p-1.5 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <textarea
                        value={schema.json}
                        onChange={(e) => updateSchemaJson(schema.id, e.target.value)}
                        rows={10}
                        spellCheck={false}
                        className={cn(
                          'w-full p-3 font-mono text-xs rounded-lg border resize-y focus:outline-none focus:ring-2',
                          validation.valid
                            ? 'border-gray-300 dark:border-gray-700 focus:ring-indigo-500/30 focus:border-indigo-500 bg-gray-900 text-gray-100'
                            : 'border-red-500 focus:ring-red-500/30 bg-red-50 dark:bg-red-950/20'
                        )}
                      />

                      {!validation.valid && (
                        <p className="text-xs text-red-500 mt-1">⚠ {validation.error}</p>
                      )}
                    </CardBody>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>

          <div className="flex justify-end">
            <Button onClick={handleSaveAll}>Save All Schemas</Button>
          </div>
        </>
      )}
    </div>
  );
}