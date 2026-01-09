import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss'
})
export class Gallery {
  galleryImages = [
    {
      src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=600&fit=crop',
      alt: 'Engagement photo',
      caption: 'Our Engagement Day'
    },
    {
      src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=600&fit=crop',
      alt: 'Couple photo',
      caption: 'Beautiful Moments Together'
    },
    {
      src: 'https://images.unsplash.com/photo-1594736797933-d0301ba0bfd4?w=400&h=600&fit=crop',
      alt: 'Wedding rings',
      caption: 'Our Wedding Rings'
    },
    {
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=600&fit=crop',
      alt: 'Wedding setup',
      caption: 'Wedding Venue Setup'
    },
    {
      src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400&h=600&fit=crop',
      alt: 'Floral arrangement',
      caption: 'Beautiful Flowers'
    },
    {
      src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=600&fit=crop',
      alt: 'Wedding cake',
      caption: 'Wedding Cake Preview'
    }
  ];
}
