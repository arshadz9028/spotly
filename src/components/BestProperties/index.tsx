import Link from 'next/link'
import React, { useState, useEffect } from 'react'
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

function BestProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { id: 'all', label: 'All Properties', icon: '🏠' },
    { id: 'houses', label: 'Houses', icon: '🏘️' },
    { id: 'apartments', label: 'Apartments', icon: '🏢' },
    { id: 'condos', label: 'Condos', icon: '🏬' },
    { id: 'studios', label: 'Studios', icon: '🏠' },
    { id: 'townhouses', label: 'Townhouses', icon: '🏘️' },
  ]

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Using Unsplash API for property images and creating realistic property data
        // const propertyTypes = ['houses', 'apartments', 'condos', 'studios', 'townhouses']
        // const locations = ['Downtown', 'Suburbs', 'Waterfront', 'Hillside', 'City Center', 'Garden District', 'Historic District', 'Modern Quarter']
        // const statuses = ['For Sale', 'For Rent', 'Featured', 'Sold', 'Active']
        
        const mockProperties: Property[] = [
          {
            id: 1,
            title: "Modern Luxury Villa with Panoramic Views",
            price: 1250000,
            image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            propertyType: "houses",
            bedrooms: 4,
            bathrooms: 3,
            size: 280,
            location: "Hillside",
            rating: 4.8,
            isFeatured: true,
            status: "Featured",
            latitude: 40.7589,
            longitude: -73.9851
          },
          {
            id: 2,
            title: "Contemporary Apartment in City Center",
            price: 450000,
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            propertyType: "apartments",
            bedrooms: 2,
            bathrooms: 2,
            size: 120,
            location: "City Center",
            rating: 4.6,
            isFeatured: false,
            status: "For Sale",
            latitude: 40.7614,
            longitude: -73.9776
          },
          {
            id: 3,
            title: "Elegant Townhouse with Garden",
            price: 675000,
            image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            propertyType: "townhouses",
            bedrooms: 3,
            bathrooms: 2,
            size: 180,
            location: "Garden District",
            rating: 4.7,
            isFeatured: true,
            status: "For Sale",
            latitude: 40.7505,
            longitude: -73.9934
          },
          {
            id: 4,
            title: "Stylish Studio Apartment",
            price: 280000,
            image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            propertyType: "studios",
            bedrooms: 1,
            bathrooms: 1,
            size: 45,
            location: "Downtown",
            rating: 4.4,
            isFeatured: false,
            status: "For Rent",
            latitude: 40.7505,
            longitude: -73.9934
          },
          {
            id: 5,
            title: "Luxury Condo with Ocean View",
            price: 890000,
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            propertyType: "condos",
            bedrooms: 2,
            bathrooms: 2,
            size: 150,
            location: "Waterfront",
            rating: 4.9,
            isFeatured: true,
            status: "Featured",
            latitude: 25.7617,
            longitude: -80.1918
          },
          {
            id: 6,
            title: "Family Home with Pool",
            price: 750000,
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            propertyType: "houses",
            bedrooms: 4,
            bathrooms: 3,
            size: 220,
            location: "Suburbs",
            rating: 4.5,
            isFeatured: false,
            status: "Active",
            latitude: 40.6782,
            longitude: -73.9442
          },
          {
            id: 7,
            title: "Modern Apartment Complex Unit",
            price: 320000,
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            propertyType: "apartments",
            bedrooms: 1,
            bathrooms: 1,
            size: 75,
            location: "Modern Quarter",
            rating: 4.3,
            isFeatured: false,
            status: "For Sale",
            latitude: 40.7505,
            longitude: -73.9934
          },
          {
            id: 8,
            title: "Historic Townhouse Renovated",
            price: 550000,
            image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            propertyType: "townhouses",
            bedrooms: 3,
            bathrooms: 2,
            size: 160,
            location: "Historic District",
            rating: 4.6,
            isFeatured: true,
            status: "Featured",
            latitude: 40.7505,
            longitude: -73.9934
          }
        ]
        
        setProperties(mockProperties)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching properties:', error)
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  const filteredProperties = activeFilter === 'all' 
    ? properties 
    : properties.filter(property => property.propertyType === activeFilter)

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

  if (loading) {
    return (
      <section className="py-20 bg-white">
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
    <section className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-[2.5rem] font-bold text-[#2c2c2c] mb-2 md:text-[2rem]">
            Best Listings Available
          </h2>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {filteredProperties.map((property) => (
            <Link 
              key={property.id} 
              href={`/property/${property.id}`} 
              className="bg-white rounded-[15px] overflow-hidden shadow-[0_5px_20px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out hover:-translate-y-[5px] hover:shadow-[0_15px_40px_rgba(0,0,0,0.15)] group"
            >
              {/* Property Image */}
              <div className="relative h-[200px] overflow-hidden">
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
                    {property.status}
                  </span>
                </div>
                {/* Heart Icon */}
                <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors duration-300">
                  <FiHeart className="text-[#666] hover:text-red-500" />
                </button>
              </div>

              {/* Property Details */}
              <div className="p-4">
                <div className="text-[#599D9C] text-xl font-bold mb-2">
                  {formatPrice(property.price)}
                </div>
                <h3 className="text-[#2c2c2c] font-semibold mb-3 line-clamp-2">
                  {property.title}
                </h3>
                <div className="text-[#666] text-sm mb-4">
                  Bedrooms: {property.bedrooms} | Bathrooms: {property.bathrooms} | Size: {property.size} M²
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
        {/* <div className="text-center">
          <button className="bg-[#599D9C] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#16796F] transition-colors duration-300 ease-in-out">
            Load More Listings
          </button>
        </div> */}
      </div>
    </section>
  )
}

export default BestProperties
