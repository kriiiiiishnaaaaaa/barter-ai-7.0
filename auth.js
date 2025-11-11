// Authentication System for Barter

// User data storage (using localStorage)
let currentUser = null;

// Initialize authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuthentication();
    initAuthReminder();
});

// Check if user is already logged in
function checkAuthentication() {
    const userData = localStorage.getItem('barterUser');
    if (userData) {
        currentUser = JSON.parse(userData);
        updateUIForLoggedInUser();
    } else {
        updateUIForLoggedOutUser();
    }
}

// Update UI for logged-in user
function updateUIForLoggedInUser() {
    const navUser = document.getElementById('navUser');
    navUser.innerHTML = `
        <span class="welcome-text">Hey ${currentUser.name}, welcome! 👋</span>
        <button class="btn-icon" id="cartBtn">🛒</button>
        <button class="btn-logout" onclick="handleLogout()">Logout</button>
    `;
    
    // Hide auth reminder
    const authReminder = document.getElementById('authReminder');
    if (authReminder) {
        authReminder.style.display = 'none';
    }
}

// Update UI for logged-out user
function updateUIForLoggedOutUser() {
    const navUser = document.getElementById('navUser');
    navUser.innerHTML = `
        <button class="btn-icon" id="cartBtn">🛒</button>
        <button class="btn-login" onclick="openLoginModal()">Login</button>
    `;
}

// Initialize auth reminder banner
function initAuthReminder() {
    // Show reminder after 5 seconds if user is not logged in
    if (!currentUser) {
        setTimeout(() => {
            const authReminder = document.getElementById('authReminder');
            if (authReminder) {
                authReminder.style.display = 'block';
            }
        }, 5000);
    }
}

// Modal controls
function openLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
    clearLoginForm();
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

function openSignupModal() {
    document.getElementById('signupModal').style.display = 'block';
    clearSignupForm();
}

function closeSignupModal() {
    document.getElementById('signupModal').style.display = 'none';
}

function switchToSignup() {
    closeLoginModal();
    openSignupModal();
}

function switchToLogin() {
    closeSignupModal();
    openLoginModal();
}

function closeAuthReminder() {
    document.getElementById('authReminder').style.display = 'none';
}

// Form validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function validateName(name) {
    return name.trim().length >= 2;
}

// Clear error messages
function clearErrors(formType) {
    if (formType === 'login') {
        document.getElementById('loginEmailError').textContent = '';
        document.getElementById('loginPasswordError').textContent = '';
    } else {
        document.getElementById('signupNameError').textContent = '';
        document.getElementById('signupEmailError').textContent = '';
        document.getElementById('signupPasswordError').textContent = '';
    }
}

// Clear forms
function clearLoginForm() {
    document.getElementById('loginForm').reset();
    clearErrors('login');
}

function clearSignupForm() {
    document.getElementById('signupForm').reset();
    clearErrors('signup');
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    clearErrors('login');
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    let hasError = false;
    
    // Validate email
    if (!validateEmail(email)) {
        document.getElementById('loginEmailError').textContent = 'Please enter a valid email address';
        hasError = true;
    }
    
    // Validate password
    if (!validatePassword(password)) {
        document.getElementById('loginPasswordError').textContent = 'Password must be at least 6 characters';
        hasError = true;
    }
    
    if (hasError) return;
    
    // Check if user exists
    const users = JSON.parse(localStorage.getItem('barterUsers') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Successful login
        currentUser = { name: user.name, email: user.email };
        localStorage.setItem('barterUser', JSON.stringify(currentUser));
        
        // Show success message
        showNotification('Login successful! Welcome back, ' + user.name + '! 🎉', 'success');
        
        // Close modal and update UI
        closeLoginModal();
        updateUIForLoggedInUser();
        
        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        // Login failed
        document.getElementById('loginPasswordError').textContent = 'Invalid email or password';
        showNotification('Login failed. Please check your credentials.', 'error');
    }
}

// Handle Signup
function handleSignup(event) {
    event.preventDefault();
    clearErrors('signup');
    
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    
    let hasError = false;
    
    // Validate name
    if (!validateName(name)) {
        document.getElementById('signupNameError').textContent = 'Name must be at least 2 characters';
        hasError = true;
    }
    
    // Validate email
    if (!validateEmail(email)) {
        document.getElementById('signupEmailError').textContent = 'Please enter a valid email address';
        hasError = true;
    }
    
    // Validate password
    if (!validatePassword(password)) {
        document.getElementById('signupPasswordError').textContent = 'Password must be at least 6 characters';
        hasError = true;
    }
    
    if (hasError) return;
    
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('barterUsers') || '[]');
    const existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
        document.getElementById('signupEmailError').textContent = 'This email is already registered';
        showNotification('Email already exists. Please login instead.', 'error');
        return;
    }
    
    // Create new user
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('barterUsers', JSON.stringify(users));
    
    // Auto-login after signup
    currentUser = { name, email };
    localStorage.setItem('barterUser', JSON.stringify(currentUser));
    
    // Show success message
    showNotification('Account created successfully! Welcome to Barter, ' + name + '! 🎉', 'success');
    
    // Close modal and update UI
    closeSignupModal();
    updateUIForLoggedInUser();
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Handle Logout
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        currentUser = null;
        localStorage.removeItem('barterUser');
        updateUIForLoggedOutUser();
        showNotification('Logged out successfully. Come back soon! 👋', 'info');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Close modals when clicking outside
window.onclick = function(event) {
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    
    if (event.target === loginModal) {
        closeLoginModal();
    }
    if (event.target === signupModal) {
        closeSignupModal();
    }
}
