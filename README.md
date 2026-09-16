# Spotly

Spotly is a Next.js property discovery interface. The current UI is branded as **PropMart** and lets users browse property-style listings, filter them by type, open a listing detail page, view generated location information, and contact a sample agent.

## Features

- Responsive property discovery homepage
- Hero image slideshow with property-focused messaging
- Featured and best-listing sections
- Filters for houses, apartments, condos, studios, and townhouses
- Property detail pages at `/property/[id]`
- Favorite and share controls on property details
- Google Maps links generated from listing coordinates
- Agent phone and email contact actions
- Load-more behavior in the featured properties grid

## Tech Stack

- Next.js 14 App Router
- React 18 and TypeScript
- Tailwind CSS
- SWR and Axios for client-side data fetching
- React Icons
- Quicksand through `next/font/google`

## Data Source

The application currently uses the [Fake Store API](https://fakestoreapi.com/) as a temporary data source:

```text
https://fakestoreapi.com/products
https://fakestoreapi.com/products/{id}
```

Fake Store products are mapped into property-shaped objects in the listing and detail components. Property metadata such as location, bedrooms, bathrooms, size, status, and amenities is currently generated from the product category, rating, index, and ID.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

## Available Scripts

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm run start    # Start the production server
npm run lint     # Run the configured Next.js lint command
```

## Application Flow

1. `src/app/layout.tsx` loads global styles, the Quicksand font, metadata, and the shared navigation.
2. `src/app/page.tsx` renders the homepage and footer.
3. `src/components/Home` fetches the product collection with SWR.
4. `BestProperties` and `ProductsGrid` transform that collection into property cards.
5. Selecting a card navigates to `/property/{id}`.
6. `src/app/property/[id]/page.tsx` fetches the selected product and renders its detail view.

## Project Structure

```text
src/
  app/
    layout.tsx              Root layout and metadata
    page.tsx                Homepage route
    globals.css             Global styles and theme variables
    property/[id]/page.tsx  Property detail route
  components/
    Home/                   Homepage composition and API request
    Navbar/                 Fixed navigation and search input
    Slide/                  Hero slideshow
    BestProperties/         Filterable best-listings section
    ProductsGrid/           Filterable featured-listings section
    Footer/                 Footer, contact links, and newsletter form
```

## Current Limitations

- Search inputs currently log the query but do not filter the listings.
- Authentication, profile, cart, and service pages are not implemented.
- Several footer links are placeholders for routes that do not yet exist.
- The API provides retail products rather than real property records.
- Listing images use remote URLs and are not yet migrated to an application-owned property dataset.
- The homepage currently renders the shared navbar from both the root layout and the page component.

## Next Steps

The next production-focused improvements would be to replace the temporary API with a property data service, centralize the property mapping logic, connect the search and navigation links to real routes, and add explicit API error and empty states.
