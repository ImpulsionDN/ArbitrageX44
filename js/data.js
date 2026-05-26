/* ═══════════════════════════════
   ArbitrageX — Data & Constants
   ═══════════════════════════════ */

// ⚠ POLITIQUE ANTI-CONTREFAÇON — ArbitrageX L99 PRO
// Tous les produits listés sont des produits AUTHENTIQUES
// achetés sur des plateformes légales et revendus légalement.
// Les produits de marque (Nike, Adidas, Levi's) proviennent
// de particuliers (Vinted, Leboncoin) et sont des articles d'occasion authentiques.
// L'arbitrage de contrefaçons est ILLÉGAL et exclu de cet outil.

const PRODUCTS = [
  // ── Électronique reconditionné (Backmarket → revente) ──
  { name:"Samsung S24 Ultra (reconditionné A)", src:"Backmarket", tgt:"eBay FR", buy:520, sell:680, ship:0, fee:12, cat:"électronique" },
  { name:"iPad Air 5 64Go (reconditionné B+)", src:"Backmarket", tgt:"Amazon FBA", buy:310, sell:420, ship:0, fee:12, cat:"électronique" },
  { name:"MacBook Air M1 (reconditionné A)", src:"Backmarket", tgt:"eBay FR", buy:580, sell:750, ship:0, fee:12, cat:"électronique" },
  { name:"AirPods Pro 2 (neuf — Amazon DE)", src:"Amazon DE", tgt:"eBay FR", buy:189, sell:229, ship:6, fee:13, cat:"électronique" },

  // ── Mode d'occasion authentique (Vinted / Leboncoin) ──
  { name:"Nike Air Max 90 (occasion bon état)", src:"Vinted", tgt:"Etsy", buy:55, sell:110, ship:8, fee:5, cat:"mode" },
  { name:"Levi's 501 vintage T36 (authentique)", src:"Vinted", tgt:"Vestiaire", buy:22, sell:68, ship:5, fee:15, cat:"mode" },
  { name:"Adidas Yeezy 350 V2 (authentique, facture)", src:"Vinted", tgt:"Vestiaire", buy:160, sell:290, ship:6, fee:15, cat:"mode" },
  { name:"Ralph Lauren Polo vintage (authentique)", src:"Vinted", tgt:"Etsy", buy:18, sell:55, ship:5, fee:6, cat:"mode" },

  // ── Électroménager / Maison ──
  { name:"Dyson V15 Detect (occasion)", src:"eBay UK", tgt:"Leboncoin", buy:280, sell:360, ship:15, fee:0, cat:"maison" },
  { name:"Nespresso Vertuo Next (neuf déclassé)", src:"Cdiscount", tgt:"Amazon FBA", buy:65, sell:99, ship:8, fee:14, cat:"maison" },
  { name:"KitchenAid artisan (occasion)", src:"Leboncoin", tgt:"eBay FR", buy:180, sell:280, ship:20, fee:12, cat:"maison" },

  // ── Jeux vidéo / Jouets ──
  { name:"PS5 Slim bundle (neuf scellé)", src:"Fnac ES", tgt:"eBay FR", buy:420, sell:530, ship:18, fee:12, cat:"jeux vidéo" },
  { name:"Nintendo Switch OLED (neuf)", src:"eBay ES", tgt:"eBay FR", buy:255, sell:310, ship:12, fee:12, cat:"jeux vidéo" },
  { name:"Lego Technic 42115 (neuf scellé)", src:"Leboncoin", tgt:"Amazon FBA", buy:120, sell:180, ship:12, fee:15, cat:"jouets" },
  { name:"Lego Icons 10297 (neuf scellé)", src:"Leboncoin", tgt:"eBay FR", buy:95, sell:155, ship:10, fee:12, cat:"jouets" },

  // ── Montres authentiques (occasion / neuf) ──
  { name:"Casio G-Shock GA-2100 (neuf)", src:"Amazon DE", tgt:"eBay FR", buy:79, sell:130, ship:5, fee:12, cat:"montres" },
  { name:"Seiko SKX007 (occasion TBE)", src:"Vinted", tgt:"Etsy", buy:120, sell:240, ship:8, fee:6, cat:"montres" },
  { name:"Seiko 5 Sports SRPD (neuf)", src:"Amazon ES", tgt:"eBay FR", buy:145, sell:210, ship:6, fee:12, cat:"montres" },
  { name:"Casio Vintage A168W (neuf)", src:"Cdiscount", tgt:"Etsy", buy:22, sell:58, ship:4, fee:6, cat:"montres" },
  { name:"Tissot PRX (occasion facture)", src:"Leboncoin", tgt:"Chrono24", buy:280, sell:420, ship:10, fee:8, cat:"montres" },
  { name:"Orient Bambino V2 (neuf)", src:"Amazon DE", tgt:"eBay FR", buy:115, sell:185, ship:6, fee:12, cat:"montres" },
  { name:"Casio Edifice EFR (neuf)", src:"Amazon ES", tgt:"eBay FR", buy:89, sell:145, ship:5, fee:12, cat:"montres" },
  { name:"Citizen Eco-Drive (occasion)", src:"Vinted", tgt:"eBay FR", buy:65, sell:130, ship:6, fee:12, cat:"montres" },

  // ── Beauté & soins authentiques (sans contrefaçon) ──
  { name:"Dyson Airwrap (reconditionné A)", src:"Backmarket", tgt:"eBay FR", buy:280, sell:420, ship:0, fee:12, cat:"beauté" },
  { name:"Dyson Supersonic (reconditionné)", src:"Backmarket", tgt:"Amazon FBA", buy:210, sell:310, ship:0, fee:12, cat:"beauté" },
  { name:"Foreo Luna 3 (neuf scellé)", src:"Amazon DE", tgt:"eBay FR", buy:89, sell:149, ship:5, fee:12, cat:"beauté" },
  { name:"NuFace Mini (neuf — Amazon ES)", src:"Amazon ES", tgt:"eBay FR", buy:115, sell:185, ship:6, fee:12, cat:"beauté" },
  { name:"Philips Lumea IPL (occasion)", src:"Leboncoin", tgt:"eBay FR", buy:120, sell:220, ship:8, fee:12, cat:"beauté" },
  { name:"Braun Silk-épil 9 (neuf déclassé)", src:"Cdiscount", tgt:"Amazon FBA", buy:65, sell:110, ship:5, fee:14, cat:"beauté" },
  { name:"Remington Keratin (neuf scellé)", src:"Amazon DE", tgt:"eBay FR", buy:38, sell:72, ship:5, fee:12, cat:"beauté" },
  { name:"L'Oréal Steampod 3.0 (occasion TBE)", src:"Vinted", tgt:"eBay FR", buy:55, sell:110, ship:6, fee:12, cat:"beauté" },
  { name:"BaByliss Pro Titanium (neuf)", src:"Amazon ES", tgt:"eBay FR", buy:42, sell:85, ship:5, fee:12, cat:"beauté" },
  { name:"Oral-B iO Series 9 (reconditionné)", src:"Backmarket", tgt:"Amazon FBA", buy:89, sell:149, ship:0, fee:12, cat:"beauté" },

  // ── Bien-être & Sommeil (pour boutique Auréa) ──
  { name:"Masque de sommeil Manta Sleep (neuf)", src:"Amazon DE", tgt:"Shopify", buy:29, sell:69, ship:5, fee:2, cat:"bien-être" },
  { name:"Diffuseur huiles essentielles Innogear", src:"Amazon ES", tgt:"Shopify", buy:18, sell:49, ship:4, fee:2, cat:"bien-être" },
  { name:"Oreiller ergonomique cervical (neuf)", src:"Amazon DE", tgt:"Shopify", buy:25, sell:65, ship:6, fee:2, cat:"bien-être" },
  { name:"Couverture lestée 8kg Gravity (neuf)", src:"Cdiscount", tgt:"Shopify", buy:45, sell:99, ship:8, fee:2, cat:"bien-être" },
  { name:"Lampe luminothérapie Beurer TL30 (neuf)", src:"Amazon DE", tgt:"Shopify", buy:38, sell:89, ship:5, fee:2, cat:"bien-être" },
  { name:"Bruit blanc machine Lectrofan (neuf)", src:"Amazon DE", tgt:"Shopify", buy:42, sell:95, ship:5, fee:2, cat:"bien-être" },
  { name:"Huile CBD sommeil 10% (légal FR)", src:"Amazon FR", tgt:"Shopify", buy:22, sell:55, ship:4, fee:2, cat:"bien-être" },
  { name:"Complément mélatonine Natrol (neuf)", src:"Amazon DE", tgt:"Shopify", buy:12, sell:32, ship:4, fee:2, cat:"bien-être" },
  { name:"Roller jade massage visage (neuf)", src:"Amazon ES", tgt:"Shopify", buy:8, sell:29, ship:4, fee:2, cat:"bien-être" },
  { name:"Tapis acupression Pranamat (occasion)", src:"Vinted", tgt:"Shopify", buy:35, sell:89, ship:6, fee:2, cat:"bien-être" },
  { name:"Bouillotte électrique Warmies (neuf)", src:"Amazon DE", tgt:"Shopify", buy:19, sell:49, ship:4, fee:2, cat:"bien-être" },
  { name:"Tisane sommeil Kusmi Tea bio (neuf)", src:"Cdiscount", tgt:"Shopify", buy:9, sell:24, ship:4, fee:2, cat:"bien-être" },
  { name:"Pyjama bambou femme (neuf)", src:"Amazon ES", tgt:"Shopify", buy:22, sell:59, ship:5, fee:2, cat:"bien-être" },
  { name:"Spray sommeil This Works (neuf)", src:"Amazon DE", tgt:"Shopify", buy:18, sell:45, ship:4, fee:2, cat:"bien-être" },
  { name:"Sunrise alarm clock Philips HF3520", src:"Backmarket", tgt:"Shopify", buy:45, sell:99, ship:0, fee:2, cat:"bien-être" },

  // ── Pêche (pour Axiome Pêche) ──
  { name:"Canne à pêche télescopique carbone (neuf)", src:"Amazon DE", tgt:"Shopify", buy:18, sell:49, ship:5, fee:2, cat:"pêche" },
  { name:"Moulinet daiwa Ninja 2500 (neuf)", src:"Amazon ES", tgt:"Shopify", buy:22, sell:59, ship:4, fee:2, cat:"pêche" },
  { name:"Kit pêche complet débutant (neuf)", src:"Amazon DE", tgt:"Shopify", buy:25, sell:65, ship:6, fee:2, cat:"pêche" },
  { name:"Leurres pêche lot 50 pièces (neuf)", src:"Amazon ES", tgt:"Shopify", buy:12, sell:35, ship:4, fee:2, cat:"pêche" },
  { name:"Boîte à leurres Plano 3700 (neuf)", src:"Cdiscount", tgt:"Shopify", buy:14, sell:38, ship:4, fee:2, cat:"pêche" },
  { name:"Waders néoprène 4mm taille L (neuf)", src:"Amazon DE", tgt:"Shopify", buy:45, sell:110, ship:8, fee:2, cat:"pêche" },
  { name:"Détecteur de touches sonar (neuf)", src:"Amazon ES", tgt:"Shopify", buy:35, sell:85, ship:5, fee:2, cat:"pêche" },
  { name:"Filet épuisette carpe XL (neuf)", src:"Amazon DE", tgt:"Shopify", buy:19, sell:49, ship:6, fee:2, cat:"pêche" },
  { name:"Sac à dos pêche étanche 30L (neuf)", src:"Amazon DE", tgt:"Shopify", buy:28, sell:69, ship:5, fee:2, cat:"pêche" },
  { name:"Siège chaise pêche carpe (neuf)", src:"Cdiscount", tgt:"Shopify", buy:32, sell:79, ship:8, fee:2, cat:"pêche" },
  { name:"Lunettes polarisantes pêche (neuf)", src:"Amazon ES", tgt:"Shopify", buy:14, sell:39, ship:4, fee:2, cat:"pêche" },
  { name:"Bouillettes carpe Monster Crab 1kg (neuf)", src:"Cdiscount", tgt:"Shopify", buy:11, sell:28, ship:4, fee:2, cat:"pêche" },
  { name:"Tapis de réception carpe XL (neuf)", src:"Amazon DE", tgt:"Shopify", buy:22, sell:55, ship:7, fee:2, cat:"pêche" },
  { name:"Canne spinning ultra-light 2m (neuf)", src:"Amazon ES", tgt:"Shopify", buy:29, sell:72, ship:5, fee:2, cat:"pêche" },
  { name:"Lampe frontale pêche de nuit LED (neuf)", src:"Amazon DE", tgt:"Shopify", buy:9, sell:27, ship:4, fee:2, cat:"pêche" },
  { name:"Ligne tresse 150m 0.25mm (neuf)", src:"Amazon ES", tgt:"Shopify", buy:8, sell:22, ship:3, fee:2, cat:"pêche" },
  { name:"Biwy carpe 1 place (neuf)", src:"Amazon DE", tgt:"Shopify", buy:65, sell:149, ship:12, fee:2, cat:"pêche" },
  { name:"Moulinet Mitchell 300 pro (occasion)", src:"Leboncoin", tgt:"Shopify", buy:18, sell:55, ship:5, fee:2, cat:"pêche" },
  { name:"Canne Shimano Alivio occasion (TBE)", src:"Leboncoin", tgt:"Shopify", buy:25, sell:65, ship:6, fee:2, cat:"pêche" },
  { name:"Nacelle télécommandée appâtage (neuf)", src:"Amazon DE", tgt:"Shopify", buy:89, sell:199, ship:8, fee:2, cat:"pêche" },

  // ── Produits dropshipping (CJDropshipping, Spocket, etc.) ──
  { name:"Nacelle appâtage télécommandée RC (dropship)", src:"CJDropshipping", tgt:"Shopify", buy:55, sell:149, ship:0, fee:2, cat:"pêche", url_source:"https://cjdropshipping.com" },
  { name:"Diffuseur huiles essentielles 500ml (dropship)", src:"CJDropshipping", tgt:"Shopify", buy:8, sell:39, ship:0, fee:2, cat:"bien-être", url_source:"https://cjdropshipping.com" },
  { name:"Couverture lestée 8kg (dropship)", src:"Spocket", tgt:"Shopify", buy:28, sell:89, ship:0, fee:2, cat:"bien-être", url_source:"https://www.spocket.co" },
  { name:"Lampe LED luminothérapie USB (dropship)", src:"CJDropshipping", tgt:"Shopify", buy:12, sell:49, ship:0, fee:2, cat:"bien-être", url_source:"https://cjdropshipping.com" },
  { name:"Canne à pêche carbone télescopique (dropship)", src:"CJDropshipping", tgt:"Shopify", buy:9, sell:39, ship:0, fee:2, cat:"pêche", url_source:"https://cjdropshipping.com" },
  { name:"Masque sommeil contour yeux 3D (dropship)", src:"Zendrop", tgt:"Shopify", buy:5, sell:24, ship:0, fee:2, cat:"bien-être", url_source:"https://zendrop.com" },
  { name:"Leurres pêche silicone lot 20 (dropship)", src:"CJDropshipping", tgt:"Shopify", buy:4, sell:19, ship:0, fee:2, cat:"pêche", url_source:"https://cjdropshipping.com" },
  { name:"Roller massage visage gua sha (dropship)", src:"Spocket", tgt:"Shopify", buy:6, sell:28, ship:0, fee:2, cat:"bien-être", url_source:"https://www.spocket.co" },
  { name:"Boîte rangement leurres 28 cases (dropship)", src:"CJDropshipping", tgt:"Shopify", buy:7, sell:29, ship:0, fee:2, cat:"pêche", url_source:"https://cjdropshipping.com" },
  { name:"Spray sommeil relaxant lavande (dropship)", src:"Syncee", tgt:"Shopify", buy:8, sell:32, ship:0, fee:2, cat:"bien-être", url_source:"https://syncee.com" },
];

const PLATFORMS = [
  { name:"Shopify (votre boutique)", fee:2, ship:5, mult:1.65, pros:"100% vos marges, votre marque", cons:"Trafic à générer soi-même" },
  { name:"Amazon FBA", fee:15, ship:4, mult:1.35, pros:"Audience massive, Prime", cons:"Frais élevés, concurrence" },
  { name:"eBay", fee:13, ship:5, mult:1.28, pros:"Large audience, enchères", cons:"Frais modérés, litiges" },
  { name:"Vinted", fee:5, ship:4, mult:1.15, pros:"Frais très bas, mode", cons:"Niche mode/luxe uniquement" },
  { name:"Etsy", fee:6.5, ship:5, mult:1.42, pros:"Niche créative, marges", cons:"Audience restreinte" },
  { name:"Rakuten", fee:8, ship:4, mult:1.22, pros:"Cashback clients", cons:"Moins de trafic en FR" },
  { name:"Vestiaire Collective", fee:15, ship:6, mult:1.55, pros:"Luxe/premium, prix élevés", cons:"Authentification requise" },
  { name:"CJDropshipping", fee:0, ship:6, mult:1.80, pros:"Dropshipping direct, pas de stock", cons:"Délais livraison 7-15j" },
  { name:"Spocket", fee:0, ship:5, mult:1.70, pros:"Fournisseurs EU/US, livraison rapide", cons:"Abonnement mensuel" },
  { name:"Leboncoin", fee:0, ship:5, mult:1.20, pros:"Zéro commission, local", cons:"Audience limitée" },
  { name:"Chrono24", fee:8, ship:8, mult:1.60, pros:"Spécialiste montres, prix premium", cons:"Montres uniquement" },
];

const CATEGORIES = [
  { name:"Électronique", margin:22 },
  { name:"Mode / Luxe", margin:41 },
  { name:"Jeux vidéo", margin:18 },
  { name:"Maison", margin:28 },
  { name:"Beauté", margin:55 },
  { name:"Jouets / Lego", margin:32 },
  { name:"Montres", margin:38 },
  { name:"Bien-être & Sommeil", margin:52 },
  { name:"Pêche", margin:58 },
];

const ENDPOINTS = [
  { method:"GET", path:"/v1/scan", desc:"Scanner un produit sur toutes les sources", params:"q, source, target, min_margin" },
  { method:"GET", path:"/v1/products", desc:"Lister les opportunités en base de données", params:"min_margin, category, limit, sort" },
  { method:"POST", path:"/v1/calculate", desc:"Calculer la rentabilité d'un produit", params:"buy_price, sell_price, fees, shipping" },
  { method:"GET", path:"/v1/alerts", desc:"Lister vos alertes prix actives", params:"status, platform, page" },
  { method:"POST", path:"/v1/alerts", desc:"Créer une nouvelle alerte prix", params:"product, platform, target_price, min_margin, notify_by" },
  { method:"DELETE", path:"/v1/alerts/:id", desc:"Supprimer une alerte", params:"id (path param)" },
  { method:"GET", path:"/v1/history", desc:"Historique des scans et actions", params:"type, limit, from_date, to_date" },
  { method:"GET", path:"/v1/platforms", desc:"Lister les plateformes supportées et leurs frais", params:"none" },
];

const EP_SAMPLES = {
  scan: `{
  "status": "ok",
  "query": "airpods",
  "results": [
    {
      "name": "AirPods Pro 2",
      "buy_price": 189.00,
      "sell_price": 249.00,
      "net_profit": 42.63,
      "margin_pct": 17.1,
      "roi_pct": 22.6,
      "source": "Amazon DE",
      "target": "eBay FR"
    }
  ],
  "count": 1,
  "generated_at": "2025-05-17T10:42:00Z"
}`,
  products: `{
  "status": "ok",
  "products": [
    { "name": "Adidas Yeezy 350", "margin": 38.2, "roi": 74.8, "category": "mode" },
    { "name": "Dior Sauvage 100ml", "margin": 55.4, "roi": 162.0, "category": "beauté" },
    { "name": "Levi's 501 T36", "margin": 41.0, "roi": 100.7, "category": "mode" }
  ],
  "total": 47,
  "page": 1
}`,
  calculate: `{
  "status": "ok",
  "input": { "buy": 189, "sell": 249, "shipping": 6, "fee_pct": 13 },
  "output": {
    "net_profit": 42.63,
    "margin_pct": 17.1,
    "roi_pct": 22.6,
    "total_fees": 16.37,
    "total_costs": 206.37
  }
}`,
  alerts: `{
  "status": "ok",
  "alerts": [
    { "id": "al_001", "product": "AirPods Pro 2", "platform": "Amazon", "target_price": 185, "status": "active", "last_checked": "2025-05-17T09:00:00Z" },
    { "id": "al_002", "product": "Nike Air Max 270", "platform": "Vinted", "target_price": 45, "status": "warn" }
  ],
  "count": 2
}`,
  history: `{
  "status": "ok",
  "events": [
    { "type": "scan", "label": "iPhone 15 — 6 résultats", "ts": "2025-05-17T10:30:00Z" },
    { "type": "csv", "label": "catalogue_mai.csv — 42 produits", "ts": "2025-05-17T09:15:00Z" }
  ],
  "total": 38
}`,
};

const DEMO_ALERTS = [
  { id:"al_001", prod:"AirPods Pro 2", plat:"Amazon", price:185, margin:30, notif:"Email", status:"active", freq:"Toutes les heures" },
  { id:"al_002", prod:"Nike Air Max 270", plat:"Vinted", price:45, margin:35, notif:"Webhook", status:"warn", freq:"Toutes les 6h" },
  { id:"al_003", prod:"Lego Creator 10297", plat:"Leboncoin", price:90, margin:25, notif:"Email", status:"off", freq:"1 fois/jour" },
  { id:"al_004", prod:"iPhone 15 Pro Max", plat:"eBay", price:900, margin:15, notif:"SMS", status:"active", freq:"Toutes les heures" },
  { id:"al_005", prod:"Adidas Yeezy 350 V2", plat:"Vinted", price:130, margin:40, notif:"Telegram", status:"active", freq:"Toutes les 6h" },
];

const DEMO_HISTORY = [
  { type:"scan", label:"iPhone 15 refurb — 6 résultats", source:"Scanner", ts: Date.now()-120000 },
  { type:"csv", label:"catalogue_mai.csv — 42 produits", source:"Import CSV", ts: Date.now()-900000 },
  { type:"comp", label:"Nike Dunk Low — 6 plateformes comparées", source:"Comparateur", ts: Date.now()-1800000 },
  { type:"alert", label:"Alerte créée : Samsung Tab S9 ≤ 350€", source:"Alertes prix", ts: Date.now()-3600000 },
  { type:"scan", label:"Parfums niche — 8 résultats", source:"Scanner", ts: Date.now()-7200000 },
  { type:"calc", label:"Calcul rentabilité — Profit net : 42.63€", source:"Calculateur", ts: Date.now()-10800000 },
  { type:"comp", label:"Dyson V12 — 6 plateformes comparées", source:"Comparateur", ts: Date.now()-14400000 },
  { type:"alert", label:"Alerte déclenchée : AirPods Pro 2 à 182€", source:"Alertes prix", ts: Date.now()-18000000 },
];

const AI_RESPONSES = {
  niche: "Les meilleures niches d'arbitrage en 2025 sont :\n\n① Sneakers vintage (Nike, Adidas, Yeezy) — marges 40-80%\n② Parfums niche & dupes — marges 50-150%, faible risque\n③ Lego séries discontinuées — marges 25-60%\n④ Mode luxe seconde main — Vinted → Vestiaire, marges 35-60%\n⑤ Électronique reconditionné — iPhones, AirPods, marges 15-30%\n\nLa clé : produit avec forte demande stable + offre fragmentée sur une plateforme source.",
  roi: "Calcul ROI Amazon FBA :\n\nROI = (Prix vente - Coût achat - Frais FBA - Port) / Coût achat × 100\n\nFrais FBA typiques :\n• Commission : 8-15% selon catégorie\n• Frais d'expédition FBA : 3-5€\n• Stockage : 0.25€/kg/mois\n\nVisez un ROI minimum 40% pour couvrir les risques. Notre calculateur intégré simule tout cela précisément.",
  risque: "Principaux risques à surveiller :\n\n⚠ Variations de prix soudaines (soldes, concurrence)\n⚠ Restrictions marque — certaines interdisent la revente\n⚠ Authenticité produits (luxe, sneakers)\n⚠ Suspensions compte vendeur\n⚠ Frais cachés de plateforme\n⚠ Stock insuffisant pour scaler\n\nStratégie : commencez avec 5-10 unités test avant tout achat en gros.",
  ebay: "Pour trouver des produits sous-évalués sur eBay :\n\n① Filtrez 'Achat immédiat' avec mauvaises photos\n② Cherchez des mots-clés mal orthographiés\n③ Consultez les 'Objets terminés' pour les vrais prix\n④ Enchères finissant lundi matin ou nuit → moins concurrencielles\n⑤ Cherchez les lots d'articles mixtes à démanteler\n⑥ Activez les alertes eBay sur vos mots-clés clés",
  amazon: "Stratégie Amazon FBA pour débutants :\n\n① Commencez par l'arbitrage en ligne (Online Arbitrage)\n② Utilisez des outils comme Keepa pour l'historique de prix\n③ Visez un ROI > 40% et un classement BSR < 100 000\n④ Évitez les marques restrictives (Apple, Nike, Lego en direct)\n⑤ Préparez vos colis selon les normes FBA dès le départ\n⑥ Suivez votre IPI (Inventory Performance Index) > 400",
  vinted: "Arbitrage sur Vinted :\n\n✓ Commission vendeur très basse (5%)\n✓ Idéal pour mode, luxe accessible, vintage\n✓ Achetez sur Vinted → revendez Vestiaire ou Etsy\n\nTips :\n• Suivez les nouvelles annonces par keyword\n• Négociez toujours (-10 à -20%)\n• Photographiez professionnellement avant revente\n• Catégories top : Levi's, Ralph Lauren, Nike, Adidas vintage",
  default: "Bonne question ! Pour analyser cette opportunité précisément, je vous recommande :\n\n① Utilisez le Scanner pour trouver des prix sources\n② Le Comparateur pour identifier la meilleure plateforme de revente\n③ Le Calculateur pour simuler votre marge nette exacte\n④ Créez une alerte prix pour ne pas rater les bonnes affaires\n\nEn règle générale, visez une marge nette > 25% et ROI > 40% pour que l'arbitrage soit vraiment rentable.",
};

const QUICK_QUESTIONS = [
  "Quelles sont les meilleures niches 2025 ?",
  "Comment calculer mon ROI Amazon FBA ?",
  "Quels sont les risques de l'arbitrage ?",
  "Comment trouver des produits sous-évalués eBay ?",
  "Quelle stratégie pour débuter sur Amazon FBA ?",
  "Comment optimiser mes ventes sur Vinted ?",
];

/* ═══════════════════════════════════════
   DONNÉES TENDANCES — ArbitrageX
   Sources : Google Trends + eBay + Vinted
   Mise à jour : simulation toutes les heures
   ═══════════════════════════════════════ */

const TRENDING_PRODUCTS = [
  // score = 0-100, trend = "up"/"hot"/"new"/"stable"
  { name:"Stanley Quencher 40oz", cat:"maison", score:94, trend:"hot", buy:28, sell:75, src:"AliExpress (générique)", tgt:"Etsy / Shopify", margin:55, searches:"+340%", since:"7 jours" },
  { name:"Casio A168W vintage", cat:"montres", score:88, trend:"hot", buy:22, sell:65, src:"Cdiscount", tgt:"Etsy", margin:49, searches:"+210%", since:"14 jours" },
  { name:"New Balance 574", cat:"mode", score:85, trend:"up", buy:65, sell:130, src:"Vinted", tgt:"Etsy", margin:37, searches:"+180%", since:"30 jours" },
  { name:"Kindle Paperwhite 2024", cat:"électronique", score:82, trend:"new", buy:109, sell:160, src:"Amazon DE", tgt:"eBay FR", margin:24, searches:"+150%", since:"21 jours" },
  { name:"Lego Icons 10323 Atari", cat:"jouets", score:80, trend:"hot", buy:189, sell:310, src:"Amazon ES", tgt:"eBay FR", margin:32, searches:"+290%", since:"10 jours" },
  { name:"Dyson Airwrap reconditionné", cat:"maison", score:78, trend:"up", buy:280, sell:420, src:"Backmarket", tgt:"eBay FR", margin:28, searches:"+95%", since:"30 jours" },
  { name:"iPhone 15 Pro Max reconditionné", cat:"électronique", score:76, trend:"up", buy:680, sell:890, src:"Backmarket", tgt:"eBay FR", margin:17, searches:"+120%", since:"45 jours" },
  { name:"Seiko 5 Sports SRPD", cat:"montres", score:74, trend:"up", buy:145, sell:230, src:"Amazon DE", tgt:"Chrono24", margin:33, searches:"+160%", since:"21 jours" },
  { name:"Nike Air Force 1 '07", cat:"mode", score:72, trend:"stable", buy:70, sell:130, src:"Vinted", tgt:"Etsy", margin:35, searches:"+45%", since:"60 jours" },
  { name:"Nespresso Vertuo Next", cat:"maison", score:68, trend:"stable", buy:65, sell:105, src:"Cdiscount", tgt:"Amazon FBA", margin:28, searches:"+30%", since:"90 jours" },
  { name:"iPad mini 6 reconditionné", cat:"électronique", score:65, trend:"up", buy:280, sell:390, src:"Backmarket", tgt:"eBay FR", margin:21, searches:"+85%", since:"30 jours" },
  { name:"Adidas Samba OG", cat:"mode", score:91, trend:"hot", buy:80, sell:170, src:"Vinted", tgt:"Vestiaire", margin:42, searches:"+410%", since:"5 jours" },

  { name:"Nacelle télécommandée appâtage", cat:"pêche", score:88, trend:"hot", buy:89, sell:199, src:"Amazon DE", tgt:"Shopify / Axiome", margin:51, searches:"+290%", since:"14 jours" },
  { name:"Waders néoprène carbone", cat:"pêche", score:75, trend:"up", buy:45, sell:110, src:"Amazon DE", tgt:"Shopify / Axiome", margin:52, searches:"+180%", since:"21 jours" },
  { name:"Biwy carpe 1 place ultralight", cat:"pêche", score:72, trend:"up", buy:65, sell:149, src:"Amazon DE", tgt:"Shopify / Axiome", margin:50, searches:"+140%", since:"30 jours" },
  { name:"Nintendo Switch OLED", cat:"jouets", score:62, trend:"stable", buy:255, sell:320, src:"eBay ES", tgt:"eBay FR", margin:14, searches:"+20%", since:"90 jours" },
  { name:"Foreo Luna 3", cat:"maison", score:59, trend:"up", buy:89, sell:149, src:"Amazon DE", tgt:"eBay FR", margin:28, searches:"+65%", since:"45 jours" },
  { name:"Lego Technic 42171 McLaren", cat:"jouets", score:87, trend:"new", buy:199, sell:340, src:"Amazon ES", tgt:"eBay FR", margin:33, searches:"+320%", since:"7 jours" },
];

const NICHES_EMERGENTES = [
  { name:"Accessoires Stanley Cup", growth:"+340%", desc:"Gobelets et accessoires — forte demande chez 18-35 ans", margin:"45-60%" },
  { name:"Sneakers Y2K / retro", growth:"+280%", desc:"New Balance, Reebok, Fila vintage — Vinted → Etsy", margin:"35-55%" },
  { name:"Lego éditions limitées", growth:"+220%", desc:"Sets discontinués ou nouveautés — prix x2 en 6 mois", margin:"30-50%" },
  { name:"Électronique Apple reconditionné", growth:"+180%", desc:"Backmarket → eBay FR — marché en pleine croissance", margin:"15-25%" },
  { name:"Montres Casio vintage", growth:"+210%", desc:"A168W, F91W, MRW-200 — tendance nostalgie 90s", margin:"40-65%" },
];

const TREND_HISTORY = {
  labels: ["J-30","J-25","J-20","J-15","J-10","J-5","Auj."],
  adidas_samba:  [20, 28, 35, 52, 68, 85, 91],
  stanley_cup:   [40, 52, 61, 72, 80, 89, 94],
  casio_vintage: [30, 38, 48, 60, 72, 82, 88],
  lego_atari:    [10, 18, 30, 48, 62, 74, 80],
};

/* ═══════════════════════════════════════════════
   VIRAL & SPY — Sources bestsellers fournisseurs
   ═══════════════════════════════════════════════ */

const VIRAL_SOURCES = [
  // ── DROPSHIPPING ──
  {
    name: "CJDropshipping",
    color: "#2563eb",
    icon: "🚀",
    cat: "dropshipping",
    desc: "Top ventes mondiales · Livraison FR 7-12j",
    links: [
      { label: "🔥 Bestsellers global", url: "https://cjdropshipping.com/list.html?sortField=saleCount&sortType=1" },
      { label: "✨ Nouveautés", url: "https://cjdropshipping.com/list.html?sortField=createTime&sortType=1" },
      { label: "⚡ Flash deals", url: "https://cjdropshipping.com/promotion.html" },
      { label: "🐟 Pêche & Outdoor", url: "https://cjdropshipping.com/list.html?searchKey=fishing&sortField=saleCount" },
      { label: "💆 Bien-être", url: "https://cjdropshipping.com/list.html?searchKey=wellness+sleep&sortField=saleCount" },
    ]
  },
  {
    name: "Spocket",
    color: "#7c3aed",
    icon: "🌍",
    cat: "dropshipping",
    desc: "Fournisseurs EU & US · Livraison 3-7j",
    links: [
      { label: "🔥 Trending products", url: "https://app.spocket.co/products?sort=trending" },
      { label: "⭐ Top rated", url: "https://app.spocket.co/products?sort=top_rated" },
      { label: "🆕 Nouveaux fournisseurs", url: "https://app.spocket.co/products?sort=newest" },
      { label: "💰 Meilleures marges", url: "https://app.spocket.co/products?sort=profit_margin" },
    ]
  },
  {
    name: "Zendrop",
    color: "#0ea5e9",
    icon: "⚡",
    cat: "dropshipping",
    desc: "Entrepôts US & CN · Branding possible",
    links: [
      { label: "🔥 Trending now", url: "https://app.zendrop.com/dashboard/products?sort=trending" },
      { label: "🏆 Bestsellers", url: "https://app.zendrop.com/dashboard/products?sort=best_sellers" },
      { label: "🆕 Nouveautés", url: "https://app.zendrop.com/dashboard/products?sort=newest" },
    ]
  },
  {
    name: "Dropmagic",
    color: "#8b5cf6",
    icon: "🔮",
    cat: "dropshipping",
    desc: "IA de détection produits viraux",
    links: [
      { label: "🔥 Produits viraux IA", url: "https://dropmagic.com/trending" },
      { label: "📈 En hausse cette semaine", url: "https://dropmagic.com/rising" },
      { label: "🎯 Par niche", url: "https://dropmagic.com/categories" },
    ]
  },
  {
    name: "DSers / AliExpress",
    color: "#e62e04",
    icon: "🛒",
    cat: "dropshipping",
    desc: "500M produits · Fournisseurs vérifiés",
    links: [
      { label: "🔥 Top ventes AliExpress", url: "https://fr.aliexpress.com/category/204000493/bestselling.html" },
      { label: "💎 Choice bestsellers", url: "https://fr.aliexpress.com/wholesale?sortType=total_tranpro_desc&SearchText=best+seller" },
      { label: "🆕 Nouveautés", url: "https://fr.aliexpress.com/wholesale?sortType=newlyListed&SearchText=trending" },
      { label: "🐟 Pêche top ventes", url: "https://fr.aliexpress.com/wholesale?SearchText=fishing&sortType=total_tranpro_desc" },
      { label: "💆 Bien-être top ventes", url: "https://fr.aliexpress.com/wholesale?SearchText=wellness+sleep&sortType=total_tranpro_desc" },
    ]
  },
  {
    name: "BigBuy EU",
    color: "#00b140",
    icon: "🏭",
    cat: "grossiste",
    desc: "Grossiste européen · Stock EU · Livraison rapide",
    links: [
      { label: "🔥 Bestsellers", url: "https://www.bigbuy.eu/fr/catalogsearch/result/?q=bestseller&order=relevance" },
      { label: "🆕 Nouveautés", url: "https://www.bigbuy.eu/fr/nouveautes.html" },
      { label: "💰 Meilleures offres", url: "https://www.bigbuy.eu/fr/promotions.html" },
    ]
  },
  {
    name: "Syncee",
    color: "#ff4b00",
    icon: "🔄",
    cat: "dropshipping",
    desc: "Synchronisation Shopify auto",
    links: [
      { label: "🔥 Top produits", url: "https://syncee.com/marketplace?sort=popular" },
      { label: "🌍 Fournisseurs EU", url: "https://syncee.com/marketplace?location=EU" },
      { label: "🆕 Nouveaux arrivages", url: "https://syncee.com/marketplace?sort=newest" },
    ]
  },
  {
    name: "Wiio",
    color: "#0077cc",
    icon: "📦",
    cat: "dropshipping",
    desc: "Agent sourcing Chine · Prix négociés",
    links: [
      { label: "🔥 Produits chauds", url: "https://wiio.io/products?sort=hot" },
      { label: "📦 Catalogue complet", url: "https://wiio.io/products" },
    ]
  },
  // ── GROSSISTES ──
  {
    name: "DHgate",
    color: "#c0392b",
    icon: "🏪",
    cat: "grossiste",
    desc: "Grossiste Chine · Prix de gros",
    links: [
      { label: "🔥 Top ventes", url: "https://www.dhgate.com/popular-wholesale/" },
      { label: "📈 Trending", url: "https://www.dhgate.com/wholesale/trending-products.html" },
      { label: "🆕 Nouveautés", url: "https://www.dhgate.com/wholesale/new-arrivals.html" },
      { label: "🐟 Pêche", url: "https://www.dhgate.com/wholesale/search.do?act=search&searchkey=fishing+gear&sortby=bestselling" },
    ]
  },
  {
    name: "Temu",
    color: "#ff6900",
    icon: "🛍️",
    cat: "grossiste",
    desc: "Prix ultra-bas · Livraison FR",
    links: [
      { label: "🔥 Bestsellers", url: "https://www.temu.com/best-sellers.html" },
      { label: "🆕 Nouveautés", url: "https://www.temu.com/new-arrivals.html" },
      { label: "💎 Top qualité", url: "https://www.temu.com/flash-deal.html" },
    ]
  },
];

const SPY_SOURCES = [
  { name:"Minea", color:"#6366f1", icon:"🕵️", desc:"Spy ads Facebook/TikTok/Pinterest · Produits viraux", url:"https://minea.com", label:"Analyser les pubs virales" },
  { name:"Dropispy", color:"#ec4899", icon:"📊", desc:"Espionner les boutiques Shopify concurrentes", url:"https://dropispy.com", label:"Spy boutiques" },
  { name:"AdSpy", color:"#f59e0b", icon:"👁️", desc:"Base de données des pubs Facebook qui cartonnent", url:"https://adspy.com", label:"Voir les pubs" },
  { name:"Ecomhunt", color:"#10b981", icon:"🎯", desc:"Produits gagnants sélectionnés chaque jour", url:"https://ecomhunt.com/p/winning-products", label:"Produits gagnants" },
  { name:"Sell The Trend", color:"#3b82f6", icon:"📈", desc:"IA de détection tendances + spy Shopify", url:"https://sellthetrend.com/products", label:"Explorer les tendances" },
  { name:"Koala Inspector", color:"#84cc16", icon:"🐨", desc:"Extension Chrome spy boutiques Shopify", url:"https://chrome.google.com/webstore/detail/koala-inspector-shopify-s/hiodejloabnpmhldkgpfkeocffmlhfij", label:"Installer l'extension" },
  { name:"Similarweb", color:"#ff6b35", icon:"🌐", desc:"Trafic et sources de vos concurrents", url:"https://www.similarweb.com", label:"Analyser le trafic" },
];

const SOCIAL_VIRAL = [
  { name:"TikTok Shop Trending", color:"#010101", icon:"🎵", desc:"Produits viraux TikTok Shop en ce moment", url:"https://www.tiktok.com/shop/viral?region=FR", label:"Voir les viraux TikTok" },
  { name:"TikTok Hashtags", color:"#ff0050", icon:"🎯", desc:"#tiktokmademebuyit #viral #amazonfinds", url:"https://www.tiktok.com/tag/tiktokmademebuyit", label:"Explorer les hashtags" },
  { name:"Pinterest Trending", color:"#e60023", icon:"📌", desc:"Produits en tendance sur Pinterest", url:"https://www.pinterest.fr/ideas/", label:"Tendances Pinterest" },
  { name:"Amazon Movers & Shakers", color:"#ff9900", icon:"⚡", desc:"Produits qui montent le plus vite sur Amazon", url:"https://www.amazon.fr/gp/movers-and-shakers/ref=pd_zg_ts_all", label:"Voir les montées en flèche" },
  { name:"Google Trends", color:"#4285f4", icon:"📊", desc:"Requêtes en explosion cette semaine", url:"https://trends.google.fr/trends/trendingsearches/daily?geo=FR", label:"Tendances Google FR" },
  { name:"eBay Populaires", color:"#e53238", icon:"🏆", desc:"Produits les plus vendus eBay France", url:"https://www.ebay.fr/e/decouverte/meilleures-ventes", label:"Top ventes eBay" },
];
