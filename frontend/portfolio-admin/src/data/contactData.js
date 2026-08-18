export const DEFAULT_CONTACT = {
  /* ── Personal / Business ── */
  displayName:   'Abu Saleh',
  jobTitle:      'WordPress & Flutter Developer',
  tagline:       'Building fast, scalable web & mobile solutions',
  bio:           'Freelance developer available for remote projects worldwide.',
  avatar:        '',

  /* ── Contact methods ── */
  email:         'abusaleh@example.com',
  emailAlt:      '',
  phone:         '+880 1712 345678',
  whatsapp:      '+8801712345678',      // digits only, no +
  telegram:      '@abusaleh',
  skype:         '',

  /* ── Address ── */
  addressLine1:  'Mirpur DOHS',
  addressLine2:  'Road 12, House 34',
  city:          'Dhaka',
  state:         'Dhaka Division',
  postalCode:    '1216',
  country:       'Bangladesh',
  showFullAddress: true,

  /* ── Map coordinates ── */
  latitude:      23.8103,
  longitude:     90.4125,
  mapZoom:       14,

  /* ── Business hours ── */
  timezone:      'Asia/Dhaka',
  hours: [
    { day: 'monday',    label: 'Monday',    open: true,  from: '09:00', to: '18:00' },
    { day: 'tuesday',   label: 'Tuesday',   open: true,  from: '09:00', to: '18:00' },
    { day: 'wednesday', label: 'Wednesday', open: true,  from: '09:00', to: '18:00' },
    { day: 'thursday',  label: 'Thursday',  open: true,  from: '09:00', to: '18:00' },
    { day: 'friday',    label: 'Friday',    open: true,  from: '09:00', to: '15:00' },
    { day: 'saturday',  label: 'Saturday',  open: false, from: '',       to: ''      },
    { day: 'sunday',    label: 'Sunday',    open: false, from: '',       to: ''      },
  ],

  /* ── Social links ── */
  socials: [
    { id: 1, platform: 'LinkedIn',  url: 'https://linkedin.com/in/abusaleh',   icon: 'bxl-linkedin' },
    { id: 2, platform: 'GitHub',    url: 'https://github.com/abusaleh',        icon: 'bxl-github' },
    { id: 3, platform: 'Twitter',   url: 'https://twitter.com/abusaleh',       icon: 'bxl-twitter' },
    { id: 4, platform: 'Instagram', url: 'https://instagram.com/abusaleh',     icon: 'bxl-instagram' },
    { id: 5, platform: 'YouTube',   url: 'https://youtube.com/@abusaleh',      icon: 'bxl-youtube' },
    { id: 6, platform: 'Dribbble',  url: 'https://dribbble.com/abusaleh',      icon: 'bxl-dribbble' },
  ],

  /* ── Preferences ── */
  showBusinessHours: true,
  showMap:           true,
  acceptingWork:     true,
};

export const SOCIAL_PLATFORMS = [
  { platform: 'LinkedIn',  icon: 'bxl-linkedin',    color: '#0077b5' },
  { platform: 'GitHub',    icon: 'bxl-github',      color: '#181717' },
  { platform: 'Twitter',   icon: 'bxl-twitter',     color: '#1da1f2' },
  { platform: 'Instagram', icon: 'bxl-instagram',   color: '#e4405f' },
  { platform: 'Facebook',  icon: 'bxl-facebook',    color: '#1877f2' },
  { platform: 'YouTube',   icon: 'bxl-youtube',     color: '#ff0000' },
  { platform: 'TikTok',    icon: 'bxl-tiktok',      color: '#000000' },
  { platform: 'Dribbble',  icon: 'bxl-dribbble',    color: '#ea4c89' },
  { platform: 'Behance',   icon: 'bxl-behance',     color: '#1769ff' },
  { platform: 'Medium',    icon: 'bxl-medium',      color: '#00ab6c' },
  { platform: 'Dev.to',    icon: 'bxl-dev-to',      color: '#0a0a0a' },
  { platform: 'Discord',   icon: 'bxl-discord',     color: '#5865f2' },
  { platform: 'Twitch',    icon: 'bxl-twitch',      color: '#9146ff' },
  { platform: 'Reddit',    icon: 'bxl-reddit',      color: '#ff4500' },
];

export const TIMEZONES = [
  { value: 'Asia/Dhaka',        label: '(GMT+6) Dhaka, Bangladesh' },
  { value: 'Asia/Kolkata',      label: '(GMT+5:30) India' },
  { value: 'Asia/Dubai',        label: '(GMT+4) Dubai, UAE' },
  { value: 'Europe/London',     label: '(GMT+0) London, UK' },
  { value: 'Europe/Berlin',     label: '(GMT+1) Berlin, Germany' },
  { value: 'America/New_York',  label: '(GMT-5) New York, USA' },
  { value: 'America/Los_Angeles', label: '(GMT-8) Los Angeles, USA' },
  { value: 'Australia/Sydney',  label: '(GMT+11) Sydney, Australia' },
  { value: 'Asia/Tokyo',        label: '(GMT+9) Tokyo, Japan' },
];