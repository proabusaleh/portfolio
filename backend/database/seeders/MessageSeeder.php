<?php

namespace Database\Seeders;

use App\Models\Message;
use Illuminate\Database\Seeder;

class MessageSeeder extends Seeder
{
    public function run(): void
    {
        $messages = [
            [
                'name' => 'Sarah Johnson',
                'email' => 'sarah.johnson@techcorp.com',
                'company' => 'TechCorp Solutions',
                'phone' => '+1-555-0101',
                'subject' => 'Project Collaboration Inquiry',
                'message' => 'Hi Abu, I came across your portfolio and was impressed by your React work. We have a large e-commerce project coming up and would love to discuss potential collaboration. Are you available for a quick call this week?',
                'unread' => true,
                'starred' => true,
                'folder' => 'inbox',
                'labels' => ['client', 'urgent'],
                'created_at' => now()->subHours(2),
            ],
            [
                'name' => 'Mark Chen',
                'email' => 'mark.chen@startup.io',
                'company' => 'StartupIO',
                'phone' => '+1-555-0102',
                'subject' => 'Mobile App Development Quote',
                'message' => 'Hello, we need a Flutter developer for our fitness tracking app. The project involves backend API integration, real-time data sync, and push notifications. Could you provide an estimated timeline and cost?',
                'unread' => true,
                'starred' => false,
                'folder' => 'inbox',
                'labels' => ['client'],
                'created_at' => now()->subHours(5),
            ],
            [
                'name' => 'Emma Williams',
                'email' => 'emma.w@designstudio.com',
                'company' => 'Design Studio',
                'phone' => '+44-20-7946-0958',
                'subject' => 'UI/UX Consultation Request',
                'message' => 'Hi there, I\'m a product manager at Design Studio. We\'re redesigning our SaaS dashboard and need expert consultation on the UI/UX. Your portfolio shows great attention to detail. Would you be interested in a consulting gig?',
                'unread' => true,
                'starred' => false,
                'folder' => 'inbox',
                'labels' => ['consulting'],
                'created_at' => now()->subHours(12),
            ],
            [
                'name' => 'James Rodriguez',
                'email' => 'james.r@agency.co',
                'company' => 'Digital Agency Co',
                'phone' => '+1-555-0103',
                'subject' => 'Blog Guest Post Proposal',
                'message' => 'Dear Abu, I\'m the content lead at Digital Agency Co. We\'d love to feature a guest post from you on our tech blog. Your article on React performance was shared widely in our team. Would you be open to writing something similar for our audience?',
                'unread' => false,
                'starred' => false,
                'folder' => 'inbox',
                'labels' => ['content'],
                'created_at' => now()->subDays(1),
            ],
            [
                'name' => 'Lisa Park',
                'email' => 'lisa.park@enterprise.com',
                'company' => 'Enterprise Solutions',
                'phone' => '+82-2-555-0104',
                'subject' => 'Corporate Website Redesign',
                'message' => 'Hello Abu, our company is looking to modernize our corporate website. We need a complete redesign with a focus on performance and modern design principles. Your portfolio looks exactly like what we need. Can we schedule a meeting to discuss requirements?',
                'unread' => false,
                'starred' => true,
                'folder' => 'inbox',
                'labels' => ['client', 'enterprise'],
                'created_at' => now()->subDays(2),
            ],
            [
                'name' => 'David Kim',
                'email' => 'david.kim@fintech.com',
                'company' => 'FinTech Innovations',
                'phone' => '+1-555-0105',
                'subject' => 'Real Estate Portal Development',
                'message' => 'Hi, we saw your work on the Real Estate Portal and were impressed. We\'re building a similar platform for the Korean market and would like to discuss how we might work together. What\'s your availability for a video call?',
                'unread' => false,
                'starred' => false,
                'folder' => 'inbox',
                'labels' => ['client'],
                'created_at' => now()->subDays(3),
            ],
            [
                'name' => 'Rachel Green',
                'email' => 'rachel.g@marketing.pro',
                'company' => 'Marketing Pro',
                'phone' => '+1-555-0106',
                'subject' => 'Newsletter Collaboration',
                'message' => 'Abu, I run a newsletter for 50K+ developers. I\'d love to feature your story about going from $30/hr to $150/hr. It resonated with so many freelancers in our community. Would you be open to an interview?',
                'unread' => false,
                'starred' => false,
                'folder' => 'inbox',
                'labels' => ['media'],
                'created_at' => now()->subDays(5),
            ],
            [
                'name' => 'Michael Torres',
                'email' => 'michael@webagency.com',
                'company' => 'Web Agency',
                'phone' => '+1-555-0107',
                'subject' => 'Partnership Opportunity',
                'message' => 'Hello, I\'m the founder of Web Agency. We\'re looking for senior developers to partner with on larger projects. Your skill set in React and Laravel seems like a perfect fit. Let\'s connect and explore how we can collaborate.',
                'unread' => false,
                'starred' => false,
                'folder' => 'inbox',
                'labels' => ['partnership'],
                'created_at' => now()->subDays(7),
            ],
        ];

        foreach ($messages as $message) {
            Message::create($message);
        }
    }
}
