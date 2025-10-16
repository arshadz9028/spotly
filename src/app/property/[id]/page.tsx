'use client'

import React, { useMemo, useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiArrowLeft, FiHeart, FiShare2, FiMapPin, FiHome, FiPhone, FiMail, FiCalendar, FiDollarSign, FiSquare, FiNavigation } from 'react-icons/fi'
import axios from 'axios';
import useSWR from 'swr';
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
  description?: string
  amenities?: string[]
  yearBuilt?: number
  parkingSpaces?: number
  agent?: {
    name: string
    phone: string
    email: string
    avatar: string
  }
}

function PropertyPage() {
  const params = useParams()
  const router = useRouter()
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const fetcher = (url: string) => axios.get(url).then(res => res.data);
  const { data, error, isLoading } = useSWR(`https://fakestoreapi.com/products/${params.id}`, fetcher);
  console.log('data', data);
  
  // Mock property data commented per request. We'll map from the fetched data instead.
  // const mockProperties: Property[] = [
  //   // Properties from BestProperties (IDs 1-8)
  //   {
  //     id: 1,
  //     title: "Modern Luxury Villa with Panoramic Views",
  //     price: 1250000,
  //     image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //     propertyType: "houses",
  //     bedrooms: 4,
  //     bathrooms: 3,
  //     size: 280,
  //     location: "Hillside",
  //     rating: 4.8,
  //     isFeatured: true,
  //     status: "Featured",
  //     latitude: 40.7589,
  //     longitude: -73.9851,
  //     description: "This stunning modern villa offers breathtaking panoramic views of the city skyline. Featuring contemporary design with floor-to-ceiling windows, premium finishes, and an open-concept living space perfect for entertaining.",
  //     amenities: ["Swimming Pool", "Garden", "Garage", "Security System", "Air Conditioning", "Fireplace", "Balcony", "Gym"],
  //     yearBuilt: 2020,
  //     parkingSpaces: 2,
  //     agent: {
  //       name: "Sarah Johnson",
  //       phone: "+1 (555) 123-4567",
  //       email: "sarah.johnson@propmart.com",
  //       avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  //     }
  //   },
  //   {
  //     id: 2,
  //     title: "Contemporary Apartment in City Center",
  //     price: 450000,
  //     image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //     propertyType: "apartments",
  //     bedrooms: 2,
  //     bathrooms: 2,
  //     size: 120,
  //     location: "City Center",
  //     rating: 4.6,
  //     isFeatured: false,
  //     status: "For Sale",
  //     latitude: 40.7614,
  //     longitude: -73.9776,
  //     description: "Located in the heart of the city, this contemporary apartment offers modern living with easy access to shopping, dining, and entertainment. Features include hardwood floors, stainless steel appliances, and a private balcony.",
  //     amenities: ["Balcony", "Elevator", "Concierge", "Gym", "Pool", "Parking", "Air Conditioning", "Dishwasher"],
  //     yearBuilt: 2018,
  //     parkingSpaces: 1,
  //     agent: {
  //       name: "Michael Chen",
  //       phone: "+1 (555) 234-5678",
  //       email: "michael.chen@propmart.com",
  //       avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  //     }
  //   },
  //   {
  //     id: 3,
  //     title: "Elegant Townhouse with Garden",
  //     price: 675000,
  //     image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //     propertyType: "townhouses",
  //     bedrooms: 3,
  //     bathrooms: 2,
  //     size: 180,
  //     location: "Garden District",
  //     rating: 4.7,
  //     isFeatured: true,
  //     status: "For Sale",
  //     latitude: 40.7505,
  //     longitude: -73.9934,
  //     description: "This elegant townhouse features a beautiful private garden and traditional architecture with modern amenities. Perfect for families seeking space and privacy in a desirable neighborhood.",
  //     amenities: ["Private Garden", "Garage", "Fireplace", "Hardwood Floors", "Updated Kitchen", "Laundry Room", "Storage", "Patio"],
  //     yearBuilt: 2015,
  //     parkingSpaces: 2,
  //     agent: {
  //       name: "Emily Rodriguez",
  //       phone: "+1 (555) 345-6789",
  //       email: "emily.rodriguez@propmart.com",
  //       avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  //     }
  //   },
  //   {
  //     id: 4,
  //     title: "Stylish Studio Apartment",
  //     price: 280000,
  //     image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //     propertyType: "studios",
  //     bedrooms: 1,
  //     bathrooms: 1,
  //     size: 45,
  //     location: "Downtown",
  //     rating: 4.4,
  //     isFeatured: false,
  //     status: "For Rent",
  //     latitude: 40.7505,
  //     longitude: -73.9934,
  //     description: "Perfect for young professionals, this stylish studio apartment offers modern amenities in a prime downtown location. Features include high ceilings, large windows, and contemporary finishes.",
  //     amenities: ["High Ceilings", "Large Windows", "Modern Appliances", "Hardwood Floors", "Air Conditioning", "Elevator", "Concierge", "Gym"],
  //     yearBuilt: 2019,
  //     parkingSpaces: 0,
  //     agent: {
  //       name: "David Kim",
  //       phone: "+1 (555) 456-7890",
  //       email: "david.kim@propmart.com",
  //       avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  //     }
  //   },
  //   {
  //     id: 5,
  //     title: "Luxury Condo with Ocean View",
  //     price: 890000,
  //     image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //     propertyType: "condos",
  //     bedrooms: 2,
  //     bathrooms: 2,
  //     size: 150,
  //     location: "Waterfront",
  //     rating: 4.9,
  //     isFeatured: true,
  //     status: "Featured",
  //     latitude: 25.7617,
  //     longitude: -80.1918,
  //     description: "Experience luxury living with stunning ocean views from this premium waterfront condo. Features include floor-to-ceiling windows, premium finishes, and access to resort-style amenities.",
  //     amenities: ["Ocean View", "Floor-to-Ceiling Windows", "Balcony", "Pool", "Spa", "Concierge", "Valet Parking", "Fitness Center"],
  //     yearBuilt: 2021,
  //     parkingSpaces: 1,
  //     agent: {
  //       name: "Lisa Wang",
  //       phone: "+1 (555) 567-8901",
  //       email: "lisa.wang@propmart.com",
  //       avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  //     }
  //   },
  //   {
  //     id: 6,
  //     title: "Family Home with Pool",
  //     price: 750000,
  //     image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //     propertyType: "houses",
  //     bedrooms: 4,
  //     bathrooms: 3,
  //     size: 220,
  //     location: "Suburbs",
  //     rating: 4.5,
  //     isFeatured: false,
  //     status: "Active",
  //     latitude: 40.6782,
  //     longitude: -73.9442,
  //     description: "Perfect for families, this spacious home features a private pool, large backyard, and modern amenities. Located in a quiet suburban neighborhood with excellent schools nearby.",
  //     amenities: ["Private Pool", "Large Backyard", "Garage", "Fireplace", "Updated Kitchen", "Hardwood Floors", "Central Air", "Security System"],
  //     yearBuilt: 2017,
  //     parkingSpaces: 2,
  //     agent: {
  //       name: "Robert Martinez",
  //       phone: "+1 (555) 678-9012",
  //       email: "robert.martinez@propmart.com",
  //       avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  //     }
  //   },
  //   {
  //     id: 7,
  //     title: "Modern Apartment Complex Unit",
  //     price: 320000,
  //     image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //     propertyType: "apartments",
  //     bedrooms: 1,
  //     bathrooms: 1,
  //     size: 75,
  //     location: "Modern Quarter",
  //     rating: 4.3,
  //     isFeatured: false,
  //     status: "For Sale",
  //     latitude: 40.7505,
  //     longitude: -73.9934,
  //     description: "Contemporary living in a modern apartment complex with excellent amenities. This unit offers efficient use of space with modern finishes and access to building facilities.",
  //     amenities: ["Modern Appliances", "Hardwood Floors", "Air Conditioning", "Elevator", "Gym", "Pool", "Concierge", "Parking"],
  //     yearBuilt: 2020,
  //     parkingSpaces: 1,
  //     agent: {
  //       name: "Jennifer Lee",
  //       phone: "+1 (555) 789-0123",
  //       email: "jennifer.lee@propmart.com",
  //       avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  //     }
  //   },
  //   {
  //     id: 8,
  //     title: "Historic Townhouse Renovated",
  //     price: 550000,
  //     image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //     propertyType: "townhouses",
  //     bedrooms: 3,
  //     bathrooms: 2,
  //     size: 160,
  //     location: "Historic District",
  //     rating: 4.6,
  //     isFeatured: true,
  //     status: "Featured",
  //     latitude: 40.7505,
  //     longitude: -73.9934,
  //     description: "Charming historic townhouse completely renovated with modern amenities while preserving original character. Located in a prestigious historic district with tree-lined streets.",
  //     amenities: ["Historic Character", "Modern Kitchen", "Hardwood Floors", "Fireplace", "Private Garden", "Garage", "Updated Bathrooms", "Original Details"],
  //     yearBuilt: 1920,
  //     parkingSpaces: 1,
  //     agent: {
  //       name: "Thomas Anderson",
  //       phone: "+1 (555) 890-1234",
  //       email: "thomas.anderson@propmart.com",
  //       avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  //     }
  //   },
  //   // Properties from ProductsGrid (IDs 9-24)
  //   {
  //     id: 9,
  //     title: "Luxury Penthouse with City Views",
  //     price: 1200000,
  //     image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //     propertyType: "apartments",
  //     bedrooms: 3,
  //     bathrooms: 2,
  //     size: 200,
  //     location: "City Center",
  //     rating: 4.9,
  //     isFeatured: true,
  //     status: "Featured",
  //     latitude: 40.7614,
  //     longitude: -73.9776,
  //     description: "Ultimate luxury living in this stunning penthouse with panoramic city views. Features include private elevator access, rooftop terrace, and premium finishes throughout.",
  //     amenities: ["Private Elevator", "Rooftop Terrace", "City Views", "Premium Finishes", "Concierge", "Valet Parking", "Wine Cellar", "Home Theater"],
  //     yearBuilt: 2022,
  //     parkingSpaces: 2,
  //     agent: {
  //       name: "Amanda Foster",
  //       phone: "+1 (555) 901-2345",
  //       email: "amanda.foster@propmart.com",
  //       avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  //     }
  //   },
  //   {
  //     id: 10,
  //     title: "Modern Condo with Balcony",
  //     price: 650000,
  //     image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //     propertyType: "condos",
  //     bedrooms: 2,
  //     bathrooms: 2,
  //     size: 140,
  //     location: "Waterfront",
  //     rating: 4.7,
  //     isFeatured: false,
  //     status: "For Sale",
  //     latitude: 25.7617,
  //     longitude: -80.1918,
  //     description: "Contemporary condo with private balcony offering water views. Modern open-concept design with high-end finishes and access to building amenities.",
  //     amenities: ["Private Balcony", "Water Views", "Open Concept", "Modern Kitchen", "Hardwood Floors", "Pool", "Gym", "Concierge"],
  //     yearBuilt: 2019,
  //     parkingSpaces: 1,
  //     agent: {
  //       name: "Kevin Park",
  //       phone: "+1 (555) 012-3456",
  //       email: "kevin.park@propmart.com",
  //       avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  //     }
  //   },
  //   {
  //     id: 11,
  //     title: "Cozy Studio in Historic Building",
  //     price: 1800,
  //     image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //     propertyType: "studios",
  //     bedrooms: 1,
  //     bathrooms: 1,
  //     size: 35,
  //     location: "Historic District",
  //     rating: 4.5,
  //     isFeatured: false,
  //     status: "For Rent",
  //     latitude: 40.7505,
  //     longitude: -73.9934,
  //     description: "Charming studio apartment in a beautifully restored historic building. Perfect for urban living with character and modern conveniences.",
  //     amenities: ["Historic Character", "High Ceilings", "Large Windows", "Hardwood Floors", "Modern Appliances", "Air Conditioning", "Elevator", "Concierge"],
  //     yearBuilt: 1925,
  //     parkingSpaces: 0,
  //     agent: {
  //       name: "Rachel Green",
  //       phone: "+1 (555) 123-4567",
  //       email: "rachel.green@propmart.com",
  //       avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  //     }
  //   },
  //   {
  //     id: 12,
  //     title: "Spacious Family House",
  //     price: 850000,
  //     image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //     propertyType: "houses",
  //     bedrooms: 4,
  //     bathrooms: 3,
  //     size: 250,
  //     location: "Suburbs",
  //     rating: 4.6,
  //     isFeatured: true,
  //     status: "Featured",
  //     latitude: 40.6782,
  //     longitude: -73.9442,
  //     description: "Perfect family home with spacious rooms, large backyard, and modern amenities. Located in a quiet suburban neighborhood with excellent schools.",
  //     amenities: ["Large Backyard", "Garage", "Fireplace", "Updated Kitchen", "Hardwood Floors", "Central Air", "Security System", "Playground"],
  //     yearBuilt: 2018,
  //     parkingSpaces: 2,
  //     agent: {
  //       name: "Mark Thompson",
  //       phone: "+1 (555) 234-5678",
  //       email: "mark.thompson@propmart.com",
  //       avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  //     }
  //   },
  //   {
  //     id: 13,
  //     title: "Contemporary Apartment Complex",
  //     price: 380000,
  //     image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //     propertyType: "apartments",
  //     bedrooms: 2,
  //     bathrooms: 1,
  //     size: 90,
  //     location: "Modern Quarter",
  //     rating: 4.4,
  //     isFeatured: false,
  //     status: "For Sale",
  //     latitude: 40.7505,
  //     longitude: -73.9934,
  //     description: "Modern apartment in a contemporary complex with excellent amenities. Features include open-concept living, modern finishes, and access to building facilities.",
  //     amenities: ["Open Concept", "Modern Appliances", "Hardwood Floors", "Air Conditioning", "Elevator", "Gym", "Pool", "Concierge"],
  //     yearBuilt: 2020,
  //     parkingSpaces: 1,
  //     agent: {
  //       name: "Sarah Wilson",
  //       phone: "+1 (555) 345-6789",
  //       email: "sarah.wilson@propmart.com",
  //       avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  //     }
  //   },
  //   {
  //     id: 14,
  //     title: "Elegant Townhouse Renovation",
  //     price: 720000,
  //     image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //     propertyType: "townhouses",
  //     bedrooms: 3,
  //     bathrooms: 2,
  //     size: 190,
  //     location: "Garden District",
  //     rating: 4.8,
  //     isFeatured: true,
  //     status: "Featured",
  //     latitude: 40.7505,
  //     longitude: -73.9934,
  //     description: "Beautifully renovated townhouse in the prestigious Garden District. Combines historic charm with modern luxury and contemporary amenities.",
  //     amenities: ["Historic Charm", "Modern Kitchen", "Hardwood Floors", "Fireplace", "Private Garden", "Garage", "Updated Bathrooms", "Original Details"],
  //     yearBuilt: 1910,
  //     parkingSpaces: 2,
  //     agent: {
  //       name: "James Brown",
  //       phone: "+1 (555) 456-7890",
  //       email: "james.brown@propmart.com",
  //       avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  //     }
  //   },
  //   {
  //     id: 15,
  //     title: "Modern Loft with Industrial Design",
  //     price: 450000,
  //     image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //     propertyType: "apartments",
  //     bedrooms: 2,
  //     bathrooms: 2,
  //     size: 120,
  //     location: "Arts District",
  //     rating: 4.6,
  //     isFeatured: false,
  //     status: "For Sale",
  //     latitude: 40.7505,
  //     longitude: -73.9934,
  //     description: "Stylish loft conversion with industrial design elements. Features exposed brick walls, high ceilings, and modern amenities in a vibrant arts district.",
  //     amenities: ["Exposed Brick", "High Ceilings", "Industrial Design", "Modern Kitchen", "Hardwood Floors", "Air Conditioning", "Elevator", "Rooftop Access"],
  //     yearBuilt: 2016,
  //     parkingSpaces: 1,
  //     agent: {
  //       name: "Michelle Davis",
  //       phone: "+1 (555) 567-8901",
  //       email: "michelle.davis@propmart.com",
  //       avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  //     }
  //   },
  //   {
  //     id: 16,
  //     title: "Beachfront Villa with Pool",
  //     price: 1500000,
  //     image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //     propertyType: "houses",
  //     bedrooms: 5,
  //     bathrooms: 4,
  //     size: 350,
  //     location: "Beachfront",
  //     rating: 4.9,
  //     isFeatured: true,
  //     status: "Featured",
  //     latitude: 25.7617,
  //     longitude: -80.1918,
  //     description: "Luxury beachfront villa with private pool and direct beach access. Features include panoramic ocean views, premium finishes, and resort-style amenities.",
  //     amenities: ["Beachfront", "Private Pool", "Ocean Views", "Premium Finishes", "Outdoor Kitchen", "Spa", "Garage", "Security System"],
  //     yearBuilt: 2021,
  //     parkingSpaces: 3,
  //     agent: {
  //       name: "Carlos Rodriguez",
  //       phone: "+1 (555) 678-9012",
  //       email: "carlos.rodriguez@propmart.com",
  //       avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  //     }
  //   },
  //   {
  //     id: 17,
  //     title: "Urban Studio with City Views",
  //     price: 2200,
  //     image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //     propertyType: "studios",
  //     bedrooms: 1,
  //     bathrooms: 1,
  //     size: 40,
  //     location: "Downtown",
  //     rating: 4.3,
  //     isFeatured: false,
  //     status: "For Rent",
  //     latitude: 40.7505,
  //     longitude: -73.9934,
  //     description: "Modern urban studio with stunning city views. Perfect for young professionals seeking contemporary living in the heart of downtown.",
  //     amenities: ["City Views", "High Ceilings", "Large Windows", "Modern Appliances", "Hardwood Floors", "Air Conditioning", "Elevator", "Concierge"],
  //     yearBuilt: 2020,
  //     parkingSpaces: 0,
  //     agent: {
  //       name: "Nicole Taylor",
  //       phone: "+1 (555) 789-0123",
  //       email: "nicole.taylor@propmart.com",
  //       avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  //     }
  //   },
  //   {
  //     id: 18,
  //     title: "Luxury Condo with Rooftop Access",
  //     price: 950000,
  //     image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //     propertyType: "condos",
  //     bedrooms: 3,
  //     bathrooms: 2,
  //     size: 180,
  //     location: "Skyline District",
  //     rating: 4.7,
  //     isFeatured: true,
  //     status: "Featured",
  //     latitude: 40.7614,
  //     longitude: -73.9776,
  //     description: "Premium condo with exclusive rooftop access and city skyline views. Features include modern finishes, premium appliances, and access to luxury amenities.",
  //     amenities: ["Rooftop Access", "City Views", "Modern Finishes", "Premium Appliances", "Concierge", "Valet Parking", "Wine Cellar", "Fitness Center"],
  //     yearBuilt: 2022,
  //     parkingSpaces: 2,
  //     agent: {
  //       name: "Daniel Kim",
  //       phone: "+1 (555) 890-1234",
  //       email: "daniel.kim@propmart.com",
  //       avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  //     }
  //   },
  //   {
  //     id: 19,
  //     title: "Charming Victorian House",
  //     price: 680000,
  //     image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //     propertyType: "houses",
  //     bedrooms: 3,
  //     bathrooms: 2,
  //     size: 160,
  //     location: "Historic Quarter",
  //     rating: 4.5,
  //     isFeatured: false,
  //     status: "For Sale",
  //     latitude: 40.7505,
  //     longitude: -73.9934,
  //     description: "Beautiful Victorian house with original character and modern updates. Located in a charming historic quarter with tree-lined streets and local shops.",
  //     amenities: ["Victorian Character", "Original Details", "Modern Kitchen", "Hardwood Floors", "Fireplace", "Garden", "Garage", "Updated Bathrooms"],
  //     yearBuilt: 1895,
  //     parkingSpaces: 1,
  //     agent: {
  //       name: "Patricia White",
  //       phone: "+1 (555) 901-2345",
  //       email: "patricia.white@propmart.com",
  //       avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  //     }
  //   },
  //   {
  //     id: 20,
  //     title: "Contemporary Townhouse with Garage",
  //     price: 580000,
  //     image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //     propertyType: "townhouses",
  //     bedrooms: 3,
  //     bathrooms: 2,
  //     size: 170,
  //     location: "Residential Park",
  //     rating: 4.4,
  //     isFeatured: false,
  //     status: "For Sale",
  //     latitude: 40.6782,
  //     longitude: -73.9442,
  //     description: "Modern townhouse in a quiet residential park. Features include contemporary design, private garage, and access to community amenities.",
  //     amenities: ["Contemporary Design", "Private Garage", "Modern Kitchen", "Hardwood Floors", "Air Conditioning", "Community Pool", "Playground", "Walking Trails"],
  //     yearBuilt: 2019,
  //     parkingSpaces: 2,
  //     agent: {
  //       name: "Andrew Johnson",
  //       phone: "+1 (555) 012-3456",
  //       email: "andrew.johnson@propmart.com",
  //       avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  //     }
  //   },
  //   {
  //     id: 21,
  //     title: "Executive Apartment with Balcony",
  //     price: 3200,
  //     image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //     propertyType: "apartments",
  //     bedrooms: 2,
  //     bathrooms: 2,
  //     size: 110,
  //     location: "Business District",
  //     rating: 4.6,
  //     isFeatured: false,
  //     status: "For Rent",
  //     latitude: 40.7614,
  //     longitude: -73.9776,
  //     description: "Executive apartment in the heart of the business district. Perfect for professionals with modern amenities and convenient location.",
  //     amenities: ["Private Balcony", "Modern Appliances", "Hardwood Floors", "Air Conditioning", "Elevator", "Concierge", "Gym", "Business Center"],
  //     yearBuilt: 2021,
  //     parkingSpaces: 1,
  //     agent: {
  //       name: "Stephanie Clark",
  //       phone: "+1 (555) 123-4567",
  //       email: "stephanie.clark@propmart.com",
  //       avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  //     }
  //   },
  //   {
  //     id: 22,
  //     title: "Mountain View Cabin",
  //     price: 420000,
  //     image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //     propertyType: "houses",
  //     bedrooms: 2,
  //     bathrooms: 1,
  //     size: 95,
  //     location: "Mountain Ridge",
  //     rating: 4.8,
  //     isFeatured: true,
  //     status: "Featured",
  //     latitude: 40.7505,
  //     longitude: -73.9934,
  //     description: "Charming mountain cabin with breathtaking views. Perfect for nature lovers seeking peace and tranquility with modern comforts.",
  //     amenities: ["Mountain Views", "Fireplace", "Deck", "Modern Kitchen", "Hardwood Floors", "Air Conditioning", "Garage", "Hiking Trails"],
  //     yearBuilt: 2015,
  //     parkingSpaces: 2,
  //     agent: {
  //       name: "Ryan Murphy",
  //       phone: "+1 (555) 234-5678",
  //       email: "ryan.murphy@propmart.com",
  //       avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  //     }
  //   },
  //   {
  //     id: 23,
  //     title: "Minimalist Studio Design",
  //     price: 1900,
  //     image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //     propertyType: "studios",
  //     bedrooms: 1,
  //     bathrooms: 1,
  //     size: 30,
  //     location: "Design District",
  //     rating: 4.2,
  //     isFeatured: false,
  //     status: "For Rent",
  //     latitude: 40.7505,
  //     longitude: -73.9934,
  //     description: "Minimalist studio with clean lines and modern design. Perfect for those who appreciate simplicity and contemporary aesthetics.",
  //     amenities: ["Minimalist Design", "Modern Appliances", "Hardwood Floors", "Air Conditioning", "Large Windows", "Elevator", "Concierge", "Rooftop Access"],
  //     yearBuilt: 2020,
  //     parkingSpaces: 0,
  //     agent: {
  //       name: "Emma Wilson",
  //       phone: "+1 (555) 345-6789",
  //       email: "emma.wilson@propmart.com",
  //       avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  //     }
  //   },
  //   {
  //     id: 24,
  //     title: "Penthouse with Private Terrace",
  //     price: 1800000,
  //     image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //     propertyType: "condos",
  //     bedrooms: 4,
  //     bathrooms: 3,
  //     size: 280,
  //     location: "Premium Heights",
  //     rating: 4.9,
  //     isFeatured: true,
  //     status: "Featured",
  //     latitude: 40.7614,
  //     longitude: -73.9776,
  //     description: "Ultimate luxury penthouse with private terrace and panoramic city views. Features include premium finishes, private elevator, and exclusive amenities.",
  //     amenities: ["Private Terrace", "City Views", "Premium Finishes", "Private Elevator", "Concierge", "Valet Parking", "Wine Cellar", "Home Theater"],
  //     yearBuilt: 2023,
  //     parkingSpaces: 3,
  //     agent: {
  //       name: "Alexander Stone",
  //       phone: "+1 (555) 456-7890",
  //       email: "alexander.stone@propmart.com",
  //       avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  //     }
  //   }
  // ]

  useEffect(() => {
    try {
      setLoading(isLoading)
      if (!isLoading && data) {
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

        const idNum = Number(params.id)
        const coord = baseCoords[(idNum || 0) % baseCoords.length]
        const rate = data?.rating?.rate ?? 4
        const mapped: Property = {
          id: data.id,
          title: data.title,
          price: typeof data.price === 'number' ? data.price : Number(data.price) || 0,
          image: data.image,
          propertyType: mapCategoryToType(data.category),
          bedrooms: (data?.rating?.count ?? 3) % 5 + 1,
          bathrooms: ((data?.rating?.count ?? 2) % 3) + 1,
          size: 80 + ((data?.rating?.count ?? 20) % 220),
          location: coord.loc,
          rating: rate,
          isFeatured: rate >= 4.6,
          status: rate >= 4.6 ? 'Featured' : (idNum % 3 === 0 ? 'For Rent' : 'For Sale'),
          latitude: coord.lat,
          longitude: coord.lon,
          description: data.description,
          amenities: ['Modern Appliances', 'Hardwood Floors', 'Air Conditioning', 'Elevator', 'Concierge', 'Gym', 'Parking', 'Rooftop Access'],
          yearBuilt: 2015 + ((idNum || 0) % 10),
          parkingSpaces: ((idNum || 0) % 3)
        }
        setProperty(mapped)
      }
    } catch (e) {
      console.error('Error mapping property:', e)
      router.push('/')
    } finally {
      if (isLoading === false) setLoading(false)
    }
  }, [data, isLoading, params.id, router])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const openGoogleMaps = () => {
    if (property) {
      const url = `https://www.google.com/maps?q=${property.latitude},${property.longitude}&ll=${property.latitude},${property.longitude}&z=15`
      window.open(url, '_blank')
    }
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const shareProperty = () => {
    if (navigator.share) {
      navigator.share({
        title: property?.title,
        text: `Check out this property: ${property?.title}`,
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Property link copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#599D9C] mx-auto"></div>
          <p className="mt-4 text-[#666]">Loading property details...</p>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#2c2c2c] mb-4">Property Not Found</h1>
          <Link href="/" className="text-[#599D9C] hover:text-[#16796F] transition-colors duration-300">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-[#666] hover:text-[#599D9C] transition-colors duration-300"
            >
              <FiArrowLeft className="text-lg" />
              <span>Back to Properties</span>
            </Link>
            <div className="flex items-center gap-3">
              <button 
                onClick={toggleFavorite}
                className={`p-2 rounded-full transition-colors duration-300 ${
                  isFavorite ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-[#666] hover:bg-red-100 hover:text-red-500'
                }`}
              >
                <FiHeart className={`text-lg ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              <button 
                onClick={shareProperty}
                className="p-2 bg-gray-100 text-[#666] rounded-full hover:bg-[#599D9C] hover:text-white transition-colors duration-300"
              >
                <FiShare2 className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Images */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-96 md:h-[500px]">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    property.status === 'Featured' ? 'bg-[#599D9C] text-white' :
                    property.status === 'For Sale' ? 'bg-orange-500 text-white' :
                    property.status === 'For Rent' ? 'bg-green-500 text-white' :
                    'bg-blue-500 text-white'
                  }`}>
                    {property.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-[#2c2c2c] mb-2">{property.title}</h1>
                  <div className="flex items-center gap-2 text-[#666]">
                    <FiMapPin className="text-sm" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-[#599D9C] mb-1">
                    {formatPrice(property.price)}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-sm text-[#666]">{property.rating}</span>
                  </div>
                </div>
              </div>

              {/* Property Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <FiHome className="text-2xl text-[#599D9C] mx-auto mb-2" />
                  <div className="text-sm text-[#666]">Bedrooms</div>
                  <div className="text-lg font-semibold text-[#2c2c2c]">{property.bedrooms}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <FiSquare className="text-2xl text-[#599D9C] mx-auto mb-2" />
                  <div className="text-sm text-[#666]">Bathrooms</div>
                  <div className="text-lg font-semibold text-[#2c2c2c]">{property.bathrooms}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <FiDollarSign className="text-2xl text-[#599D9C] mx-auto mb-2" />
                  <div className="text-sm text-[#666]">Size</div>
                  <div className="text-lg font-semibold text-[#2c2c2c]">{property.size} M²</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <FiNavigation className="text-2xl text-[#599D9C] mx-auto mb-2" />
                  <div className="text-sm text-[#666]">Parking</div>
                  <div className="text-lg font-semibold text-[#2c2c2c]">{property.parkingSpaces || 'N/A'}</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[#2c2c2c] mb-3">Description</h3>
                <p className="text-[#666] leading-relaxed">
                  {property.description || "This beautiful property offers modern amenities and comfortable living spaces. Contact our agent for more details about this exceptional property."}
                </p>
              </div>

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-[#2c2c2c] mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2 text-[#666]">
                        <div className="w-2 h-2 bg-[#599D9C] rounded-full"></div>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <FiCalendar className="text-[#599D9C]" />
                  <div>
                    <div className="text-sm text-[#666]">Year Built</div>
                    <div className="font-semibold text-[#2c2c2c]">{property.yearBuilt || 'N/A'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FiHome className="text-[#599D9C]" />
                  <div>
                    <div className="text-sm text-[#666]">Property Type</div>
                    <div className="font-semibold text-[#2c2c2c] capitalize">{property.propertyType}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-[#2c2c2c]">Location</h3>
                <button 
                  onClick={openGoogleMaps}
                  className="flex items-center gap-2 px-4 py-2 bg-[#599D9C] text-white rounded-lg hover:bg-[#16796F] transition-colors duration-300"
                >
                  <FiMapPin className="text-sm" />
                  Open in Maps
                </button>
              </div>
              <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <FiMapPin className="text-4xl text-[#599D9C] mx-auto mb-2" />
                  <p className="text-[#666]">Interactive Map</p>
                  <p className="text-sm text-[#999]">Click Open in Maps to view location</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Agent */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-[#2c2c2c] mb-4">Contact Agent</h3>
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={property.agent?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"} 
                  alt="Agent"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-[#2c2c2c]">{property.agent?.name || "John Doe"}</div>
                  <div className="text-sm text-[#666]">Real Estate Agent</div>
                </div>
              </div>
              <div className="space-y-3">
                <a 
                  href={`tel:${property.agent?.phone || "+1 (555) 123-4567"}`}
                  className="flex items-center gap-3 w-full p-3 bg-[#599D9C] text-white rounded-lg hover:bg-[#16796F] transition-colors duration-300"
                >
                  <FiPhone className="text-lg" />
                  <span>Call Agent</span>
                </a>
                <a 
                  href={`mailto:${property.agent?.email || "agent@propmart.com"}`}
                  className="flex items-center gap-3 w-full p-3 border border-[#599D9C] text-[#599D9C] rounded-lg hover:bg-[#599D9C] hover:text-white transition-colors duration-300"
                >
                  <FiMail className="text-lg" />
                  <span>Email Agent</span>
                </a>
              </div>
            </div>

            {/* Property Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-[#2c2c2c] mb-4">Property Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#666]">Price</span>
                  <span className="font-semibold text-[#2c2c2c]">{formatPrice(property.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666]">Property Type</span>
                  <span className="font-semibold text-[#2c2c2c] capitalize">{property.propertyType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666]">Bedrooms</span>
                  <span className="font-semibold text-[#2c2c2c]">{property.bedrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666]">Bathrooms</span>
                  <span className="font-semibold text-[#2c2c2c]">{property.bathrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666]">Size</span>
                  <span className="font-semibold text-[#2c2c2c]">{property.size} M²</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666]">Rating</span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-semibold text-[#2c2c2c]">{property.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyPage