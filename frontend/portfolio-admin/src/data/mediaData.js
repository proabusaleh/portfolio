export const MEDIA_FOLDERS = [
  { id: 'root', name: 'All Media', parentId: null, icon: 'FolderOpen' },
  { id: 'images', name: 'Images', parentId: 'root', icon: 'Image' },
  { id: 'projects', name: 'Projects', parentId: 'images', icon: 'FolderKanban' },
  { id: 'blog', name: 'Blog', parentId: 'images', icon: 'FileText' },
  { id: 'avatars', name: 'Avatars', parentId: 'images', icon: 'User' },
  { id: 'documents', name: 'Documents', parentId: 'root', icon: 'File' },
  { id: 'videos', name: 'Videos', parentId: 'root', icon: 'Video' },
];

const IMG = (id, w = 400, h = 300) =>
  `https://picsum.photos/seed/media${id}/${w}/${h}`;

export const SAMPLE_MEDIA = [
  { id: 1,  name: 'hero-banner.jpg',       type: 'image', size: 245000,  folderId: 'projects', url: IMG(1),  thumbnail: IMG(1, 200, 150),  uploadedAt: '2024-12-15', alt: 'Hero banner', tags: ['banner', 'hero'] },
  { id: 2,  name: 'dashboard-preview.png',  type: 'image', size: 180000,  folderId: 'projects', url: IMG(2),  thumbnail: IMG(2, 200, 150),  uploadedAt: '2024-12-10', alt: 'Dashboard preview', tags: ['dashboard', 'screenshot'] },
  { id: 3,  name: 'profile-photo.jpg',      type: 'image', size: 95000,   folderId: 'avatars',  url: IMG(3),  thumbnail: IMG(3, 200, 150),  uploadedAt: '2024-11-20', alt: 'Profile photo', tags: ['profile'] },
  { id: 4,  name: 'team-photo.jpg',         type: 'image', size: 320000,  folderId: 'blog',     url: IMG(4),  thumbnail: IMG(4, 200, 150),  uploadedAt: '2024-11-18', alt: 'Team photo', tags: ['team'] },
  { id: 5,  name: 'logo-dark.png',          type: 'image', size: 42000,   folderId: 'images',   url: IMG(5),  thumbnail: IMG(5, 200, 150),  uploadedAt: '2024-11-15', alt: 'Dark logo', tags: ['logo', 'brand'] },
  { id: 6,  name: 'logo-light.png',         type: 'image', size: 38000,   folderId: 'images',   url: IMG(6),  thumbnail: IMG(6, 200, 150),  uploadedAt: '2024-11-15', alt: 'Light logo', tags: ['logo', 'brand'] },
  { id: 7,  name: 'project-showcase.mp4',   type: 'video', size: 5200000, folderId: 'videos',   url: '',       thumbnail: IMG(7, 200, 150),  uploadedAt: '2024-11-10', alt: 'Showcase video', tags: ['showcase'] },
  { id: 8,  name: 'resume-abusaleh.pdf',    type: 'document', size: 280000, folderId: 'documents', url: '',    thumbnail: '',                uploadedAt: '2024-10-25', alt: '', tags: ['resume'] },
  { id: 9,  name: 'blog-cover-react.jpg',   type: 'image', size: 156000,  folderId: 'blog',     url: IMG(9),  thumbnail: IMG(9, 200, 150),  uploadedAt: '2024-10-20', alt: 'React blog cover', tags: ['react', 'blog'] },
  { id: 10, name: 'portfolio-thumb.jpg',    type: 'image', size: 110000,  folderId: 'projects', url: IMG(10), thumbnail: IMG(10, 200, 150), uploadedAt: '2024-10-15', alt: 'Portfolio thumbnail', tags: ['portfolio'] },
  { id: 11, name: 'certificate-meta.pdf',   type: 'document', size: 150000, folderId: 'documents', url: '',    thumbnail: '',                uploadedAt: '2024-10-10', alt: '', tags: ['certificate'] },
  { id: 12, name: 'app-demo.mp4',           type: 'video', size: 8400000, folderId: 'videos',   url: '',       thumbnail: IMG(12, 200, 150), uploadedAt: '2024-09-30', alt: 'App demo video', tags: ['demo'] },
  { id: 13, name: 'ecommerce-screenshot.png', type: 'image', size: 210000, folderId: 'projects', url: IMG(13), thumbnail: IMG(13, 200, 150), uploadedAt: '2024-09-28', alt: 'Ecommerce screenshot', tags: ['ecommerce'] },
  { id: 14, name: 'favicon.ico',            type: 'image', size: 5200,    folderId: 'images',   url: IMG(14), thumbnail: IMG(14, 200, 150), uploadedAt: '2024-09-20', alt: 'Favicon', tags: ['favicon'] },
  { id: 15, name: 'client-testimonial.jpg', type: 'image', size: 175000,  folderId: 'blog',     url: IMG(15), thumbnail: IMG(15, 200, 150), uploadedAt: '2024-09-15', alt: 'Client testimonial', tags: ['testimonial'] },
];

export const FILE_TYPES = {
  image:     { color: 'text-blue-500',  bg: 'bg-blue-50 dark:bg-blue-500/10',  label: 'Image' },
  video:     { color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-500/10', label: 'Video' },
  document:  { color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-500/10', label: 'Document' },
};

export const STORAGE_LIMIT = 100 * 1024 * 1024; // 100MB
