// Products Data with Detailed Information for AI Chatbot
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        description: "Premium noise-cancelling headphones with 30-hour battery life",
        price: 2999,
        minPrice: 2400,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
        category: "Electronics",
        details: {
            brand: "SoundMax Pro",
            warranty: "1 year manufacturer warranty",
            delivery: "Free delivery within 3-5 business days",
            features: [
                "Active Noise Cancellation (ANC)",
                "30-hour battery life on single charge",
                "Bluetooth 5.0 connectivity",
                "Premium sound quality with deep bass",
                "Comfortable over-ear design",
                "Built-in microphone for calls",
                "Foldable and portable"
            ],
            specifications: {
                batteryLife: "30 hours",
                chargingTime: "2 hours",
                weight: "250g",
                bluetoothRange: "10 meters",
                driver: "40mm"
            },
            inStock: true,
            rating: 4.5,
            reviews: 234
        }
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        description: "Track your health with heart rate monitor and GPS",
        price: 4499,
        minPrice: 3800,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
        category: "Electronics",
        details: {
            brand: "FitTrack Elite",
            warranty: "1 year manufacturer warranty",
            delivery: "Free delivery within 3-5 business days",
            features: [
                "Heart rate monitoring 24/7",
                "Built-in GPS tracking",
                "Sleep quality analysis",
                "Multiple sports modes",
                "Water resistant up to 50m",
                "Smartphone notifications",
                "7-day battery life"
            ],
            specifications: {
                displaySize: "1.4 inch AMOLED",
                batteryLife: "7 days",
                waterResistance: "5 ATM (50m)",
                compatibility: "iOS and Android",
                sensors: "Heart rate, GPS, Accelerometer, Gyroscope"
            },
            inStock: true,
            rating: 4.7,
            reviews: 456
        }
    },
    {
        id: 3,
        name: "Laptop Backpack",
        description: "Water-resistant backpack with USB charging port",
        price: 1299,
        minPrice: 999,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
        category: "Accessories",
        details: {
            brand: "TravelPro",
            warranty: "6 months warranty",
            delivery: "Free delivery within 3-5 business days",
            features: [
                "Fits laptops up to 15.6 inches",
                "Built-in USB charging port",
                "Water-resistant material",
                "Multiple compartments",
                "Padded shoulder straps",
                "Anti-theft back pocket",
                "Luggage strap"
            ],
            specifications: {
                capacity: "25 liters",
                material: "Polyester",
                dimensions: "45 x 30 x 15 cm",
                weight: "800g",
                laptopSize: "Up to 15.6 inch"
            },
            inStock: true,
            rating: 4.3,
            reviews: 178
        }
    },
    {
        id: 4,
        name: "Mechanical Gaming Keyboard",
        description: "RGB backlit mechanical keyboard with Cherry MX switches",
        price: 3499,
        minPrice: 2900,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop",
        category: "Electronics",
        details: {
            brand: "GameMaster Pro",
            warranty: "2 years warranty",
            delivery: "Free delivery within 3-5 business days",
            features: [
                "Cherry MX mechanical switches",
                "RGB backlighting with multiple effects",
                "Anti-ghosting technology",
                "Programmable macro keys",
                "Detachable USB-C cable",
                "Aluminum frame construction",
                "Dedicated media controls"
            ],
            specifications: {
                switchType: "Cherry MX Red",
                connectivity: "Wired USB-C",
                keycaps: "Double-shot PBT",
                polling: "1000Hz",
                cable: "1.8m braided"
            },
            inStock: true,
            rating: 4.8,
            reviews: 892
        }
    },
    {
        id: 5,
        name: "Portable Power Bank 20000mAh",
        description: "Fast charging power bank with dual USB ports",
        price: 1799,
        minPrice: 1400,
        image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=300&fit=crop",
        category: "Electronics",
        details: {
            brand: "PowerMax",
            warranty: "1 year warranty",
            delivery: "Free delivery within 3-5 business days",
            features: [
                "20000mAh high capacity",
                "Dual USB output ports",
                "Fast charging support",
                "LED battery indicator",
                "Compact and portable",
                "Multiple safety protections",
                "Can charge 2 devices simultaneously"
            ],
            specifications: {
                capacity: "20000mAh",
                input: "5V/2A, 9V/2A",
                output: "5V/2.4A per port",
                weight: "350g",
                dimensions: "14 x 7 x 2 cm"
            },
            inStock: true,
            rating: 4.4,
            reviews: 567
        }
    },
    {
        id: 6,
        name: "HD Webcam 1080p",
        description: "Professional webcam for video calls and streaming",
        price: 2299,
        minPrice: 1800,
        image: "https://images.unsplash.com/photo-1625314897518-bb4fe6e95229?w=400&h=300&fit=crop",
        category: "Electronics",
        details: {
            brand: "StreamPro",
            warranty: "1 year warranty",
            delivery: "Free delivery within 3-5 business days",
            features: [
                "Full HD 1080p resolution",
                "Auto-focus technology",
                "Built-in noise-cancelling microphone",
                "Wide-angle 90° field of view",
                "Plug and play - no drivers needed",
                "Adjustable clip mount",
                "Compatible with all video platforms"
            ],
            specifications: {
                resolution: "1920 x 1080",
                frameRate: "30 fps",
                focusType: "Auto-focus",
                fieldOfView: "90 degrees",
                connectivity: "USB 2.0"
            },
            inStock: true,
            rating: 4.6,
            reviews: 345
        }
    },
    {
        id: 7,
        name: "Wireless Gaming Mouse",
        description: "Ergonomic gaming mouse with adjustable DPI",
        price: 1599,
        minPrice: 1200,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
        category: "Electronics",
        details: {
            brand: "GameClick Pro",
            warranty: "1 year warranty",
            delivery: "Free delivery within 3-5 business days",
            features: [
                "Wireless 2.4GHz connection",
                "Adjustable DPI up to 6400",
                "RGB lighting effects",
                "Ergonomic design for long gaming sessions",
                "6 programmable buttons",
                "Rechargeable battery (30 hours)",
                "Low latency performance"
            ],
            specifications: {
                dpi: "400 - 6400",
                polling: "1000Hz",
                batteryLife: "30 hours",
                weight: "95g",
                connectivity: "Wireless 2.4GHz"
            },
            inStock: true,
            rating: 4.5,
            reviews: 423
        }
    },
    {
        id: 8,
        name: "Bluetooth Speaker",
        description: "Portable waterproof speaker with 360° sound",
        price: 2499,
        minPrice: 1999,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
        category: "Electronics",
        details: {
            brand: "SoundWave 360",
            warranty: "1 year warranty",
            delivery: "Free delivery within 3-5 business days",
            features: [
                "360-degree surround sound",
                "IPX7 waterproof rating",
                "12-hour battery life",
                "Bluetooth 5.0 connectivity",
                "Built-in microphone for calls",
                "Compact and portable",
                "Deep bass enhancement"
            ],
            specifications: {
                batteryLife: "12 hours",
                waterproof: "IPX7",
                bluetoothRange: "10 meters",
                weight: "450g",
                output: "20W"
            },
            inStock: true,
            rating: 4.7,
            reviews: 678
        }
    },
    {
        id: 9,
        name: "USB-C Hub Adapter",
        description: "7-in-1 USB-C hub with HDMI and card reader",
        price: 1899,
        minPrice: 1500,
        image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=300&fit=crop",
        category: "Accessories",
        details: {
            brand: "HubMaster",
            warranty: "1 year warranty",
            delivery: "Free delivery within 3-5 business days",
            features: [
                "7-in-1 multiport adapter",
                "4K HDMI output",
                "3 USB 3.0 ports",
                "SD and microSD card readers",
                "USB-C power delivery",
                "Aluminum alloy construction",
                "Plug and play"
            ],
            specifications: {
                hdmiResolution: "4K @ 30Hz",
                usbSpeed: "USB 3.0 (5Gbps)",
                powerDelivery: "100W",
                compatibility: "MacBook, laptops with USB-C",
                material: "Aluminum"
            },
            inStock: true,
            rating: 4.4,
            reviews: 234
        }
    },
    {
        id: 10,
        name: "Desk Lamp with Wireless Charger",
        description: "LED desk lamp with phone wireless charging base",
        price: 2199,
        minPrice: 1700,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop",
        category: "Home",
        details: {
            brand: "BrightDesk",
            warranty: "1 year warranty",
            delivery: "Free delivery within 3-5 business days",
            features: [
                "LED lamp with adjustable brightness",
                "Built-in wireless charging pad",
                "Touch controls",
                "3 color temperature modes",
                "Flexible gooseneck design",
                "USB output port",
                "Eye-care technology"
            ],
            specifications: {
                brightness: "5 levels",
                colorTemp: "3000K - 6000K",
                wirelessCharging: "10W fast charge",
                powerSource: "AC adapter",
                dimensions: "45cm height"
            },
            inStock: true,
            rating: 4.6,
            reviews: 189
        }
    },
    {
        id: 11,
        name: "Phone Tripod Stand",
        description: "Flexible tripod for smartphones with remote control",
        price: 899,
        minPrice: 650,
        image: "https://images.unsplash.com/photo-1606016159991-7f0c3c89c46c?w=400&h=300&fit=crop",
        category: "Accessories",
        details: {
            brand: "FlexiStand",
            warranty: "6 months warranty",
            delivery: "Free delivery within 3-5 business days",
            features: [
                "Flexible octopus legs",
                "360-degree rotation",
                "Bluetooth remote control",
                "Universal phone holder",
                "Lightweight and portable",
                "Non-slip rubber feet",
                "Adjustable height"
            ],
            specifications: {
                maxLoad: "1kg",
                height: "Adjustable up to 30cm",
                phoneWidth: "5.5 - 8.5 cm",
                remoteRange: "10 meters",
                weight: "200g"
            },
            inStock: true,
            rating: 4.2,
            reviews: 456
        }
    },
    {
        id: 12,
        name: "Gaming Headset",
        description: "Surround sound headset with noise-canceling mic",
        price: 3199,
        minPrice: 2600,
        image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=300&fit=crop",
        category: "Electronics",
        details: {
            brand: "GameSound Pro",
            warranty: "2 years warranty",
            delivery: "Free delivery within 3-5 business days",
            features: [
                "7.1 surround sound",
                "Noise-canceling microphone",
                "RGB lighting effects",
                "Memory foam ear cushions",
                "Detachable microphone",
                "Compatible with PC, PS5, Xbox",
                "In-line volume control"
            ],
            specifications: {
                driver: "50mm",
                frequency: "20Hz - 20kHz",
                impedance: "32 Ohm",
                cableLength: "2m braided",
                connectivity: "3.5mm jack + USB"
            },
            inStock: true,
            rating: 4.7,
            reviews: 789
        }
    },
    {
        id: 13,
        name: "Laptop Cooling Pad",
        description: "RGB cooling pad with 6 quiet fans",
        price: 1499,
        minPrice: 1100,
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=300&fit=crop",
        category: "Accessories",
        details: {
            brand: "CoolMaster",
            warranty: "1 year warranty",
            delivery: "Free delivery within 3-5 business days",
            features: [
                "6 ultra-quiet cooling fans",
                "RGB lighting with multiple modes",
                "Dual USB ports",
                "Adjustable height settings",
                "Fits laptops up to 17 inches",
                "Metal mesh surface",
                "Non-slip design"
            ],
            specifications: {
                fans: "6 x 70mm",
                noiseLevel: "26dB",
                fanSpeed: "1200 RPM",
                laptopSize: "Up to 17 inch",
                power: "USB powered"
            },
            inStock: true,
            rating: 4.3,
            reviews: 312
        }
    },
    {
        id: 14,
        name: "Smart LED Light Bulb",
        description: "WiFi-enabled color-changing smart bulb",
        price: 799,
        minPrice: 600,
        image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=300&fit=crop",
        category: "Home",
        details: {
            brand: "SmartGlow",
            warranty: "1 year warranty",
            delivery: "Free delivery within 3-5 business days",
            features: [
                "16 million color options",
                "WiFi connectivity (no hub needed)",
                "Voice control (Alexa, Google)",
                "Adjustable brightness",
                "Schedule and timer functions",
                "Energy efficient",
                "Group control multiple bulbs"
            ],
            specifications: {
                wattage: "9W (60W equivalent)",
                lumens: "800 lumens",
                lifespan: "25000 hours",
                baseType: "E27",
                voltage: "220-240V"
            },
            inStock: true,
            rating: 4.5,
            reviews: 534
        }
    },
    {
        id: 15,
        name: "External SSD 1TB",
        description: "Ultra-fast portable SSD with USB 3.2",
        price: 5499,
        minPrice: 4800,
        image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop",
        category: "Electronics",
        details: {
            brand: "SpeedDrive Pro",
            warranty: "3 years warranty",
            delivery: "Free delivery within 3-5 business days",
            features: [
                "1TB storage capacity",
                "USB 3.2 Gen 2 interface",
                "Read speeds up to 1050MB/s",
                "Write speeds up to 1000MB/s",
                "Shock-resistant design",
                "Compact and lightweight",
                "Password protection"
            ],
            specifications: {
                capacity: "1TB",
                interface: "USB 3.2 Gen 2",
                readSpeed: "1050 MB/s",
                writeSpeed: "1000 MB/s",
                dimensions: "10 x 6 x 1 cm",
                weight: "50g"
            },
            inStock: true,
            rating: 4.8,
            reviews: 923
        }
    },
    {
        id: 16,
        name: "Wireless Earbuds",
        description: "True wireless earbuds with charging case",
        price: 1999,
        minPrice: 1500,
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop",
        category: "Electronics",
        details: {
            brand: "AudioPods Pro",
            warranty: "1 year warranty",
            delivery: "Free delivery within 3-5 business days",
            features: [
                "True wireless design",
                "Active noise cancellation",
                "6 hours playback (24h with case)",
                "IPX4 water resistance",
                "Touch controls",
                "Quick charge support",
                "Crystal clear calls"
            ],
            specifications: {
                batteryLife: "6 hours (earbuds), 24 hours (with case)",
                chargingTime: "1.5 hours",
                bluetoothVersion: "5.0",
                waterResistance: "IPX4",
                weight: "4g per earbud"
            },
            inStock: true,
            rating: 4.6,
            reviews: 678
        }
    },
    {
        id: 17,
        name: "Phone Camera Lens Kit",
        description: "3-in-1 lens kit: Wide, Macro, and Fisheye",
        price: 1199,
        minPrice: 900,
        image: "https://images.unsplash.com/photo-1606229365485-93a3b8ee0385?w=400&h=300&fit=crop",
        category: "Accessories",
        details: {
            brand: "LensMax",
            warranty: "6 months warranty",
            delivery: "Free delivery within 3-5 business days",
            features: [
                "3 professional lenses included",
                "Wide-angle lens (0.6x)",
                "Macro lens (15x)",
                "Fisheye lens (198°)",
                "Universal clip design",
                "Portable carrying case",
                "Compatible with most phones"
            ],
            specifications: {
                wideAngle: "0.6x magnification",
                macro: "15x magnification",
                fisheye: "198 degree",
                material: "Optical glass",
                compatibility: "Universal"
            },
            inStock: true,
            rating: 4.4,
            reviews: 289
        }
    },
    {
        id: 18,
        name: "Digital Drawing Tablet",
        description: "Graphics tablet with pressure-sensitive pen",
        price: 4999,
        minPrice: 4200,
        image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=300&fit=crop",
        category: "Electronics",
        details: {
            brand: "ArtPro Master",
            warranty: "2 years warranty",
            delivery: "Free delivery within 3-5 business days",
            features: [
                "10 x 6 inch drawing area",
                "8192 pressure sensitivity levels",
                "Battery-free stylus pen",
                "8 customizable shortcut keys",
                "Compatible with major software",
                "Tilt recognition",
                "Lightweight and portable"
            ],
            specifications: {
                activeArea: "10 x 6 inches",
                pressureLevels: "8192",
                resolution: "5080 LPI",
                compatibility: "Windows, Mac, Linux",
                connectivity: "USB"
            },
            inStock: true,
            rating: 4.7,
            reviews: 445
        }
    },
    {
        id: 19,
        name: "Car Phone Mount",
        description: "Magnetic dashboard phone holder for cars",
        price: 599,
        minPrice: 400,
        image: "https://images.unsplash.com/photo-1519368358672-25b03afee3bf?w=400&h=300&fit=crop",
        category: "Accessories",
        details: {
            brand: "CarGrip",
            warranty: "6 months warranty",
            delivery: "Free delivery within 3-5 business days",
            features: [
                "Strong magnetic hold",
                "360-degree rotation",
                "Dashboard or windshield mount",
                "One-hand operation",
                "Universal compatibility",
                "Compact design",
                "Doesn't block view"
            ],
            specifications: {
                mountType: "Magnetic",
                compatibility: "Universal (all phones)",
                rotation: "360 degrees",
                material: "ABS + Aluminum",
                weight: "80g"
            },
            inStock: true,
            rating: 4.3,
            reviews: 567
        }
    },
    {
        id: 20,
        name: "Monitor Screen Bar Light",
        description: "Auto-dimming monitor light bar for eye comfort",
        price: 3299,
        minPrice: 2700,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop",
        category: "Accessories",
        details: {
            brand: "EyeCare Pro",
            warranty: "1 year warranty",
            delivery: "Free delivery within 3-5 business days",
            features: [
                "Auto-dimming ambient sensor",
                "Asymmetric light design",
                "Touch controls",
                "3 color temperature modes",
                "USB powered",
                "Space-saving design",
                "Reduces eye strain"
            ],
            specifications: {
                brightness: "5 levels",
                colorTemp: "2700K - 6500K",
                power: "5W",
                dimensions: "45cm length",
                compatibility: "Monitors with flat top edge"
            },
            inStock: true,
            rating: 4.8,
            reviews: 234
        }
    }
];

// Product Knowledge Base for Pre-purchase Questions
const productKnowledge = {
    warranty: "All our products come with a manufacturer warranty (varies by product).",
    delivery: "We offer free delivery within 3-5 business days for all products.",
    return: "You can return any product within 30 days if you're not satisfied.",
    payment: "We accept all major credit cards, debit cards, UPI, and cash on delivery.",
    quality: "All products are 100% authentic and quality-checked before dispatch.",
    shipping: "We ship across India. International shipping is available for selected products.",
    support: "24/7 customer support is available via phone, email, and chat.",
    installation: "Installation guides are provided. Technical support available if needed."
};
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        description: "Premium noise-cancelling headphones with 30-hour battery life",
        price: 2999,
        minPrice: 2400,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
        category: "Electronics"
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        description: "Track your health with heart rate monitor and GPS",
        price: 4499,
        minPrice: 3800,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
        category: "Electronics"
    },
    {
        id: 3,
        name: "Laptop Backpack",
        description: "Water-resistant backpack with USB charging port",
        price: 1299,
        minPrice: 999,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
        category: "Accessories"
    },
    {
        id: 4,
        name: "Mechanical Gaming Keyboard",
        description: "RGB backlit mechanical keyboard with Cherry MX switches",
        price: 3499,
        minPrice: 2900,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop",
        category: "Electronics"
    },
    {
        id: 5,
        name: "Portable Power Bank 20000mAh",
        description: "Fast charging power bank with dual USB ports",
        price: 1799,
        minPrice: 1400,
        image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=300&fit=crop",
        category: "Electronics"
    },
    {
        id: 6,
        name: "HD Webcam 1080p",
        description: "Professional webcam for video calls and streaming",
        price: 2299,
        minPrice: 1800,
        image: "https://images.unsplash.com/photo-1625314897518-bb4fe6e95229?w=400&h=300&fit=crop",
        category: "Electronics"
    },
    {
        id: 7,
        name: "Wireless Gaming Mouse",
        description: "Ergonomic gaming mouse with adjustable DPI",
        price: 1599,
        minPrice: 1200,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
        category: "Electronics"
    },
    {
        id: 8,
        name: "Bluetooth Speaker",
        description: "Portable waterproof speaker with 360° sound",
        price: 2499,
        minPrice: 1999,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
        category: "Electronics"
    },
    {
        id: 9,
        name: "USB-C Hub Adapter",
        description: "7-in-1 USB-C hub with HDMI and card reader",
        price: 1899,
        minPrice: 1500,
        image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=300&fit=crop",
        category: "Accessories"
    },
    {
        id: 10,
        name: "Desk Lamp with Wireless Charger",
        description: "LED desk lamp with phone wireless charging base",
        price: 2199,
        minPrice: 1700,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop",
        category: "Home"
    },
    {
        id: 11,
        name: "Phone Tripod Stand",
        description: "Flexible tripod for smartphones with remote control",
        price: 899,
        minPrice: 650,
        image: "https://images.unsplash.com/photo-1606016159991-7f0c3c89c46c?w=400&h=300&fit=crop",
        category: "Accessories"
    },
    {
        id: 12,
        name: "Gaming Headset",
        description: "Surround sound headset with noise-canceling mic",
        price: 3199,
        minPrice: 2600,
        image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=300&fit=crop",
        category: "Electronics"
    },
    {
        id: 13,
        name: "Laptop Cooling Pad",
        description: "RGB cooling pad with 6 quiet fans",
        price: 1499,
        minPrice: 1100,
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=300&fit=crop",
        category: "Accessories"
    },
    {
        id: 14,
        name: "Smart LED Light Bulb",
        description: "WiFi-enabled color-changing smart bulb",
        price: 799,
        minPrice: 600,
        image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=300&fit=crop",
        category: "Home"
    },
    {
        id: 15,
        name: "External SSD 1TB",
        description: "Ultra-fast portable SSD with USB 3.2",
        price: 5499,
        minPrice: 4800,
        image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop",
        category: "Electronics"
    },
    {
        id: 16,
        name: "Wireless Earbuds",
        description: "True wireless earbuds with charging case",
        price: 1999,
        minPrice: 1500,
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop",
        category: "Electronics"
    },
    {
        id: 17,
        name: "Phone Camera Lens Kit",
        description: "3-in-1 lens kit: Wide, Macro, and Fisheye",
        price: 1199,
        minPrice: 900,
        image: "https://images.unsplash.com/photo-1606229365485-93a3b8ee0385?w=400&h=300&fit=crop",
        category: "Accessories"
    },
    {
        id: 18,
        name: "Digital Drawing Tablet",
        description: "Graphics tablet with pressure-sensitive pen",
        price: 4999,
        minPrice: 4200,
        image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=300&fit=crop",
        category: "Electronics"
    },
    {
        id: 19,
        name: "Car Phone Mount",
        description: "Magnetic dashboard phone holder for cars",
        price: 599,
        minPrice: 400,
        image: "https://images.unsplash.com/photo-1519368358672-25b03afee3bf?w=400&h=300&fit=crop",
        category: "Accessories"
    },
    {
        id: 20,
        name: "Monitor Screen Bar Light",
        description: "Auto-dimming monitor light bar for eye comfort",
        price: 3299,
        minPrice: 2700,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop",
        category: "Accessories"
    }
];

// Product Knowledge Base for Pre-purchase Questions
const productKnowledge = {
    warranty: "All our products come with a 1-year manufacturer warranty.",
    delivery: "We offer free delivery within 3-5 business days for all products.",
    return: "You can return any product within 30 days if you're not satisfied.",
    payment: "We accept all major credit cards, debit cards, UPI, and cash on delivery.",
    quality: "All products are 100% authentic and quality-checked before dispatch.",
    shipping: "We ship across India. International shipping is available for selected products.",
    support: "24/7 customer support is available via phone, email, and chat.",
    installation: "Installation guides are provided. Technical support available if needed."
};
