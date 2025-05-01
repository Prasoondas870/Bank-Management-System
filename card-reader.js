document.addEventListener('DOMContentLoaded', function() {
    const cardReader = document.querySelector('.card-reader');
    const loginForm = document.querySelector('.login-form');
    const cardSlot = document.querySelector('.card-slot');
    const loginStatus = document.querySelector('.login-status');
    
    // Simulate card insertion
    cardReader.addEventListener('click', function() {
        if (loginForm.classList.contains('hidden')) {
            // Show card being inserted
            cardSlot.classList.add('card-inserted');
            loginStatus.textContent = 'Reading card...';
            
            // After animation completes, show login form
            setTimeout(function() {
                cardSlot.style.background = 'linear-gradient(90deg, #333, #4CAF50)';
                loginStatus.textContent = 'Card recognized. Please enter your PIN.';
                loginForm.classList.remove('hidden');
                loginForm.classList.add('animate-fade-in');
            }, 1000);
        }
    });
    
    // Card removal simulation (double click)
    cardReader.addEventListener('dblclick', function() {
        if (!loginForm.classList.contains('hidden')) {
            loginForm.classList.add('hidden');
            cardSlot.style.background = 'linear-gradient(90deg, #333, #555)';
            loginStatus.textContent = 'Card removed. Please insert your card again.';
        }
    });
});