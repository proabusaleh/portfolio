<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        $posts = [
            [
                'title' => '10 React Performance Optimization Techniques Every Developer Should Know',
                'slug' => 'react-performance-optimization-techniques',
                'excerpt' => 'Deep dive into advanced React optimization strategies — from code splitting and lazy loading to memoization, virtualization, and concurrent features.',
                'content' => '<p>Performance optimization is one of the most critical aspects of building production React applications. A slow app frustrates users and directly impacts your business metrics — every 100ms delay in load time can reduce conversions by 1%. In this comprehensive guide, we\'ll cover 10 battle-tested techniques that I\'ve used across 50+ React projects to achieve consistently high performance scores.</p><h2>1. React.memo and useMemo — Prevent Unnecessary Re-renders</h2><p>Re-renders are the #1 performance killer in React apps. React.memo wraps a component and prevents it from re-rendering when its props haven\'t changed. useMemo memoizes expensive computations so they only recalculate when dependencies change.</p><h2>2. Code Splitting — Load Only What\'s Needed</h2><p>Code splitting divides your JavaScript bundle into smaller chunks loaded on demand. React provides React.lazy and Suspense for this purpose. Combined with dynamic imports, this can dramatically reduce your initial bundle size.</p><h2>3. Virtual Scrolling for Large Lists</h2><p>Rendering thousands of DOM elements simultaneously destroys performance. Virtual scrolling renders only items visible in the viewport. Libraries like react-window and @tanstack/virtual make this straightforward.</p><h2>4. useCallback — Stable Function References</h2><p>When you pass callback functions as props, they create new references on every render, causing child components to unnecessarily re-render even when wrapped in React.memo.</p><h2>5. Avoid Anonymous Functions in JSX</h2><p>Anonymous functions in JSX create new function instances on every render, breaking memoization. Extract them to stable references using useCallback or define them outside the component.</p>',
                'category' => 'Performance',
                'tags' => ['React', 'Performance', 'JavaScript', 'Web Dev'],
                'author' => 'Abu Saleh',
                'status' => 'published',
                'published_at' => '2024-12-15 09:00:00',
                'read_time' => 8,
                'views' => 4200,
                'likes' => 312,
                'shares' => 45,
                'user_id' => 1,
            ],
            [
                'title' => 'Mastering CSS Grid: From Basic Layouts to Complex Designs',
                'slug' => 'mastering-css-grid',
                'excerpt' => 'A comprehensive guide to CSS Grid covering everything from basic concepts to advanced techniques for building complex, responsive layouts.',
                'content' => '<p>CSS Grid has fundamentally changed how we build layouts on the web. Unlike Flexbox, which is one-dimensional, Grid gives us full control over both rows and columns simultaneously.</p><h2>Getting Started with Grid Containers</h2><p>Everything begins with display: grid on a parent container. Its direct children automatically become grid items. From there you define the tracks with grid-template-columns and grid-template-rows.</p><h2>The 12-Column System</h2><p>Most design systems are built on a 12-column grid because 12 divides evenly by 1, 2, 3, 4, and 6. With repeat(12, 1fr) and explicit placement, you can compose any layout.</p><h2>Advanced Placement</h2><p>Named lines, named areas, and auto-flow dense packing give you surgical control over where items land.</p><h2>Responsive Without Media Queries</h2><p>Auto-fit and auto-fill combined with minmax() create fluid grids that reflow automatically as the viewport changes.</p>',
                'category' => 'CSS',
                'tags' => ['CSS', 'Layout', 'Design'],
                'author' => 'Abu Saleh',
                'status' => 'published',
                'published_at' => '2024-12-10 09:00:00',
                'read_time' => 6,
                'views' => 2100,
                'likes' => 180,
                'shares' => 22,
                'user_id' => 1,
            ],
            [
                'title' => 'Building a Production-Ready REST API with Node.js, Express & PostgreSQL',
                'slug' => 'production-ready-rest-api-node-express-postgresql',
                'excerpt' => 'Step-by-step tutorial on building a secure, scalable REST API with authentication, rate limiting, input validation, and comprehensive error handling.',
                'content' => '<p>Most tutorials stop at "it works on my machine". This one doesn\'t. We\'ll build a REST API you\'d actually be comfortable shipping to production.</p><h2>Project Structure That Scales</h2><p>Separate concerns from day one: routes, controllers, services, and data-access layers. Keeping business logic out of controllers is what lets the API grow without turning into a tangled mess.</p><h2>Validation First</h2><p>Never trust the wire. Validate every request at the boundary with a library like Zod, and return consistent, machine-readable error responses.</p><h2>Authentication Done Right</h2><p>Stateless JWT auth with short-lived access tokens and rotating refresh tokens strikes the right balance between security and usability.</p><h2>Rate Limiting & Hardening</h2><p>Add rate limiting per IP and per user, set secure headers, and add request logging with request IDs.</p>',
                'category' => 'Node.js',
                'tags' => ['Node.js', 'API', 'Backend'],
                'author' => 'Abu Saleh',
                'status' => 'published',
                'published_at' => '2024-12-05 09:00:00',
                'read_time' => 10,
                'views' => 3400,
                'likes' => 245,
                'shares' => 38,
                'user_id' => 1,
            ],
            [
                'title' => 'Building Scalable Design Systems: Lessons from Enterprise Projects',
                'slug' => 'scalable-design-systems',
                'excerpt' => 'How to create and maintain a robust design system that scales across multiple products and teams.',
                'content' => '<p>A design system is more than a component library. It\'s the single source of truth that keeps a dozen teams shipping interfaces that feel like one product.</p><h2>Tokens Before Components</h2><p>Start with design tokens — color, type, spacing, radius. Everything else derives from them.</p><h2>One Source of Truth</h2><p>Components must live in exactly one package and be consumed everywhere. Versioned releases with changelogs let teams upgrade on their own schedule.</p><h2>Documentation Is the Product</h2><p>Without great docs, your system becomes a rumor. Every component needs live examples, prop tables, and guidance on when to use it.</p>',
                'category' => 'Design',
                'tags' => ['Design', 'Figma', 'UI/UX'],
                'author' => 'Abu Saleh',
                'status' => 'published',
                'published_at' => '2024-11-28 09:00:00',
                'read_time' => 7,
                'views' => 1700,
                'likes' => 150,
                'shares' => 18,
                'user_id' => 1,
            ],
            [
                'title' => 'Next.js 14 App Router: Everything You Need to Know',
                'slug' => 'nextjs-14-app-router',
                'excerpt' => 'Complete guide to Next.js 14\'s App Router — Server Components, streaming, parallel routes, intercepting routes, and the new metadata API.',
                'content' => '<p>Next.js 14\'s App Router is a paradigm shift. Server Components run on the server by default, giving you faster loads and smaller bundles.</p><h2>Server Components by Default</h2><p>Move data fetching and rendering to the server, where it belongs. Your client bundle shrinks, your page loads faster.</p><h2>Streaming with Suspense</h2><p>Stream every part of your page the moment it\'s ready. Wrap slow, non-critical sections in Suspense boundaries.</p><h2>Parallel & Intercepting Routes</h2><p>Parallel routes render multiple independent views in the same layout — perfect for dashboards.</p>',
                'category' => 'React',
                'tags' => ['Next.js', 'React', 'JavaScript'],
                'author' => 'Abu Saleh',
                'status' => 'published',
                'published_at' => '2024-11-20 09:00:00',
                'read_time' => 9,
                'views' => 5600,
                'likes' => 402,
                'shares' => 65,
                'user_id' => 1,
            ],
            [
                'title' => 'From $30/hr to $150/hr: My Freelance Developer Journey',
                'slug' => 'freelance-developer-journey',
                'excerpt' => 'Honest story of how I grew my freelance income 5x in 3 years — the strategies, mistakes, and mindset shifts.',
                'content' => '<p>Three years ago I was charging $30/hr and constantly underbidding myself. Today I bill $150/hr with a waitlist.</p><h2>Stop Selling Hours</h2><p>The first shift was psychological: I stopped selling time and started selling outcomes. Clients don\'t buy 40 hours; they buy a store that converts.</p><h2>Niche Down Hard</h2><p>Being a "full-stack generalist" means competing with everyone. When I specialized in e-commerce and SaaS dashboards, the same skills suddenly commanded premium rates.</p><h2>Results Over Effort</h2><p>I documented every project\'s before/after metrics. A portfolio of "I improved conversion by 40%" sells infinitely better.</p>',
                'category' => 'Career',
                'tags' => ['Career', 'Freelance', 'Business'],
                'author' => 'Abu Saleh',
                'status' => 'published',
                'published_at' => '2024-11-15 09:00:00',
                'read_time' => 5,
                'views' => 8900,
                'likes' => 615,
                'shares' => 92,
                'user_id' => 1,
            ],
            [
                'title' => 'Advanced CSS Animations and Micro-interactions That Delight Users',
                'slug' => 'advanced-css-animations-micro-interactions',
                'excerpt' => 'Master CSS animations, transitions, and micro-interactions with practical examples and performance optimization techniques.',
                'content' => '<p>Micro-interactions are the secret sauce of delightful interfaces. A button that responds the moment it\'s pressed, a card that lifts as you hover.</p><h2>Design the Motion, Then Code It</h2><p>Great animation is intentional. Define easing curves that match your brand, keep durations short (150–300ms is the sweet spot).</p><h2>Transform and Opacity Only</h2><p>The golden rule of performance: animate only transform and opacity. The browser composites those on the GPU.</p><h2>Easing Makes or Breaks It</h2><p>Default ease feels robotic. Cubic-bezier curves that start fast and ease out make motion feel physical and satisfying.</p>',
                'category' => 'CSS',
                'tags' => ['CSS', 'Animation', 'UI/UX'],
                'author' => 'Abu Saleh',
                'status' => 'published',
                'published_at' => '2024-11-08 09:00:00',
                'read_time' => 8,
                'views' => 2600,
                'likes' => 210,
                'shares' => 28,
                'user_id' => 1,
            ],
        ];

        foreach ($posts as $post) {
            BlogPost::updateOrCreate(['slug' => $post['slug']], $post);
        }
    }
}
