import Badge from '../ui/Badge';

const MAP = {
  published: { variant: 'success', label: 'Published' },
  draft:     { variant: 'warning', label: 'Draft' },
  archived:  { variant: 'default', label: 'Archived' },
};

export default function ProjectStatusBadge({ status }) {
  const cfg = MAP[status] || MAP.draft;
  return <Badge variant={cfg.variant} dot>{cfg.label}</Badge>;
}