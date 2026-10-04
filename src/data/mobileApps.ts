export interface PortfolioApp {
  id: string;
  name: string;
  iconSrc?: string;
  playStoreUrl: string;
}

// Names and logos come from the supplied Play Store listings. Keep this order.
export const MOBILE_APPS: PortfolioApp[] = [
  {
    id: 'com.uguideapp',
    name: 'Uguide',
    iconSrc: '/app-icons/uguide.jpg',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.uguideapp&hl=en_IN',
  },
  {
    id: 'com.fanithapp',
    name: 'Fanith',
    iconSrc: '/app-icons/fanith.png',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.fanithapp&hl=en_IN',
  },
  {
    id: 'com.heal247.patient',
    name: 'Heal 24/7',
    iconSrc: '/app-icons/heal247.jpg',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.heal247.patient&hl=en_IN',
  },
  {
    id: 'com.delyfy',
    name: 'Delyfy',
    iconSrc: '/app-icons/delyfy.jpg',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.delyfy&hl=en_IN',
  },
  {
    id: 'com.bses.bsesapp',
    name: 'BRPL Power',
    iconSrc: '/app-icons/brpl.png',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.bses.bsesapp&hl=en_IN',
  },
  {
    id: 'com.bses.bypl.prod',
    name: 'BYPL Connect',
    iconSrc: '/app-icons/bypl.png',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.bses.bypl.prod&hl=en_IN',
  },
  {
    id: 'com.goldsaving',
    name: 'G10 Gold',
    iconSrc: '/app-icons/g10-gold.jpg',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.goldsaving&hl=en_IN',
  },
  {
    id: 'com.zeppicocustomer',
    name: 'Zeppico',
    iconSrc: '/app-icons/zeppico.png',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.zeppicocustomer&hl=en_IN',
  },
  {
    id: 'com.supraa',
    name: 'Supraa',
    iconSrc: '/app-icons/supraa.png',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.supraa&hl=en_IN',
  },
];
