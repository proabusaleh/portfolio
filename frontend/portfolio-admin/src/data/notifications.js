export const SAMPLE_NOTIFICATIONS = [
  {
    id: 1,
    type: 'message',
    title: 'New inquiry from Sarah Johnson',
    description: 'Interested in WordPress development',
    time: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
  },
  {
    id: 2,
    type: 'project',
    title: 'Project comment received',
    description: 'John commented on your Flutter app',
    time: new Date(Date.now() - 30 * 60 * 1000),
    read: false,
  },
  {
    id: 3,
    type: 'system',
    title: 'Backup completed',
    description: 'Weekly backup finished successfully',
    time: new Date(Date.now() - 3 * 60 * 60 * 1000),
    read: true,
  },
  {
    id: 4,
    type: 'blog',
    title: 'Blog post published',
    description: '"WordPress 6.5 Features" is now live',
    time: new Date(Date.now() - 24 * 60 * 60 * 1000),
    read: true,
  },
];

export const SAMPLE_USER = {
  name:  'Abu Saleh',
  email: 'abusaleh@example.com',
  role:  'admin',
  avatar: null, // fallback to initials
};