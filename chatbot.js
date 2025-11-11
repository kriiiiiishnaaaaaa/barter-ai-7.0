// Barter AI Chatbot - Intelligent Product Assistant
// This chatbot understands user questions and provides relevant answers

class BarterChatbot {
    constructor() {
        this.currentProduct = null;
        this.conversationContext = {
            askedAboutWarranty: false,
            askedAboutDelivery: false,
            askedAboutFeatures: false,
            negotiationStarted: false,
            userOffers: []
        };
    }

    // Main function to process user messages
    processMessage(message, product) {
        this.currentProduct = product;
        const lowerMessage = message.toLowerCase().trim();

        // Check if it's a price offer
        const priceOffer = this.extractPrice(message);
        if (priceOffer && this.conversationContext.negotiationStarted) {
            return this.handlePriceNegotiation(priceOffer);
        }

        // Detect intent of the message
        const intent = this.detectIntent(lowerMessage);

        switch (intent) {
            case 'greeting':
                return this.handleGreeting();
            
            case 'product_info':
                return this.handleProductInfo(lowerMessage);
            
            case 'features':
                return this.handleFeatures(lowerMessage);
            
            case 'specifications':
                return this.handleSpecifications(lowerMessage);
            
            case 'warranty':
                this.conversationContext.askedAboutWarranty = true;
                return this.handleWarranty();
            
            case 'delivery':
                this.conversationContext.askedAboutDelivery = true;
                return this.handleDelivery();
            
            case 'price_query':
                return this.handlePriceQuery();
            
            case 'availability':
                return this.handleAvailability();
            
            case 'comparison':
                return this.handleComparison(lowerMessage);
            
            case 'negotiate_start':
                this.conversationContext.negotiationStarted = true;
                return this.startNegotiation();
            
            case 'return_policy':
                return this.handleReturnPolicy();
            
            case 'payment':
                return this.handlePayment();
            
            case 'brand':
                return this.handleBrand();
            
            case 'rating':
                return this.handleRating();
            
            case 'thank_you':
                return "You're welcome! Feel free to ask anything else about this product. 😊";
            
            case 'bye':
                return "Thanks for chatting! Come back anytime you need help. 👋";
            
            default:
                return this.handleUnknown(lowerMessage);
        }
    }

    // Detect user intent from message
    detectIntent(message) {
        // Greeting
        if (/^(hi|hello|hey|good morning|good evening|namaste)/.test(message)) {
            return 'greeting';
        }

        // Product information
        if (/tell me (about|more)|what is|describe|explain|info|information|details/.test(message)) {
            return 'product_info';
        }

        // Features
        if (/features|what (can|does) it|capabilities|functions|what it (has|does)/.test(message)) {
            return 'features';
        }

        // Specifications
        if (/spec|specification|technical|battery|size|weight|dimension|resolution/.test(message)) {
            return 'specifications';
        }

        // Warranty
        if (/warranty|guarantee|coverage/.test(message)) {
            return 'warranty';
        }

        // Delivery
        if (/delivery|shipping|ship|how long|when will|arrive|receive/.test(message)) {
            return 'delivery';
        }

        // Price
        if (/price|cost|how much|expensive|cheap|afford/.test(message) && !/negotiate|deal|bargain/.test(message)) {
            return 'price_query';
        }

        // Availability
        if (/available|in stock|stock|buy now|purchase/.test(message)) {
            return 'availability';
        }

        // Comparison
        if (/compare|vs|versus|difference|better|which one/.test(message)) {
            return 'comparison';
        }

        // Start negotiation
        if (/negotiate|deal|bargain|discount|lower price|best price|can you reduce/.test(message)) {
            return 'negotiate_start';
        }

        // Return policy
        if (/return|refund|exchange|money back/.test(message)) {
            return 'return_policy';
        }

        // Payment
        if (/payment|pay|cash|card|upi|cod/.test(message)) {
            return 'payment';
        }

        // Brand
        if (/brand|company|manufacturer|who makes/.test(message)) {
            return 'brand';
        }

        // Rating
        if (/rating|review|star|customer|feedback/.test(message)) {
            return 'rating';
        }

        // Thank you
        if (/thank|thanks|appreciate/.test(message)) {
            return 'thank_you';
        }

        // Bye
        if (/bye|goodbye|see you|talk later/.test(message)) {
            return 'bye';
        }

        return 'unknown';
    }

    // Extract price from message
    extractPrice(message) {
        const priceMatch = message.match(/\d+/);
        return priceMatch ? parseInt(priceMatch[0]) : null;
    }

    // Handle greeting
    handleGreeting() {
        const greetings = [
            `Hello! 👋 I'm Barter, your AI shopping assistant. I'm here to help you with the ${this.currentProduct.name}.`,
            `Hi there! 🤖 Welcome! I'd love to help you learn more about the ${this.currentProduct.name}.`,
            `Hey! 😊 Great to see you! Let me tell you about this amazing ${this.currentProduct.name}.`
        ];
        return this.randomChoice(greetings);
    }

    // Handle product information
    handleProductInfo(message) {
        const product = this.currentProduct;
        const response = `The ${product.name} is a ${product.category.toLowerCase()} item from ${product.details.brand}. 

${product.description}

**Key Highlights:**
${product.details.features.slice(0, 3).map(f => `• ${f}`).join('\n')}

The current price is ₹${product.price}. ${product.details.inStock ? '✅ In stock and ready to ship!' : '❌ Currently out of stock'}

Would you like to know about specific features, specifications, or start negotiating the price?`;
        
        return response;
    }

    // Handle features query
    handleFeatures(message) {
        const product = this.currentProduct;
        
        // Check if asking about specific feature
        if (message.includes('battery') || message.includes('power')) {
            const batteryFeature = product.details.features.find(f => 
                f.toLowerCase().includes('battery') || f.toLowerCase().includes('hour')
            );
            if (batteryFeature) {
                return `Battery/Power: ${batteryFeature}\n\n${product.details.specifications.batteryLife ? `Specifications: ${product.details.specifications.batteryLife}` : ''}`;
            }
        }

        // General features
        const response = `Here are all the amazing features of the ${product.name}:

${product.details.features.map((f, i) => `${i + 1}. ${f}`).join('\n')}

These features make it perfect for ${product.category === 'Electronics' ? 'tech enthusiasts' : product.category === 'Accessories' ? 'daily use' : 'home comfort'}! 

Want to know more about any specific feature?`;
        
        return response;
    }

    // Handle specifications query
    handleSpecifications(message) {
        const product = this.currentProduct;
        const specs = product.details.specifications;
        
        let response = `📋 **Technical Specifications for ${product.name}:**\n\n`;
        
        for (const [key, value] of Object.entries(specs)) {
            const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            response += `**${formattedKey}:** ${value}\n`;
        }
        
        response += `\nThese specs ensure top-notch performance and reliability!`;
        return response;
    }

    // Handle warranty query
    handleWarranty() {
        const product = this.currentProduct;
        return `✅ **Warranty Information:**

${product.details.warranty}

This ensures you're protected against manufacturing defects. We also offer extended warranty options at checkout if you'd like extra peace of mind!`;
    }

    // Handle delivery query
    handleDelivery() {
        const product = this.currentProduct;
        return `🚚 **Delivery Details:**

${product.details.delivery}

We partner with trusted courier services to ensure your ${product.name} arrives safely. You'll receive tracking information once your order ships!

Orders placed before 2 PM are processed the same day. 📦`;
    }

    // Handle price query
    handlePriceQuery() {
        const product = this.currentProduct;
        return `💰 **Pricing Information:**

Listed Price: ₹${product.price}
Rating: ${product.details.rating}⭐ (${product.details.reviews} reviews)

But here's the exciting part - you don't have to pay the full price! 🎉

Would you like to negotiate for a better deal? I'm authorized to offer discounts, and I love a good negotiation! Just say "let's negotiate" or make me an offer.`;
    }

    // Handle availability query
    handleAvailability() {
        const product = this.currentProduct;
        
        if (product.details.inStock) {
            return `✅ Great news! The ${product.name} is **IN STOCK** and ready to ship!

We currently have multiple units available. Once you place your order, we'll process it within 24 hours and ship it out.

Ready to make a purchase or would you like to negotiate the price first?`;
        } else {
            return `❌ Sorry, the ${product.name} is currently **OUT OF STOCK**.

However, we're expecting new stock within 7-10 days. Would you like me to notify you when it becomes available? I can also suggest similar products that are in stock right now.`;
        }
    }

    // Handle comparison query
    handleComparison(message) {
        const product = this.currentProduct;
        return `This ${product.name} stands out because:

**Unique Advantages:**
${product.details.features.slice(0, 4).map((f, i) => `${i + 1}. ${f}`).join('\n')}

**Why customers love it:**
• Rated ${product.details.rating}⭐ with ${product.details.reviews} reviews
• From trusted brand: ${product.details.brand}
• ${product.details.warranty}

If you'd like me to compare it with a specific product, please let me know which one! Otherwise, I can assure you this is an excellent choice in its category.`;
    }

    // Start negotiation
    startNegotiation() {
        this.conversationContext.negotiationStarted = true;
        const product = this.currentProduct;
        
        return `🎯 Excellent! I love negotiating! 

The listed price for this ${product.name} is ₹${product.price}.

Here's how this works:
• Make me an offer (any amount you think is fair)
• I'll evaluate it based on the product value
• We'll work together to find a price that works for both of us

The best part? You could save up to 20% through our negotiation! 💰

So, what price would you like to offer? Just type a number!`;
    }

    // Handle price negotiation
    handlePriceNegotiation(offeredPrice) {
        const product = this.currentProduct;
        const originalPrice = product.price;
        const minPrice = product.minPrice;
        this.conversationContext.userOffers.push(offeredPrice);
        
        const discountPercent = Math.round(((originalPrice - offeredPrice) / originalPrice) * 100);
        
        // Offer is below minimum
        if (offeredPrice < minPrice) {
            return `I appreciate your offer of ₹${offeredPrice}, but that's unfortunately below our cost price. 😅

The absolute lowest I can go for this quality ${product.name} is ₹${minPrice}. That's already a ${Math.round(((originalPrice - minPrice) / originalPrice) * 100)}% discount!

At ₹${minPrice}, you're getting:
${product.details.features.slice(0, 3).map(f => `• ${f}`).join('\n')}

What do you say? It's a fantastic deal! Or would you like to offer something between ₹${minPrice} and ₹${originalPrice}?`;
        }
        
        // Offer in negotiation range (80-85% of original)
        else if (offeredPrice >= minPrice && offeredPrice < originalPrice * 0.85) {
            const counterOffer = Math.floor(offeredPrice + ((originalPrice - minPrice) * 0.15));
            return `₹${offeredPrice} is a good starting point! 🤔

I can see you're serious about this ${product.name}. Let me make you a counter-offer: ₹${counterOffer}.

That's still ${Math.round(((originalPrice - counterOffer) / originalPrice) * 100)}% off the original price! You'd be saving ₹${originalPrice - counterOffer}!

At this price, you're getting exceptional value for a product with ${product.details.rating}⭐ rating. What do you think?`;
        }
        
        // Good offer (85-95% range)
        else if (offeredPrice >= originalPrice * 0.85 && offeredPrice < originalPrice * 0.95) {
            return `🎉 Deal! I accept your offer of ₹${offeredPrice}!

You're getting an amazing ${product.name} and saving ₹${originalPrice - offeredPrice} (${discountPercent}% discount)!

This includes:
• ${product.details.warranty}
• ${product.details.delivery}
• All the amazing features we discussed

Type "buy now" or click the purchase button to complete your order! You've made a smart choice! 🛍️`;
        }
        
        // Near full price (95%+)
        else {
            return `✅ Perfect! I'm happy to accept ₹${offeredPrice}!

You're getting a premium ${product.name} from ${product.details.brand} with:
${product.details.features.slice(0, 2).map(f => `• ${f}`).join('\n')}

You're still saving ₹${originalPrice - offeredPrice}! Ready to proceed with the purchase? 🎁`;
        }
    }

    // Handle return policy
    handleReturnPolicy() {
        return `📦 **Return & Refund Policy:**

• **30-Day Return Window:** You can return any product within 30 days of delivery
• **Full Refund:** Get 100% refund if product is unused and in original packaging
• **Easy Process:** Just contact our support team to initiate a return
• **Free Return Pickup:** We'll arrange pickup at no extra cost

We want you to be completely satisfied with your purchase! If there's any issue, we're here to help. 😊`;
    }

    // Handle payment query
    handlePayment() {
        return `💳 **Payment Options:**

We accept multiple payment methods:
• **Credit Cards:** Visa, Mastercard, American Express
• **Debit Cards:** All major banks
• **UPI:** Google Pay, PhonePe, Paytm, etc.
• **Net Banking:** All major banks
• **Cash on Delivery (COD):** Available for most locations
• **Wallets:** Paytm, Amazon Pay, PhonePe

All payments are secure and encrypted. Choose the method that's most convenient for you! 🔒`;
    }

    // Handle brand query
    handleBrand() {
        const product = this.currentProduct;
        return `🏷️ **Brand Information:**

This ${product.name} is manufactured by **${product.details.brand}** - a trusted name in ${product.category}.

${product.details.brand} is known for:
• Quality products with great customer satisfaction
• Reliable after-sales service
• Innovation and latest technology

With ${product.details.reviews} customer reviews and a ${product.details.rating}⭐ rating, you can trust this brand!`;
    }

    // Handle rating query
    handleRating() {
        const product = this.currentProduct;
        return `⭐ **Customer Reviews & Ratings:**

**Overall Rating:** ${product.details.rating}/5 stars
**Total Reviews:** ${product.details.reviews} verified customers

**Why customers love it:**
${product.details.features.slice(0, 3).map((f, i) => `${i + 1}. ${f}`).join('\n')}

Real customers have rated this product highly for its quality, performance, and value for money. You're making a great choice! 

Would you like to see the product features in detail or start negotiating the price?`;
    }

    // Handle unknown queries
    handleUnknown(message) {
        // Try to find if they're asking about a specific feature
        const product = this.currentProduct;
        
        // Search in features
        for (const feature of product.details.features) {
            if (message.includes(feature.toLowerCase().substring(0, 10))) {
                return `Regarding that feature: ${feature}\n\nYes, the ${product.name} has this capability! Would you like to know more about other features?`;
            }
        }
        
        // Search in specifications
        for (const [key, value] of Object.entries(product.details.specifications)) {
            if (message.includes(key.toLowerCase())) {
                return `About ${key}: ${value}\n\nIs there anything else you'd like to know about the specifications?`;
            }
        }
        
        // General fallback
        return `I'm sorry, I didn't quite understand that specific question. 😅

But I'm here to help! Here's what I can tell you about:

📱 Product details & features
📋 Technical specifications
💰 Pricing & negotiation
🚚 Delivery information
✅ Warranty & returns
⭐ Customer reviews

Just ask me anything about these topics, or say "negotiate" if you want to get a better price!`;
    }

    // Helper function to get random choice
    randomChoice(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    // Reset conversation context
    resetContext() {
        this.conversationContext = {
            askedAboutWarranty: false,
            askedAboutDelivery: false,
            askedAboutFeatures: false,
            negotiationStarted: false,
            userOffers: []
        };
    }
}

// Export for use in script.js
const barterBot = new BarterChatbot();
