// Show the modal when the "Connect Wallet" button is clicked
document.getElementById("connectButton").addEventListener("click", function() {
    document.getElementById("walletModal").style.display = "block";
});

// Close the modal with fade-out effect
function closeModal() {
    const modal = document.getElementById("walletModal");
    modal.classList.add("fadeOut");
    setTimeout(() => {
        modal.style.display = "none";
        modal.classList.remove("fadeOut");
    }, 300);
}

// Handle MetaMask connection
async function connectMetaMask() {
    closeModal();
    try {
        await window.connectMetaMask(); // Calls function from metadirect.js
        console.log("MetaMask connected successfully");
        showPopup("MetaMask connected successfully");
    } catch (error) {
        console.error("Failed to connect with MetaMask", error);
        showPopup("Failed to connect with MetaMask. Please try again.");
    }
}

// Handle TrustWallet connection
async function connectTrustWallet() {
    closeModal();
    try {
        await window.connectTrustWalletWithQR(); // Calls function from trustback.js
        console.log("TrustWallet connected successfully");
        showPopup("TrustWallet connected successfully");
    } catch (error) {
        console.error("Failed to connect with TrustWallet", error);
        showPopup("Failed to connect with TrustWallet. Please try again.");
    }
}

// Handle SafePal connection
async function connectSafePal() {
    closeModal();
    try {
        await window.connectSafePalWithQR(); // Calls function from safepalback.js
        console.log("SafePal connected successfully");
        showPopup("SafePal connected successfully");
    } catch (error) {
        console.error("Failed to connect with SafePal", error);
        showPopup("Failed to connect with SafePal. Please try again.");
    }
}

// Handle TokenPocket connection
async function connectTokenPocket() {
    closeModal();
    try {
        await window.connectTokenPocketWithQR(); // Calls function from tokenpocketback.js
        console.log("TokenPocket connected successfully");
        showPopup("TokenPocket connected successfully");
    } catch (error) {
        console.error("Failed to connect with TokenPocket", error);
        showPopup("Failed to connect with TokenPocket. Please try again.");
    }
}

// Show a popup with a message
function showPopup(message) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerText = message;
    document.body.appendChild(popup);
    
    // Remove the popup after 3 seconds
    setTimeout(() => {
        popup.remove();
    }, 3000);
}
