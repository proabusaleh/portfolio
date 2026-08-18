export const CV_TEMPLATES = [
  { id: 'classic', label: 'Classic', description: 'Clean professional layout' },
  { id: 'modern', label: 'Modern', description: 'Two-column with sidebar' },
  { id: 'minimal', label: 'Minimal', description: 'Simple and elegant' },
];

export const LANGUAGE_LEVELS = [
  { value: 1, label: 'Basic' },
  { value: 2, label: 'Elementary' },
  { value: 3, label: 'Intermediate' },
  { value: 4, label: 'Advanced' },
  { value: 5, label: 'Native' },
];

export const DEFAULT_RESUME = {
  personal: {
    name: 'Abu Saleh',
    title: 'Full Stack Developer',
    email: 'abusaleh@example.com',
    phone: '+880 123456 7890',
    location: 'Dhaka, Bangladesh',
    website: 'https://abusaleh.dev',
    avatar: 'https://i.pravatar.cc/150?u=saleh',
    summary:
      'Passionate full-stack developer with 5+ years of experience building modern web and mobile applications. Specialized in React, Node.js, and Flutter with a strong focus on clean UI and performance.',
  },

  experience: [
    {
      id: 1,
      company: 'TechCorp Ltd.',
      role: 'Senior Frontend Developer',
      location: 'Dhaka, Bangladesh',
      startDate: '2022-01',
      endDate: '',
      current: true,
      description:
        'Leading the frontend team in building a SaaS dashboard serving 50k+ users. Migrated legacy jQuery codebase to React, improving performance by 40%.',
      highlights: ['React', 'TypeScript', 'Tailwind CSS', 'GraphQL'],
    },
    {
      id: 2,
      company: 'WebStudio',
      role: 'Full Stack Developer',
      location: 'Remote',
      startDate: '2019-06',
      endDate: '2021-12',
      current: false,
      description:
        'Built and maintained multiple client projects including e-commerce platforms and custom WordPress themes. Implemented REST APIs and payment integrations.',
      highlights: ['PHP', 'WordPress', 'MySQL', 'React'],
    },
  ],

  education: [
    {
      id: 1,
      institution: 'University of Dhaka',
      degree: 'B.Sc. in Computer Science',
      location: 'Dhaka, Bangladesh',
      startDate: '2015-09',
      endDate: '2019-05',
      description: 'Graduated with honors. Focused on software engineering and web technologies.',
    },
  ],

  certifications: [
    {
      id: 1,
      name: 'Meta Frontend Developer',
      issuer: 'Meta (Coursera)',
      date: '2023-03',
      url: 'https://coursera.org/verify/meta-frontend',
    },
    {
      id: 2,
      name: 'AWS Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: '2022-11',
      url: 'https://aws.amazon.com/verification',
    },
  ],

  languages: [
    { id: 1, name: 'English', level: 4 },
    { id: 2, name: 'Bengali', level: 5 },
    { id: 3, name: 'Arabic', level: 2 },
  ],

  hobbies: ['Open Source Contributing', 'UI Design', 'Photography', 'Chess', 'Hiking'],

  skills: [
    'React', 'TypeScript', 'JavaScript', 'Node.js', 'PHP', 'Python',
    'WordPress', 'Flutter', 'Tailwind CSS', 'MySQL', 'PostgreSQL',
    'Git', 'Docker', 'Figma', 'REST APIs', 'GraphQL',
  ],

  template: 'classic',
};
