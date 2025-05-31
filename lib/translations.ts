import { Language } from './language-context';

export const translations = {
  en: {
    // Navigation
    home: 'Home',
    search: 'Search products...',
    menu: 'Menu',
    categories: 'Categories',

    // Homepage sections
    newestArrivals: 'Newest Arrivals',
    featuredProducts: 'Featured Products',
    viewAllProducts: 'View All Products',
    dealCountdown: 'Special Deal',

    // Common actions
    addToCart: 'Add to Cart',
    buy: 'Buy Now',
    login: 'Sign In',
    register: 'Register',
    logout: 'Logout',

    // Product related
    product: 'Product',
    products: 'Products',
    price: 'Price',
    description: 'Description',
    inStock: 'In Stock',
    outOfStock: 'Out of Stock',

    // General
    welcome: 'Welcome',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
  },
  fr: {
    // Navigation
    home: 'Accueil',
    search: 'Rechercher des produits...',
    menu: 'Menu',
    categories: 'Catégories',

    // Homepage sections
    newestArrivals: 'Nouveautés',
    featuredProducts: 'Produits Vedettes',
    viewAllProducts: 'Voir Tous les Produits',
    dealCountdown: 'Offre Spéciale',

    // Common actions
    addToCart: 'Ajouter au Panier',
    buy: 'Acheter Maintenant',
    login: 'Connexion',
    register: "S'inscrire",
    logout: 'Déconnexion',

    // Product related
    product: 'Produit',
    products: 'Produits',
    price: 'Prix',
    description: 'Description',
    inStock: 'En Stock',
    outOfStock: 'Rupture de Stock',

    // General
    welcome: 'Bienvenue',
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
  },
  de: {
    // Navigation
    home: 'Startseite',
    search: 'Produkte suchen...',
    menu: 'Menü',
    categories: 'Kategorien',

    // Homepage sections
    newestArrivals: 'Neueste Ankünfte',
    featuredProducts: 'Empfohlene Produkte',
    viewAllProducts: 'Alle Produkte Anzeigen',
    dealCountdown: 'Sonderangebot',

    // Common actions
    addToCart: 'In den Warenkorb',
    buy: 'Jetzt Kaufen',
    login: 'Anmelden',
    register: 'Registrieren',
    logout: 'Abmelden',

    // Product related
    product: 'Produkt',
    products: 'Produkte',
    price: 'Preis',
    description: 'Beschreibung',
    inStock: 'Auf Lager',
    outOfStock: 'Nicht Verfügbar',

    // General
    welcome: 'Willkommen',
    loading: 'Laden...',
    error: 'Fehler',
    success: 'Erfolg',
  },
};

export const useTranslation = (language: Language) => {
  return (key: keyof typeof translations.en) => {
    return translations[language][key] || translations.en[key];
  };
};
