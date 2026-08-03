import {
  absoluteUrl,
  address,
  aggregateRating,
  brand,
  contact,
  grossFromNet,
  legal,
  openingHours,
  routes,
  schemaPrice,
  social,
  type Availability,
  type BlogPost,
  type BreadcrumbItem,
  type CaseStudy,
  type Category,
  type City,
  type Product,
  type ProductFaq,
  type Review,
} from '@emc/catalog';

import { ogImageUrl } from './images';

/**
 * JSON-LD-Erzeugung nach schema.org.
 *
 * Alle Preise werden brutto ausgegeben, da Google Shopping und die Rich
 * Results für den deutschen Markt Endkundenpreise inklusive Mehrwertsteuer
 * erwarten. `priceValidUntil` ist erforderlich, damit das Angebot nicht als
 * veraltet gewertet wird.
 */

type Json = Record<string, unknown>;

const ORG_ID = `${brand.url}/#organization`;
const WEBSITE_ID = `${brand.url}/#website`;

const availabilityMap: Record<Availability, string> = {
  'auf-lager': 'https://schema.org/InStock',
  kurzfristig: 'https://schema.org/LimitedAvailability',
  'auf-anfrage': 'https://schema.org/PreOrder',
  ausverkauft: 'https://schema.org/OutOfStock',
};

/** Gültigkeit von Angeboten: ein Jahr ab heute. */
function priceValidUntil(): string {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);
  return date.toISOString().split('T')[0]!;
}

export function organizationSchema(): Json {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: brand.name,
    legalName: brand.legalName,
    url: brand.url,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/logo.svg'),
      width: 512,
      height: 512,
    },
    image: absoluteUrl('/og-default.png'),
    description: brand.description,
    foundingDate: String(brand.foundingYear),
    email: contact.email,
    telephone: contact.phone,
    faxNumber: contact.fax,
    vatID: legal.vatId,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      postalCode: address.postalCode,
      addressLocality: address.city,
      addressRegion: address.region,
      addressCountry: address.countryCode,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: contact.phone,
        contactType: 'sales',
        areaServed: 'DE',
        availableLanguage: ['German', 'English'],
        email: contact.salesEmail,
      },
      {
        '@type': 'ContactPoint',
        telephone: contact.phone,
        contactType: 'customer support',
        areaServed: 'DE',
        availableLanguage: ['German'],
        email: contact.supportEmail,
      },
    ],
    sameAs: Object.values(social),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: aggregateRating.ratingValue,
      reviewCount: aggregateRating.reviewCount,
      bestRating: aggregateRating.bestRating,
      worstRating: aggregateRating.worstRating,
    },
  };
}

export function localBusinessSchema(): Json {
  return {
    '@type': 'Store',
    '@id': `${brand.url}/#localbusiness`,
    name: brand.name,
    image: absoluteUrl('/og-default.png'),
    url: brand.url,
    telephone: contact.phone,
    email: contact.email,
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Vorkasse, SEPA-Lastschrift, Kauf auf Rechnung',
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      postalCode: address.postalCode,
      addressLocality: address.city,
      addressRegion: address.region,
      addressCountry: address.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: address.lat,
      longitude: address.lng,
    },
    openingHoursSpecification: openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${h.schema}`,
      opens: h.open,
      closes: h.close,
    })),
    areaServed: {
      '@type': 'Country',
      name: 'Deutschland',
    },
    parentOrganization: { '@id': ORG_ID },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: aggregateRating.ratingValue,
      reviewCount: aggregateRating.reviewCount,
    },
  };
}

export function websiteSchema(): Json {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: brand.url,
    name: brand.name,
    description: brand.description,
    inLanguage: 'de-DE',
    publisher: { '@id': ORG_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${brand.url}${routes.search}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]): Json {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function productSchema(product: Product, productReviews: Review[] = []): Json {
  const grossPrice = grossFromNet(product.priceNet);
  const rating =
    productReviews.length > 0
      ? productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length
      : null;

  return {
    '@type': 'Product',
    '@id': `${absoluteUrl(routes.product(product.slug))}#product`,
    name: product.name,
    // Die vollständige Beschreibung, nicht nur der Kurztext: Google zieht
    // dieses Feld für Produkt-Rich-Results und Merchant-Listings heran, und
    // ein Satz mit 86 Zeichen trägt dort nichts.
    description:
      product.description.length > 0 ? product.description.join(' ') : product.tagline,
    sku: product.sku,
    mpn: product.sku,
    image: product.images.map((img) => ogImageUrl(img.publicId)),
    brand: { '@type': 'Brand', name: brand.name },
    manufacturer: { '@id': ORG_ID },
    category: product.primaryCategory,
    itemCondition:
      product.condition === 'neu'
        ? 'https://schema.org/NewCondition'
        : product.condition === 'one-trip'
          ? 'https://schema.org/NewCondition'
          : product.condition === 'generalueberholt'
            ? 'https://schema.org/RefurbishedCondition'
            : 'https://schema.org/UsedCondition',
    width: {
      '@type': 'QuantitativeValue',
      value: product.specs.exterior.width,
      unitCode: 'MMT',
    },
    height: {
      '@type': 'QuantitativeValue',
      value: product.specs.exterior.height,
      unitCode: 'MMT',
    },
    depth: {
      '@type': 'QuantitativeValue',
      value: product.specs.exterior.length,
      unitCode: 'MMT',
    },
    ...(product.specs.tareWeight && {
      weight: {
        '@type': 'QuantitativeValue',
        value: product.specs.tareWeight,
        unitCode: 'KGM',
      },
    }),
    offers: {
      '@type': 'Offer',
      url: absoluteUrl(routes.product(product.slug)),
      priceCurrency: brand.currency,
      price: schemaPrice(grossPrice),
      priceValidUntil: priceValidUntil(),
      availability: availabilityMap[product.availability],
      itemCondition:
        product.condition === 'gebraucht'
          ? 'https://schema.org/UsedCondition'
          : 'https://schema.org/NewCondition',
      seller: { '@id': ORG_ID },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'DE',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 2,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: product.leadTimeDays[0],
            maxValue: product.leadTimeDays[1],
            unitCode: 'DAY',
          },
        },
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'DE',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 14,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/ReturnShippingFees',
      },
    },
    ...(rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: Math.round(rating * 10) / 10,
        reviewCount: productReviews.length,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    ...(productReviews.length > 0 && {
      review: productReviews.slice(0, 5).map((r) => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: r.author },
        datePublished: r.date,
        name: r.title,
        reviewBody: r.body,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: r.rating,
          bestRating: 5,
          worstRating: 1,
        },
      })),
    }),
    additionalProperty: product.specRows.slice(0, 12).map((row) => ({
      '@type': 'PropertyValue',
      name: row.label,
      value: row.value,
    })),
  };
}

export function faqSchema(faqs: ProductFaq[]): Json {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function collectionSchema(category: Category, products: Product[]): Json {
  return {
    '@type': 'CollectionPage',
    '@id': `${absoluteUrl(routes.category(category.slug))}#collection`,
    name: category.name,
    description: category.tagline,
    url: absoluteUrl(routes.category(category.slug)),
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: absoluteUrl(routes.product(product.slug)),
        name: product.name,
      })),
    },
  };
}

export function articleSchema(post: BlogPost): Json {
  return {
    '@type': 'BlogPosting',
    '@id': `${absoluteUrl(routes.blogPost(post.slug))}#article`,
    headline: post.title,
    description: post.excerpt,
    image: ogImageUrl(post.image.publicId),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    inLanguage: 'de-DE',
    author: {
      '@type': 'Person',
      name: post.author,
      jobTitle: post.authorRole,
      worksFor: { '@id': ORG_ID },
    },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(routes.blogPost(post.slug)),
    },
    keywords: post.tags.join(', '),
    articleSection: post.categorySlug,
    wordCount: post.body.reduce((count, block) => {
      if ('text' in block) return count + block.text.split(/\s+/).length;
      if ('items' in block) return count + block.items.join(' ').split(/\s+/).length;
      return count;
    }, 0),
  };
}

/** Städteseite: Store-Schema mit lokalem Servicegebiet. */
export function citySchema(city: City): Json {
  return {
    '@type': 'Store',
    '@id': `${absoluteUrl(routes.city(city.slug))}#localbusiness`,
    name: `${brand.name} – Seecontainer ${city.name}`,
    description: city.seo.description,
    url: absoluteUrl(routes.city(city.slug)),
    telephone: contact.phone,
    email: contact.email,
    priceRange: '€€',
    image: absoluteUrl('/og-default.png'),
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      postalCode: address.postalCode,
      addressLocality: address.city,
      addressCountry: address.countryCode,
    },
    areaServed: {
      '@type': 'City',
      name: city.name,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: city.lat,
        longitude: city.lng,
      },
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: city.state,
      },
    },
    parentOrganization: { '@id': ORG_ID },
    openingHoursSpecification: openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${h.schema}`,
      opens: h.open,
      closes: h.close,
    })),
  };
}

export function caseStudySchema(study: CaseStudy): Json {
  return {
    '@type': 'Article',
    '@id': `${absoluteUrl(routes.caseStudy(study.slug))}#article`,
    headline: study.title,
    description: study.challenge,
    image: ogImageUrl(study.image.publicId),
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    inLanguage: 'de-DE',
    about: {
      '@type': 'Organization',
      name: study.client,
    },
  };
}

/**
 * Bündelt mehrere Schema-Objekte in einen einzigen `@graph`. Ein Graph statt
 * vieler einzelner Skripte reduziert die Nutzlast und erlaubt Google, die
 * `@id`-Referenzen zwischen Organisation, Website und Seite aufzulösen.
 */
export function jsonLdGraph(...nodes: Json[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': nodes,
  });
}
