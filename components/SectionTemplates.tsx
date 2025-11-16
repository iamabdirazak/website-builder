export const SECTION_TEMPLATES = {
  header: {
    type: 'header',
    props: {
      title: 'iKreatify',
      logo: "/logo.png",
      navigation: ['About', 'Products', 'Services', 'Support'],
      button: "/bag.png",
    }
  },
  hero: {
    type: 'hero',
    props: {
      title: 'Welcome to iKreatify',
      subtitle: 'Build something amazing today',
      backgroundImage: 'https://via.placeholder.com/1200x600',
      ctaText: 'Get Started',
      ctaLink: '#'
    }
  },
  features: {
    type: 'features',
    props: {
      title: 'Our Features',
      items: [
        { icon: '🚀', title: 'Fast', description: 'Lightning quick performance' },
        { icon: '🎨', title: 'Beautiful', description: 'Stunning designs' },
        { icon: '📱', title: 'Responsive', description: 'Works on all devices' }
      ]
    }
  },
  content: {
    type: 'content',
    props: {
      title: 'About Us',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: 'https://via.placeholder.com/600x400',
      imagePosition: 'right'
    }
  },
  gallery: {
    type: 'gallery',
    props: {
      title: 'Gallery',
      images: [
        'https://via.placeholder.com/400x300',
        'https://via.placeholder.com/400x300',
        'https://via.placeholder.com/400x300',
        'https://via.placeholder.com/400x300'
      ]
    }
  },
  testimonials: {
    type: 'testimonials',
    props: {
      title: 'What Our Clients Say',
      testimonials: [
        { name: 'John Doe', text: 'Amazing service!', avatar: 'https://via.placeholder.com/100' },
        { name: 'Jane Smith', text: 'Highly recommend!', avatar: 'https://via.placeholder.com/100' }
      ]
    }
  },
  footer: {
    type: 'footer',
    props: {
      copyright: '© 2024 My Website. All rights reserved.',
      links: ['Privacy', 'Terms', 'Contact'],
      socialLinks: ['Facebook', 'Twitter', 'Instagram']
    }
  }
};