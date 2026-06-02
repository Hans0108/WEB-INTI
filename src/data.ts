export interface ContentItem {
  id: number;
  type: string;
  title: string;
  date: string;
  readTime?: string;
  location?: string;
  img: string;
  featured?: boolean;
  content: string;
}

export const contentData: ContentItem[] = [
  { 
    id: 1, 
    type: 'Articles', 
    title: 'The Evolution of Peranakan Architecture in Jakarta', 
    date: 'Oct 12, 2023', 
    readTime: '5 min read', 
    img: 'https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
    featured: true,
    content: `
Peranakan architecture in Jakarta represents a unique confluence of Chinese, Indonesian, and European cultural elements. Historically rooted in the coastal settlements, these structures reflect centuries of adaptation and cross-cultural exchange.

### The Genesis of a Style
Early Chinese immigrants who settled in the archipelago brought with them traditional building techniques. However, local climate conditions and available materials soon necessitated adaptations. The incorporation of indigenous roofs with wide overhangs to counter tropical rains, combined with intricate Chinese wood carvings and later European classical pillars, gave birth to the distinct Peranakan style.

### Key Architectural Elements
- **Courtyards**: Central open spaces designed for ventilation and natural lighting.
- **Intricate Ornamentation**: Carved wooden panels featuring mythical creatures, bats (symbolizing good fortune), and flora.
- **Colorful Tiles**: Imported from Europe, decorative majolica tiles became widely popular in the late 19th and early 20th centuries, adorning floors and lower walls.

### Preservation and Modern Context
Today, the preservation of Peranakan buildings in areas like Glodok and Pasar Baru is crucial for maintaining the historical fabric of Jakarta. They stand not merely as remnants of the past but as active spaces where history and contemporary life intersect.
    `
  },
  { 
    id: 2, 
    type: 'Upcoming Events', 
    title: 'National Harmony Festival 2024', 
    date: 'Dec 05, 2024', 
    location: 'Gelora Bung Karno, Jakarta', 
    img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    content: `
Join us for the National Harmony Festival 2024, a grand celebration of unity in diversity. Organized by INTI, this monumental event aims to bring together thousands of Indonesians from all walks of life to celebrate the nation's rich cultural tapestry.

### What to Expect
- **Cultural Performances**: Spectacular traditional dances, music, and theater performances from various provinces of Indonesia, highlighting the harmonious blend of different cultures.
- **Culinary Bazaar**: A massive food festival featuring authentic regional cuisines, showcasing the diverse flavors that make up the Indonesian culinary heritage.
- **Art Exhibitions**: Stunning displays of traditional and contemporary art pieces, reflecting the dialogue between heritage and modernity.
- **Dialogue & Forums**: Interactive sessions with community leaders, scholars, and youth representatives discussing the future of national unity.

This event is open to the public and serves as a reminder of our shared commitment to building a stronger, harmonious Indonesia. Don't miss out on this historic gathering!
    `
  },
  { 
    id: 3, 
    type: 'Newsletters', 
    title: 'INTI Monthly Digest: October Edition', 
    date: 'Oct 01, 2023', 
    readTime: '10 min read', 
    img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    content: `
Welcome to the October Edition of the INTI Monthly Digest. In this issue, we reflect on our recent community initiatives and look ahead to future collaborations that strengthen the bonds of our diverse society.

### Community Outreach Highlights
This past month, we successfully completed several outreach programs focusing on education and community welfare in rural areas. We extend our deepest gratitude to all volunteers and partners who made these efforts possible.

### Member Spotlight
We feature an inspiring interview with Dr. Hendra, a long-time INTI member who has dedicated his life to bridging the educational gap for marginalized youth in Eastern Indonesia. His story is a testament to the power of individual commitment in driving systemic change.

### Upcoming Initiatives
Looking ahead, we are excited to announce our upcoming scholarship programs designed for high-achieving students from underprivileged backgrounds. More details will be shared in the next newsletter.

Stay connected, stay inspired. Together, we build a brighter future for Indonesia.
    `
  },
  { 
    id: 4, 
    type: 'Articles', 
    title: 'Youth Leadership Summit Recap', 
    date: 'Sep 28, 2023', 
    readTime: '4 min read', 
    img: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    content: `
The recent Youth Leadership Summit organized by INTI was a resounding success, bringing together over 500 young leaders from across the archipelago. The summit provided a platform for critical discussions on the role of youth in shaping a cohesive and prosperous nation.

### Key Takeaways
- **Empowerment Through Tech**: Several panels focused on how young people can leverage digital tools to advocate for social change and build inclusive communities.
- **Cross-Cultural Dialogue**: Workshops facilitated meaningful interactions between youths from different ethnic and religious backgrounds, fostering mutual understanding and respect.
- **Action Plans**: Participants collaborated to draft actionable community projects that will be implemented in their respective hometowns over the coming year.

The energy and passion displayed by the youth delegates reaffirm our belief that the future of Indonesia is in capable hands. We look forward to seeing the positive impact of their initiatives.
    `
  },
  { 
    id: 5, 
    type: 'Upcoming Events', 
    title: 'Charity Gala: Building Schools in Rural Java', 
    date: 'Nov 15, 2023', 
    location: 'Hotel Mulia, Jakarta', 
    img: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    content: `
We cordially invite you to join us at the INTI Charity Gala, an elegant evening dedicated to a noble cause: funding the construction of educational facilities in rural Java.

### The Cause
Access to quality education remains a challenge in many remote areas. Through this gala, we aim to raise critical funds needed to build new schools, provide essential learning materials, and support teacher training programs in underserved communities.

### The Evening
The gala will feature:
- A gourmet multi-course dinner.
- Live musical performances by renowned Indonesian artists.
- An exclusive art auction featuring works by celebrated local talents.
- Inspiring keynote speeches by educational advocates and community leaders.

Your presence and support at this gala will make a tangible difference in the lives of countless children, providing them with the foundation they need to build a better future. Let us stand together to empower the next generation.
    `
  },
];
