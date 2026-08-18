export const SKILL_CATEGORIES = [
  { value: 'frontend', label: 'Frontend', color: 'from-blue-500 to-cyan-500', icon: '💻' },
  { value: 'backend',  label: 'Backend',  color: 'from-purple-500 to-pink-500', icon: '⚙️' },
  { value: 'mobile',   label: 'Mobile',   color: 'from-emerald-500 to-teal-500', icon: '📱' },
  { value: 'tools',    label: 'Tools',    color: 'from-orange-500 to-red-500', icon: '🛠️' },
];

export const SAMPLE_SKILLS = [
  // Frontend
  { id: 1,  order: 1, name: 'HTML5',       icon: 'bxl-html5',       category: 'frontend', proficiency: 95, color: '#e34c26' },
  { id: 2,  order: 2, name: 'CSS3',        icon: 'bxl-css3',        category: 'frontend', proficiency: 92, color: '#264de4' },
  { id: 3,  order: 3, name: 'JavaScript',  icon: 'bxl-javascript',  category: 'frontend', proficiency: 90, color: '#f7df1e' },
  { id: 4,  order: 4, name: 'React',       icon: 'bxl-react',       category: 'frontend', proficiency: 85, color: '#61dafb' },
  { id: 5,  order: 5, name: 'Tailwind CSS', icon: 'bxl-tailwind-css', category: 'frontend', proficiency: 88, color: '#38bdf8' },

  // Backend
  { id: 6,  order: 1, name: 'PHP',         icon: 'bxl-php',         category: 'backend', proficiency: 90, color: '#777bb4' },
  { id: 7,  order: 2, name: 'WordPress',   icon: 'bxl-wordpress',   category: 'backend', proficiency: 95, color: '#21759b' },
  { id: 8,  order: 3, name: 'MySQL',       icon: 'bx-data',         category: 'backend', proficiency: 82, color: '#00758f' },
  { id: 9,  order: 4, name: 'Node.js',     icon: 'bxl-nodejs',      category: 'backend', proficiency: 75, color: '#68a063' },
  { id: 10, order: 5, name: 'REST APIs',   icon: 'bx-cloud',        category: 'backend', proficiency: 85, color: '#6366f1' },

  // Mobile
  { id: 11, order: 1, name: 'Flutter',     icon: 'bxl-flutter',     category: 'mobile', proficiency: 87, color: '#02569b' },
  { id: 12, order: 2, name: 'Dart',        icon: 'bx-code-alt',     category: 'mobile', proficiency: 85, color: '#00b4ab' },
  { id: 13, order: 3, name: 'Firebase',    icon: 'bxl-firebase',    category: 'mobile', proficiency: 80, color: '#ffca28' },

  // Tools
  { id: 14, order: 1, name: 'Git',         icon: 'bxl-git',         category: 'tools', proficiency: 90, color: '#f05032' },
  { id: 15, order: 2, name: 'Figma',       icon: 'bxl-figma',       category: 'tools', proficiency: 82, color: '#f24e1e' },
];