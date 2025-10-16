import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'
import { FiHeart, FiUser, FiMapPin } from 'react-icons/fi'

interface Property {
  id: number
  title: string
  price: number
  image: string
  propertyType: string
  bedrooms: number
  bathrooms: number
  size: number
  location: string
  rating: number
  isFeatured: boolean
  status: string
  latitude: number
  longitude: number
}

function ProductsGrid({ data, isLoading, error }: { data: any, isLoading: boolean, error: any }) {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [displayedCount, setDisplayedCount] = useState(6)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')

  console.log('data', data);
  
  const filters = [
    { id: 'all', label: 'All Properties', icon: '🏠' },
    { id: 'houses', label: 'Houses', icon: '🏘️' },
    { id: 'apartments', label: 'Apartments', icon: '🏢' },
    { id: 'condos', label: 'Condos', icon: '🏬' },
    { id: 'studios', label: 'Studios', icon: '🏠' },
    { id: 'townhouses', label: 'Townhouses', icon: '🏘️' },
  ]

  // useEffect previously populated mock properties. Keeping as comment per request.
  // setProperties(mockProperties)
  // Now populate from incoming data array
  useEffect(() => {
    // const mockProperties: Property[] = [
    //   {
    //     id: 1,
    //     title: "Modern Luxury Villa with Panoramic Views",
    //     price: 1250000,
    //     image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    //     propertyType: "houses",
    //     bedrooms: 4,
    //     bathrooms: 3,
    //     size: 280,
    //     location: "Hillside",
    //     rating: 4.8,
    //     isFeatured: true,
    //     status: "Featured",
    //     latitude: 40.7589,
    //     longitude: -73.9851
    //   },
    //   {
    //     id: 2,
    //     title: "Contemporary Apartment in City Center",
    //     price: 450000,
    //     image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    //     propertyType: "apartments",
    //     bedrooms: 2,
    //     bathrooms: 2,
    //     size: 120,
    //     location: "City Center",
    //     rating: 4.6,
    //     isFeatured: false,
    //     status: "For Sale",
    //     latitude: 40.7614,
    //     longitude: -73.9776
    //   },
    //   {
    //     id: 3,
    //     title: "Elegant Townhouse with Garden",
    //     price: 675000,
    //     image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    //     propertyType: "townhouses",
    //     bedrooms: 3,
    //     bathrooms: 2,
    //     size: 180,
    //     location: "Garden District",
    //     rating: 4.7,
    //     isFeatured: true,
    //     status: "For Sale",
    //     latitude: 40.7505,
    //     longitude: -73.9934
    //   },
    //   {
    //     id: 4,
    //     title: "Stylish Studio Apartment",
    //     price: 280000,
    //     image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    //     propertyType: "studios",
    //     bedrooms: 1,
    //     bathrooms: 1,
    //     size: 45,
    //     location: "Downtown",
    //     rating: 4.4,
    //     isFeatured: false,
    //     status: "For Rent",
    //     latitude: 40.7505,
    //     longitude: -73.9934
    //   },
    //   {
    //     id: 5,
    //     title: "Luxury Condo with Ocean View",
    //     price: 890000,
    //     image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    //     propertyType: "condos",
    //     bedrooms: 2,
    //     bathrooms: 2,
    //     size: 150,
    //     location: "Waterfront",
    //     rating: 4.9,
    //     isFeatured: true,
    //     status: "Featured",
    //     latitude: 25.7617,
    //     longitude: -80.1918
    //   },
    //   {
    //     id: 6,
    //     title: "Family Home with Pool",
    //     price: 750000,
    //     image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    //     propertyType: "houses",
    //     bedrooms: 4,
    //     bathrooms: 3,
    //     size: 220,
    //     location: "Suburbs",
    //     rating: 4.5,
    //     isFeatured: false,
    //     status: "Active",
    //     latitude: 40.6782,
    //     longitude: -73.9442
    //   },
    //   {
    //     id: 7,
    //     title: "Modern Apartment Complex Unit",
    //     price: 320000,
    //     image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    //     propertyType: "apartments",
    //     bedrooms: 1,
    //     bathrooms: 1,
    //     size: 75,
    //     location: "Modern Quarter",
    //     rating: 4.3,
    //     isFeatured: false,
    //     status: "For Sale",
    //     latitude: 40.7505,
    //     longitude: -73.9934
    //   },
    //   {
    //     id: 8,
    //     title: "Historic Townhouse Renovated",
    //     price: 550000,
    //     image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    //     propertyType: "townhouses",
    //     bedrooms: 3,
    //     bathrooms: 2,
    //     size: 160,
    //     location: "Historic District",
    //     rating: 4.6,
    //     isFeatured: true,
    //     status: "Featured",
    //     latitude: 40.7505,
    //     longitude: -73.9934
    //   }
   
   
   
    try {
      setLoading(isLoading)
      if (!isLoading && Array.isArray(data)) {
        const mapCategoryToType = (category: string): string => {
          const normalized = (category || '').toLowerCase()
          if (normalized.includes('men') || normalized.includes('women')) return 'apartments'
          if (normalized.includes('elect')) return 'condos'
          if (normalized.includes('jewel')) return 'studios'
          return 'houses'
        }

        const baseCoords = [
          { lat: 40.7505, lon: -73.9934, loc: 'Downtown' },
          { lat: 40.7614, lon: -73.9776, loc: 'City Center' },
          { lat: 40.6782, lon: -73.9442, loc: 'Suburbs' },
          { lat: 25.7617, lon: -80.1918, loc: 'Waterfront' }
        ]

        const mapped: Property[] = data.map((item: any, index: number) => {
          const coord = baseCoords[index % baseCoords.length]
          const rate = item?.rating?.rate ?? 4
          return {
            id: item.id,
            title: item.title,
            price: typeof item.price === 'number' ? item.price : Number(item.price) || 0,
            image: item.image,
            propertyType: mapCategoryToType(item.category),
            bedrooms: (item?.rating?.count ?? 3) % 5 + 1,
            bathrooms: ((item?.rating?.count ?? 2) % 3) + 1,
            size: 80 + ((item?.rating?.count ?? 20) % 220),
            location: coord.loc,
            rating: rate,
            isFeatured: rate >= 4.6,
            status: rate >= 4.6 ? 'Featured' : (index % 3 === 0 ? 'For Rent' : 'For Sale'),
            latitude: coord.lat,
            longitude: coord.lon
          }
        })
        setProperties(mapped)
      }
    } catch (e) {
      console.error('Error mapping properties:', e)
      setLoading(false)
    }
  }, [data, isLoading])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const openGoogleMaps = (latitude: number, longitude: number, title: string) => {
    console.log('Opening map for:', { latitude, longitude, title })
    if (!latitude || !longitude) {
      console.error('Invalid coordinates:', { latitude, longitude })
      return
    }
    const url = `https://www.google.com/maps?q=${latitude},${longitude}&ll=${latitude},${longitude}&z=15`
    window.open(url, '_blank')
  }

  const handleLoadMore = () => {
    setIsLoadingMore(true)
    // Simulate loading delay
    setTimeout(() => {
      setDisplayedCount(prev => Math.min(prev + 6, filteredProperties.length))
      setIsLoadingMore(false)
    }, 1000)
  }

  const filteredProperties = activeFilter === 'all' 
    ? properties 
    : properties.filter(property => property.propertyType === activeFilter)

  const displayedProperties = filteredProperties.slice(0, displayedCount)
  const hasMoreProperties = displayedCount < filteredProperties.length

  if (loading) {
    return (
      <section className="py-20 bg-[#f8f9fa]">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#599D9C] mx-auto"></div>
            <p className="mt-4 text-[#666]">Loading properties...</p>
          </div>
        </div>
      </section>
    )
  }
    
  return (
    <section className="py-20 bg-[#f8f9fa]">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Section Title */}
        <div className="text-center ">
          <h2 className="text-[2.5rem] font-bold text-[#2c2c2c] mb-2 md:text-[2rem]">
            Featured Properties
          </h2>
        </div>

        {/* Description */}
        <div className="text-center mb-8 max-w-4xl mx-auto">
          <p className="text-[#666] text-lg leading-relaxed">
            Find the perfect property for your next adventure
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => {
                setActiveFilter(filter.id)
                setDisplayedCount(6) // Reset displayed count when filter changes
              }}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-all duration-300 ease-in-out ${
                activeFilter === filter.id
                  ? 'bg-[#599D9C] text-white'
                  : 'bg-gray-100 text-[#666] hover:bg-[#599D9C] hover:text-white'
              }`}
            >
              <span className="text-xl">{filter.icon}</span>
              <span className="text-sm font-medium">{filter.label}</span>
            </button>
          ))}
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProperties.map((property) => (
            <Link 
              key={property.id} 
              href={`/property/${property.id}`} 
              className="bg-white rounded-[15px] overflow-hidden shadow-[0_5px_20px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out hover:-translate-y-[5px] hover:shadow-[0_15px_40px_rgba(0,0,0,0.15)] group"
            >
              {/* Property Image */}
              <div className="relative h-[250px] overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    property.status === 'Featured' ? 'bg-[#599D9C] text-white' :
                    property.status === 'For Sale' ? 'bg-orange-500 text-white' :
                    property.status === 'For Rent' ? 'bg-green-500 text-white' :
                    property.status === 'Sold' ? 'bg-red-500 text-white' :
                    'bg-blue-500 text-white'
                  }`}>
                    {property.status === 'For Rent' ? '$1,000 / month' : property.status}
                  </span>
                </div>
                {/* Heart Icon */}
                <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors duration-300">
                  <FiHeart className="text-[#666] hover:text-red-500" />
                </button>
              </div>

              {/* Property Details */}
              <div className="p-6">
                <div className="text-[#599D9C] text-xl font-bold mb-2">
                  {formatPrice(property.price)}
                </div>
                <h3 className="text-[#2c2c2c] font-semibold mb-3 line-clamp-2">
                  {property.title}
                </h3>
                <div className="text-[#666] text-sm mb-4">
                  {property.bedrooms} Beds | {property.bathrooms} Baths | {property.size} M²
                </div>
                
                {/* Agent Info and Map Button */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#599D9C] rounded-full flex items-center justify-center">
                      <FiUser className="text-white text-sm" />
                    </div>
                    <span className="text-sm text-[#666]">Agent</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        console.log('Property object:', property)
                        console.log('Latitude:', property.latitude, 'Longitude:', property.longitude)
                        openGoogleMaps(property.latitude, property.longitude, property.title)
                      }}
                      className="flex items-center gap-1 px-3 py-1 bg-[#599D9C] text-white rounded-full text-xs hover:bg-[#16796F] transition-colors duration-300"
                    >
                      <FiMapPin className="text-xs" />
                      Map
                  </button>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm text-[#666]">{property.rating}</span>
                    </div>
                  </div>
                </div>
                </div>
              </Link>
            ))}
          </div>

        {/* Load More Button */}
        {hasMoreProperties && (
          <div className="text-center mt-12">
            <button 
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="bg-[#599D9C] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#16796F] transition-colors duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
            >
              {isLoadingMore ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Loading...
                </>
              ) : (
                'Load More Properties'
              )}
            </button>
          </div>
        )}
        </div>
      </section>
  )
}

export default ProductsGrid