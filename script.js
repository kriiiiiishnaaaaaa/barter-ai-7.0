// Global Variables
let currentProduct = null;
let negotiationStarted = false;
let chatHistory = [];
let negotiatedPrice = null;
let dealFinalized = false;
let currentCategory = 'all';

// Typing animation texts
const typingTexts = ['Chat.', 'Negotiate.', 'Buy.', 'Save Money.', 'Shop Smart.'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedProducts();
    loadProducts();
    startTypingAnimation();
});

// Typing Animation
function startTypingAnimation() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;
    
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typingSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentText.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typingSpeed = 500;
    }
    
    setTimeout(startTypingAnimation, typingSpeed);
}

// Load Featured Products (first 8 products)
function loadFeaturedProducts() {
    const featuredGrid = document.getElementById('featuredGrid');
    if (!featuredGrid) return;
    
    const featuredProducts = products.slice(0, 8);
    featuredGrid.innerHTML = '';
    
    featuredProducts.forEach(product => {
        const productCard = createProductCard(product);
        featuredGrid.appendChild(productCard);
    });
}

// Load and display all products
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card HTML
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image" 
             onerror="this.src='https://via.placeholder.com/400x300?text=${encodeURIComponent(product.name)}'">
        <div class="product-details">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">₹${product.price}</div>
            <div class="product-meta">
                <span class="product-rating">⭐ ${product.details.rating}</span>
                <span class="product-reviews">${product.details.reviews} reviews</span>
            </div>
            <div class="product-actions">
                <button class="purchase-btn" onclick="purchaseProduct(${product.id}, ${product.price})">
                    🛒 Purchase
                </button>
                <button class="negotiate-btn" onclick="startNegotiation(${product.id})">
                    💬 Negotiate
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Scroll to sections
function scrollToProducts() {
    const element = document.getElementById('home');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToAllProducts() {
    const element = document.getElementById('categories');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function openChatbotDemo() {
    // Open chat with first product as demo
    if (products && products.length > 0) {
        startNegotiation(1);
    }
}

// Filter products by category
function filterByCategory(category) {
    currentCategory = category;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Filter and display products
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    const filtered = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);
    
    if (filtered.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 50px; color: var(--gray);">
                <h3>No products found</h3>
                <p>Try a different category</p>
            </div>
        `;
        return;
    }
    
    filtered.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Filter products by search
function filterProducts() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    let filtered = currentCategory === 'all' 
        ? products 
        : products.filter(p => p.category === currentCategory);
    
    if (searchTerm) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm) ||
            p.details.brand.toLowerCase().includes(searchTerm) ||
            p.details.features.some(f => f.toLowerCase().includes(searchTerm))
        );
    }
    
    if (filtered.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 50px; color: var(--gray);">
                <h3>No products found</h3>
                <p>Try a different search term or category</p>
            </div>
        `;
        return;
    }
    
    filtered.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Start negotiation with a product
function startNegotiation(productId) {
    currentProduct = products.find(p => p.id === productId);
    if (!currentProduct) {
        console.error('Product not found:', productId);
        return;
    }
    
    negotiationStarted = false;
    chatHistory = [];
    negotiatedPrice = null;
    dealFinalized = false;
    
    // Reset chatbot context
    barterBot.resetContext();
    
    // Display chat modal
    const chatModal = document.getElementById('chatModal');
    if (chatModal) {
        chatModal.style.display = 'block';
    }
    
    // Display product info
    displayProductInfo();
    
    // Clear previous messages
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        chatMessages.innerHTML = '';
    }
    
    const summaryDiv = document.getElementById('negotiationSummary');
    if (summaryDiv) {
        summaryDiv.style.display = 'none';
    }
    
    // Send initial greeting using AI chatbot
    setTimeout(() => {
        const greeting = `Hi there! I'm Barter 🤖. I see you're interested in the ${currentProduct.name}. 

This is a ${currentProduct.category} product from ${currentProduct.details.brand}, priced at ₹${currentProduct.price}.

I can help you with:
• Product features and specifications
• Warranty and delivery info
• Price negotiation

What would you like to know? Or type a price to start negotiating!`;
        
        addBotMessage(greeting);
    }, 500);
}

// Display product info in chat header
function displayProductInfo() {
    const productInfo = document.getElementById('chatProductInfo');
    if (!productInfo || !currentProduct) return;
    
    productInfo.innerHTML = `
        <img src="${currentProduct.image}" alt="${currentProduct.name}"
             onerror="this.src='https://via.placeholder.com/60x60?text=Product'">
        <div class="product-info-text">
            <h4>${currentProduct.name}</h4>
            <div class="price">₹${currentProduct.price}</div>
            <div class="rating">⭐ ${currentProduct.details.rating} (${currentProduct.details.reviews} reviews)</div>
        </div>
    `;
}

// Handle key press in input field
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Send user message
function sendMessage() {
    const input = document.getElementById('userInput');
    if (!input) return;
    
    const message = input.value.trim();
    
    if (message === '' || dealFinalized || !currentProduct) return;
    
    // Add user message to chat
    addUserMessage(message);
    input.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Process message and respond using AI chatbot
    setTimeout(() => {
        removeTypingIndicator();
        
        // Get response from AI chatbot
        const botResponse = barterBot.processMessage(message, currentProduct);
        addBotMessage(botResponse);
        
        // Check if user accepted a price
        if (botResponse.includes('Deal!') || botResponse.includes('I accept')) {
            const priceMatch = message.match(/\d+/);
            if (priceMatch) {
                negotiatedPrice = parseInt(priceMatch[0]);
                setTimeout(() => {
                    finalizeDeal();
                }, 2000);
            }
        }
        
    }, 1000 + Math.random() * 1000);
}

// Add user message to chat
function addUserMessage(message) {
    chatHistory.push({ role: 'user', message: message, time: getCurrentTime() });
    
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user';
    messageDiv.innerHTML = `
        <div class="message-content">
            <div>${escapeHtml(message)}</div>
            <div class="message-time">${getCurrentTime()}</div>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add bot message to chat (supports markdown-style formatting)
function addBotMessage(message) {
    chatHistory.push({ role: 'bot', message: message, time: getCurrentTime() });
    
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    // Format the message (handle bold, line breaks, etc.)
    let formattedMessage = escapeHtml(message);
    formattedMessage = formattedMessage.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formattedMessage = formattedMessage.replace(/\n/g, '<br>');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot';
    messageDiv.innerHTML = `
        <div class="message-content">
            <div>${formattedMessage}</div>
            <div class="message-time">${getCurrentTime()}</div>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Show typing indicator
function showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="message-content">
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Finalize the deal
function finalizeDeal() {
    if (!currentProduct || !negotiatedPrice) return;
    
    dealFinalized = true;
    const originalPrice = currentProduct.price;
    const discountAmount = originalPrice - negotiatedPrice;
    const discountPercent = Math.round((discountAmount / originalPrice) * 100);
    
    addBotMessage(`🎉 Awesome! Deal finalized at ₹${negotiatedPrice}! You saved ₹${discountAmount} (${discountPercent}% off)!`);
    
    // Show negotiation summary
    setTimeout(() => {
        displayNegotiationSummary(originalPrice, negotiatedPrice, discountAmount, discountPercent);
    }, 1000);
}

// Display negotiation summary
function displayNegotiationSummary(originalPrice, finalPrice, savedAmount, discountPercent) {
    const summaryDiv = document.getElementById('negotiationSummary');
    if (!summaryDiv) return;
    
    summaryDiv.innerHTML = `
        <h3>📊 Negotiation Summary</h3>
        <div class="summary-item">
            <span class="label">Original Price:</span>
            <span class="value">₹${originalPrice}</span>
        </div>
        <div class="summary-item">
            <span class="label">Negotiated Price:</span>
            <span class="value">₹${finalPrice}</span>
        </div>
        <div class="summary-item">
            <span class="label">You Saved:</span>
            <span class="value discount-badge">₹${savedAmount}</span>
        </div>
        <div class="summary-item">
            <span class="label">Discount:</span>
            <span class="value discount-badge">${discountPercent}%</span>
        </div>
        <button class="final-purchase-btn" onclick="completePurchase(${finalPrice})">
            Complete Purchase - ₹${finalPrice}
        </button>
    `;
    summaryDiv.style.display = 'block';
}

// Complete purchase after negotiation
function completePurchase(price) {
    closeChat();
    showPurchaseConfirmation(currentProduct, price, true);
}

// Direct purchase without negotiation
function purchaseProduct(productId, price) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }
    showPurchaseConfirmation(product, price, false);
}

// Show purchase confirmation modal
function showPurchaseConfirmation(product, price, wasNegotiated) {
    const modal = document.getElementById('purchaseModal');
    const detailsDiv = document.getElementById('purchaseDetails');
    
    if (!modal || !detailsDiv) return;
    
    let summaryHTML = `
        <p><strong>Product:</strong> ${product.name}</p>
        <p><strong>Brand:</strong> ${product.details.brand}</p>
        <p><strong>Price Paid:</strong> ₹${price}</p>
    `;
    
    if (wasNegotiated) {
        const savedAmount = product.price - price;
        const discountPercent = Math.round((savedAmount / product.price) * 100);
        summaryHTML += `
            <p><strong>Original Price:</strong> <s>₹${product.price}</s></p>
            <p style="color: var(--red-accent);"><strong>You Saved:</strong> ₹${savedAmount} (${discountPercent}% off) 🎉</p>
        `;
    }
    
    detailsDiv.innerHTML = summaryHTML;
    modal.style.display = 'block';
}

// Close chat modal
function closeChat() {
    const chatModal = document.getElementById('chatModal');
    if (chatModal) {
        chatModal.style.display = 'none';
    }
    currentProduct = null;
    negotiationStarted = false;
    chatHistory = [];
    negotiatedPrice = null;
}

// Close purchase modal
function closePurchaseModal() {
    const purchaseModal = document.getElementById('purchaseModal');
    if (purchaseModal) {
        purchaseModal.style.display = 'none';
    }
}

// Get current time in HH:MM format
function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

// Close modals when clicking outside
window.onclick = function(event) {
    const chatModal = document.getElementById('chatModal');
    const purchaseModal = document.getElementById('purchaseModal');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    
    if (event.target === chatModal) {
        closeChat();
    }
    if (event.target === purchaseModal) {
        closePurchaseModal();
    }
    if (loginModal && event.target === loginModal) {
        closeLoginModal();
    }
    if (signupModal && event.target === signupModal) {
        closeSignupModal();
    }
}


// Typing Animation
function startTypingAnimation() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;
    
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typingSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentText.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typingSpeed = 500;
    }
    
    setTimeout(startTypingAnimation, typingSpeed);
}

// Load Featured Products (first 8 products)
function loadFeaturedProducts() {
    const featuredGrid = document.getElementById('featuredGrid');
    if (!featuredGrid) return;
    
    const featuredProducts = products.slice(0, 8);
    
    featuredProducts.forEach(product => {
        const productCard = createProductCard(product);
        featuredGrid.appendChild(productCard);
    });
}

// Scroll to sections
function scrollToProducts() {
    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
}

function scrollToAllProducts() {
    document.getElementById('categories').scrollIntoView({ behavior: 'smooth' });
}

function openChatbotDemo() {
    // Open chat with first product as demo
    startNegotiation(1);
}

// Filter products by category
function filterByCategory(category) {
    currentCategory = category;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Filter and display products
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    const filtered = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);
    
    filtered.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Filter products by search
function filterProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    let filtered = currentCategory === 'all' 
        ? products 
        : products.filter(p => p.category === currentCategory);
    
    if (searchTerm) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm)
        );
    }
    
    if (filtered.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 50px; color: var(--gray);">
                <h3>No products found</h3>
                <p>Try a different search term or category</p>
            </div>
        `;
        return;
    }
    
    filtered.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Global Variables
let currentProduct = null;
let negotiationStarted = false;
let chatHistory = [];
let negotiatedPrice = null;
let offerCount = 0;
let dealFinalized = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
});

// Load and display products
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card HTML
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image" 
             onerror="this.src='https://via.placeholder.com/400x300?text=${encodeURIComponent(product.name)}'">
        <div class="product-details">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">₹${product.price}</div>
            <div class="product-actions">
                <button class="purchase-btn" onclick="purchaseProduct(${product.id}, ${product.price})">
                    🟩 Purchase
                </button>
                <button class="negotiate-btn" onclick="startNegotiation(${product.id})">
                    💬 Let's Negotiate
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Start negotiation with a product
function startNegotiation(productId) {
    currentProduct = products.find(p => p.id === productId);
    negotiationStarted = false;
    chatHistory = [];
    negotiatedPrice = null;
    offerCount = 0;
    dealFinalized = false;
    
    // Display chat modal
    document.getElementById('chatModal').style.display = 'block';
    
    // Display product info
    displayProductInfo();
    
    // Clear previous messages
    document.getElementById('chatMessages').innerHTML = '';
    document.getElementById('negotiationSummary').style.display = 'none';
    
    // Send initial greeting
    setTimeout(() => {
        addBotMessage(`Hi there! I'm Barter 🤖. I see you're interested in the ${currentProduct.name}. Its listed price is ₹${currentProduct.price}. Want to make me an offer?`);
    }, 500);
}

// Display product info in chat header
function displayProductInfo() {
    const productInfo = document.getElementById('chatProductInfo');
    productInfo.innerHTML = `
        <img src="${currentProduct.image}" alt="${currentProduct.name}"
             onerror="this.src='https://via.placeholder.com/60x60?text=Product'">
        <div class="product-info-text">
            <h4>${currentProduct.name}</h4>
            <div class="price">₹${currentProduct.price}</div>
        </div>
    `;
}

// Handle key press in input field
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Send user message
function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if (message === '' || dealFinalized) return;
    
    // Add user message to chat
    addUserMessage(message);
    input.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Process message and respond
    setTimeout(() => {
        removeTypingIndicator();
        processUserMessage(message);
    }, 1000 + Math.random() * 1000); // Random delay for realism
}

// Add user message to chat
function addUserMessage(message) {
    chatHistory.push({ role: 'user', message: message, time: getCurrentTime() });
    
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user';
    messageDiv.innerHTML = `
        <div class="message-content">
            <div>${message}</div>
            <div class="message-time">${getCurrentTime()}</div>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add bot message to chat
function addBotMessage(message) {
    chatHistory.push({ role: 'bot', message: message, time: getCurrentTime() });
    
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot';
    messageDiv.innerHTML = `
        <div class="message-content">
            <div>${message}</div>
            <div class="message-time">${getCurrentTime()}</div>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="message-content">
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Process user message and generate AI response
function processUserMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    // Check if it's a pre-purchase question
    if (!negotiationStarted && isPrePurchaseQuestion(lowerMessage)) {
        const response = handlePrePurchaseQuestion(lowerMessage);
        addBotMessage(response);
        return;
    }
    
    // Extract price from message
    const priceMatch = message.match(/\d+/);
    
    if (priceMatch) {
        const offeredPrice = parseInt(priceMatch[0]);
        negotiationStarted = true;
        offerCount++;
        handlePriceOffer(offeredPrice);
    } else if (isDealConfirmation(lowerMessage)) {
        if (negotiatedPrice) {
            finalizeDeal();
        } else {
            addBotMessage("I'm not sure what price we agreed on. Could you make me an offer?");
        }
    } else {
        // General conversation handling
        handleGeneralMessage(lowerMessage);
    }
}

// Check if message is a pre-purchase question
function isPrePurchaseQuestion(message) {
    const questionKeywords = ['warranty', 'delivery', 'return', 'payment', 'quality', 
                             'shipping', 'support', 'installation', 'how', 'when', 
                             'what', 'where', 'does', 'is', 'can'];
    return questionKeywords.some(keyword => message.includes(keyword));
}

// Handle pre-purchase questions
function handlePrePurchaseQuestion(message) {
    if (message.includes('warranty')) {
        return `Great question! ${productKnowledge.warranty} Now, would you like to make an offer on this ${currentProduct.name}?`;
    } else if (message.includes('delivery') || message.includes('shipping')) {
        return `${productKnowledge.delivery} Interested in making an offer?`;
    } else if (message.includes('return')) {
        return `${productKnowledge.return} Shall we discuss the price?`;
    } else if (message.includes('payment')) {
        return `${productKnowledge.payment} Ready to negotiate?`;
    } else if (message.includes('quality') || message.includes('authentic')) {
        return `${productKnowledge.quality} What price are you thinking?`;
    } else if (message.includes('support')) {
        return `${productKnowledge.support} Now, let's talk about getting you a great deal!`;
    } else if (message.includes('installation')) {
        return `${productKnowledge.installation} Would you like to make an offer on this product?`;
    } else {
        return `That's a good question! This ${currentProduct.name} is a quality product at ₹${currentProduct.price}. What price would work for you?`;
    }
}

// Check if message is a deal confirmation
function isDealConfirmation(message) {
    const confirmationWords = ['deal', 'yes', 'ok', 'okay', 'sure', 'agreed', 
                               'accept', 'fine', 'done', 'buy', 'purchase'];
    return confirmationWords.some(word => message.includes(word));
}

// Handle price offer - AI Negotiation Logic
function handlePriceOffer(offeredPrice) {
    const originalPrice = currentProduct.price;
    const minPrice = currentProduct.minPrice;
    const priceRange = originalPrice - minPrice;
    const discountPercent = ((originalPrice - offeredPrice) / originalPrice) * 100;
    
    // Too low offer (below minimum price)
    if (offeredPrice < minPrice) {
        const responses = [
            `Hmm, ₹${offeredPrice}? That's a bit too low for this quality product. The best I can do is ₹${minPrice}. It's still a great deal at ${Math.round(((originalPrice - minPrice) / originalPrice) * 100)}% off!`,
            `I appreciate your offer of ₹${offeredPrice}, but I can't go that low. How about ₹${minPrice}? That's my absolute minimum for this ${currentProduct.name}.`,
            `₹${offeredPrice} is quite a stretch for me! 😅 I can offer you ₹${minPrice} - that's already a fantastic discount. What do you say?`
        ];
        negotiatedPrice = minPrice;
        addBotMessage(responses[Math.floor(Math.random() * responses.length)]);
    }
    // Acceptable offer (within negotiation range)
    else if (offeredPrice >= minPrice && offeredPrice < originalPrice * 0.85) {
        const counterOffer = offeredPrice + Math.floor(priceRange * 0.1);
        const responses = [
            `₹${offeredPrice} is a good start! But I think this product is worth a bit more. How about we meet at ₹${counterOffer}? That's still ${Math.round(((originalPrice - counterOffer) / originalPrice) * 100)}% off!`,
            `I like your thinking with ₹${offeredPrice}! Let me counter with ₹${counterOffer}. It's a fair price for such a quality ${currentProduct.name}. Deal?`,
            `You drive a hard bargain! 😊 ₹${offeredPrice} is close, but can we do ₹${counterOffer}? I promise it's worth every rupee!`
        ];
        negotiatedPrice = counterOffer;
        addBotMessage(responses[Math.floor(Math.random() * responses.length)]);
    }
    // Good offer (85-95% of original)
    else if (offeredPrice >= originalPrice * 0.85 && offeredPrice < originalPrice * 0.95) {
        const responses = [
            `₹${offeredPrice}? You know what, I like you! Let's do it. That's a great deal for both of us! 🤝 Type 'deal' to confirm your purchase.`,
            `₹${offeredPrice} sounds fair! You're getting an amazing ${currentProduct.name} at a great price. Shall we finalize this? Type 'yes' to confirm!`,
            `Excellent! ₹${offeredPrice} it is! I'm happy we could reach an agreement. Ready to purchase? Just say 'deal'!`
        ];
        negotiatedPrice = offeredPrice;
        addBotMessage(responses[Math.floor(Math.random() * responses.length)]);
    }
    // Very close to original price (95%+)
    else {
        const responses = [
            `₹${offeredPrice}? You're almost at the listed price! I can accept that. Ready to make it yours? Type 'yes' to confirm!`,
            `Perfect! ₹${offeredPrice} works for me. This ${currentProduct.name} will be yours! Type 'deal' to complete the purchase.`,
            `Great offer of ₹${offeredPrice}! Let's close this deal. Say 'deal' and it's yours! 🎉`
        ];
        negotiatedPrice = offeredPrice;
        addBotMessage(responses[Math.floor(Math.random() * responses.length)]);
    }
}

// Handle general messages
function handleGeneralMessage(message) {
    if (message.includes('expensive') || message.includes('costly') || message.includes('high')) {
        addBotMessage(`I understand your concern! That's why I'm here to negotiate. What price would you be comfortable with for this ${currentProduct.name}?`);
    } else if (message.includes('cheap') || message.includes('lower') || message.includes('less')) {
        addBotMessage(`Let's find a price that works for you! Make me an offer and let's see if we can strike a deal! 💰`);
    } else if (message.includes('think') || message.includes('consider')) {
        addBotMessage(`Take your time! When you're ready, just tell me what price you have in mind. I'm here to help you get the best deal! 😊`);
    } else if (message.includes('thank')) {
        addBotMessage(`You're welcome! Happy to help. So, shall we talk about the price for this ${currentProduct.name}?`);
    } else {
        const responses = [
            `I'm here to help you get the best price! What's your budget for this ${currentProduct.name}?`,
            `Let's make a deal! The listed price is ₹${currentProduct.price}, but I'm flexible. What can you offer?`,
            `I'm all ears! 👂 Make me an offer and let's negotiate!`
        ];
        addBotMessage(responses[Math.floor(Math.random() * responses.length)]);
    }
}

// Finalize the deal
function finalizeDeal() {
    dealFinalized = true;
    const originalPrice = currentProduct.price;
    const discountAmount = originalPrice - negotiatedPrice;
    const discountPercent = Math.round((discountAmount / originalPrice) * 100);
    
    addBotMessage(`🎉 Awesome! We have a deal at ₹${negotiatedPrice}! You saved ₹${discountAmount} (${discountPercent}% off)!`);
    
    // Show negotiation summary
    setTimeout(() => {
        displayNegotiationSummary(originalPrice, negotiatedPrice, discountAmount, discountPercent);
    }, 1000);
}

// Display negotiation summary
function displayNegotiationSummary(originalPrice, finalPrice, savedAmount, discountPercent) {
    const summaryDiv = document.getElementById('negotiationSummary');
    summaryDiv.innerHTML = `
        <h3>📊 Negotiation Summary</h3>
        <div class="summary-item">
            <span class="label">Original Price:</span>
            <span class="value">₹${originalPrice}</span>
        </div>
        <div class="summary-item">
            <span class="label">Negotiated Price:</span>
            <span class="value">₹${finalPrice}</span>
        </div>
        <div class="summary-item">
            <span class="label">You Saved:</span>
            <span class="value discount-badge">₹${savedAmount}</span>
        </div>
        <div class="summary-item">
            <span class="label">Discount:</span>
            <span class="value discount-badge">${discountPercent}%</span>
        </div>
        <button class="final-purchase-btn" onclick="completePurchase(${finalPrice})">
            Complete Purchase - ₹${finalPrice}
        </button>
    `;
    summaryDiv.style.display = 'block';
}

// Complete purchase after negotiation
function completePurchase(price) {
    closeChat();
    showPurchaseConfirmation(currentProduct, price, true);
}

// Direct purchase without negotiation
function purchaseProduct(productId, price) {
    const product = products.find(p => p.id === productId);
    showPurchaseConfirmation(product, price, false);
}

// Show purchase confirmation modal
function showPurchaseConfirmation(product, price, wasNegotiated) {
    const modal = document.getElementById('purchaseModal');
    const detailsDiv = document.getElementById('purchaseDetails');
    
    let summaryHTML = `
        <p><strong>Product:</strong> ${product.name}</p>
        <p><strong>Price Paid:</strong> ₹${price}</p>
    `;
    
    if (wasNegotiated) {
        const savedAmount = product.price - price;
        const discountPercent = Math.round((savedAmount / product.price) * 100);
        summaryHTML += `
            <p><strong>Original Price:</strong> <s>₹${product.price}</s></p>
            <p><strong>You Saved:</strong> ₹${savedAmount} (${discountPercent}% off)</p>
        `;
    }
    
    detailsDiv.innerHTML = summaryHTML;
    modal.style.display = 'block';
}

// Close chat modal
function closeChat() {
    document.getElementById('chatModal').style.display = 'none';
    currentProduct = null;
    negotiationStarted = false;
    chatHistory = [];
    negotiatedPrice = null;
}

// Close purchase modal
function closePurchaseModal() {
    document.getElementById('purchaseModal').style.display = 'none';
}

// Get current time in HH:MM format
function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

// Close modals when clicking outside
window.onclick = function(event) {
    const chatModal = document.getElementById('chatModal');
    const purchaseModal = document.getElementById('purchaseModal');
    
    if (event.target === chatModal) {
        closeChat();
    }
    if (event.target === purchaseModal) {
        closePurchaseModal();
    }
}
