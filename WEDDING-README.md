# 💍 Parimey & Khushali Wedding Website

A modern, elegant wedding website built with Angular 18+ featuring responsive design, smooth animations, and a beautiful pastel theme inspired by WithJoy.

## 🌟 Features

- **Hero Section** with couple's names and live wedding countdown
- **Navigation** with fixed header and smooth scrolling
- **Our Story** timeline showcasing the couple's journey
- **Events** page with detailed ceremony and reception information
- **Photo Gallery** with placeholder images (ready for real photos)
- **RSVP Form** with validation and guest management
- **Responsive Design** optimized for mobile and desktop
- **SEO Optimized** with meta tags and Open Graph support
- **Elegant Theme** with serif typography and pastel colors

## 🎨 Design

- **Color Palette**: Cream, gold, blush pink, rose gold
- **Typography**: Playfair Display (serif) for headings, Inter (sans-serif) for body text
- **Images**: Unsplash placeholders for wedding themes
- **Animations**: CSS fade-in and slide-up effects

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- Angular CLI (`npm install -g @angular/cli`)

### Installation

1. **Clone or navigate to the project:**
   ```bash
   cd parimey-khushali-wedding
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   # or
   ng serve
   ```

4. **Open your browser:**
   Navigate to `http://localhost:4200/`

### Build for Production

```bash
ng build --prod
```

## 📱 Components

### HomeComponent
- Hero section with couple names
- Live countdown timer to December 7th, 2025
- Welcome message

### EventsComponent  
- Haldi ceremony details (Dec 6th)
- Wedding ceremony info (Dec 7th)
- Venue information and map placeholder

### OurStoryComponent
- Timeline of relationship milestones
- Love quote section

### GalleryComponent
- Responsive image grid
- Placeholder wedding photos
- Easy to replace with real photos

### RSVPComponent
- Form with validation
- Guest count selection
- Dietary restrictions field
- Email integration ready

### FooterComponent
- Contact information
- Social media links
- Wedding hashtag

## 🎯 Customization

### Wedding Details
Update the following files to customize for your wedding:

1. **Couple Names**: Update in `app.html`, `home.html`, `footer.html`
2. **Wedding Date**: Change in `home.ts` (countdown), `events.html`, `footer.html`
3. **Venue Details**: Modify `events.html`
4. **Contact Info**: Update `footer.html` and `rsvp.html`

### Colors & Styling
- **Global colors**: `src/styles.scss` CSS variables
- **Component styles**: Individual `.scss` files in each component

### Images
Replace Unsplash placeholder URLs in:
- `home.html` (hero background)
- `events.html` (ceremony photos) 
- `gallery.ts` (photo array)

## 🔧 Development

### Component Structure
```
src/app/
├── components/
│   ├── home/
│   ├── our-story/
│   ├── events/
│   ├── gallery/
│   ├── rsvp/
│   └── footer/
├── app.ts (main app component)
├── app.html (navigation layout)
└── app.routes.ts (routing configuration)
```

### Key Dependencies
- **Angular 18+**: Core framework
- **Angular Router**: Client-side routing
- **Angular Forms**: RSVP form handling
- **Angular Animations**: Smooth transitions

## 📋 Todo / Enhancements

### Immediate Improvements
- [ ] Replace placeholder images with real wedding photos
- [ ] Integrate RSVP form with email service (EmailJS, Formspree)
- [ ] Add Google Maps integration for venue location
- [ ] Implement image lightbox for gallery
- [ ] Add music player with wedding playlist

### Advanced Features  
- [ ] Guest photo upload functionality
- [ ] Wedding livestream integration
- [ ] Gift registry links
- [ ] Wedding party introductions page
- [ ] Real-time guest book/wishes
- [ ] Mobile app version (Ionic)

### Backend Integration
- [ ] Database for RSVP management
- [ ] Admin panel for guest management
- [ ] Email notifications for RSVPs
- [ ] Analytics and guest tracking

## 🌐 Deployment

### Netlify (Recommended)
1. Build the project: `ng build --prod`
2. Drag `dist/parimey-khushali-wedding` to Netlify
3. Configure redirects for Angular routing

### Vercel
```bash
npm install -g vercel
vercel --prod
```

### Firebase Hosting
```bash
ng add @angular/fire
ng deploy
```

## 📞 Support

For questions about this wedding website template:
- **Email**: wedding@parimeykhushali.com
- **Phone**: (555) 123-4567

## 💝 Credits

- **Design Inspiration**: WithJoy.com
- **Images**: Unsplash.com wedding photography
- **Fonts**: Google Fonts (Playfair Display, Inter)
- **Framework**: Angular 18+ with TypeScript

---

*Made with ❤️ for Parimey & Khushali's special day - December 7th, 2025*