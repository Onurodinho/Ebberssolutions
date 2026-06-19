/**
 * Centrale bedrijfsconfiguratie — pas hier alles aan wanneer echte gegevens beschikbaar zijn.
 */
const SITE_CONFIG = {
  company: {
    name: 'Ebbers Solutions',
    tagline: 'Metalen oplossingen op maat uit Neede.',
    founded: 2017,
    kvk: '68518102',
  },

  contact: {
    street: 'Veldhoekweg 1',
    postcode: '7161 RW',
    city: 'Neede',
    region: 'Industrieterrein Neede, Berkelland',
    phone: '+31 (0)543 00 00 00',
    phoneHref: '+31543000000',
    email: 'peterebbers67@gmail.com',
    hours: 'Ma – Vr: 07:30 – 16:30',
  },

  // Zet paden in wanneer foto's beschikbaar zijn (bijv. 'assets/images/workshop.jpg')
  images: {
    workshop: 'assets/images/products/product-01.jpg',
    hero: 'assets/images/products/product-02.jpg',
    projects: [
      { id: 'project-1', src: 'assets/images/products/product-02.jpg', alt: 'Eettafel met zwart ijzeren frame en zes houten stoelen' },
      { id: 'project-2', src: 'assets/images/products/product-06.jpg', alt: 'Handgemaakte ijzeren kruk met houten zitting' },
      { id: 'project-3', src: 'assets/images/products/product-10.jpg', alt: 'Vier metalen onderstellen — overzicht collectie' },
    ],
  },
};