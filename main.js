document.addEventListener('DOMContentLoaded', function() {
    const pinDigits = document.querySelectorAll('.pin-digit');
    const keypad = document.querySelector('.keypad');
    const loginStatus = document.querySelector('.login-status');
    
    let currentPinPosition = 0;
    const correctPin = '1234'; // Default PIN for demo
    
    // Focus first PIN digit
    if (pinDigits.length > 0) {
        pinDigits[0].focus();
    }
    
    // Handle keypad clicks
    keypad.addEventListener('click', function(e) {
        const key = e.target.closest('.key');
        if (!key) return;
        
        const value = key.getAttribute('data-value');
        
        switch(value) {
            case 'clear':
                clearPin();
                break;
            case 'enter':
                submitPin();
                break;
            default:
                if (currentPinPosition < pinDigits.length) {
                    pinDigits[currentPinPosition].value = value;
                    pinDigits[currentPinPosition].classList.add('animate-pulse');
                    setTimeout(() => {
                        pinDigits[currentPinPosition].classList.remove('animate-pulse');
                    }, 300);
                    
                    currentPinPosition++;
                    if (currentPinPosition < pinDigits.length) {
                        pinDigits[currentPinPosition].focus();
                    }
                }
        }
    });
    
    // Handle keyboard input for PIN
    pinDigits.forEach((digit, index) => {
        digit.addEventListener('input', function() {
            if (this.value.length === 1) {
                this.classList.add('animate-pulse');
                setTimeout(() => {
                    this.classList.remove('animate-pulse');
                }, 300);
                
                if (index < pinDigits.length - 1) {
                    pinDigits[index + 1].focus();
                }
                currentPinPosition = index + 1;
            }
        });
        
        digit.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value.length === 0 && index > 0) {
                pinDigits[index - 1].focus();
                currentPinPosition = index - 1;
            }
        });
    });
    
    function clearPin() {
        pinDigits.forEach(digit => {
            digit.value = '';
            digit.classList.remove('shake-animation');
        });
        currentPinPosition = 0;
        pinDigits[0].focus();
    }
    
    function submitPin() {
        const enteredPin = Array.from(pinDigits).map(d => d.value).join('');
        
        if (enteredPin.length !== 4) {
            loginStatus.textContent = 'Please enter a 4-digit PIN';
            return;
        }
        
        if (enteredPin === correctPin) {
            // Success
            document.querySelector('.login-container').classList.add('success-animation');
            loginStatus.textContent = 'Login successful! Redirecting...';
            loginStatus.style.color = 'var(--success-color)';
            
            // Redirect to dashboard after delay
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            // Incorrect PIN
            pinDigits.forEach(digit => {
                digit.classList.add('shake-animation');
                setTimeout(() => {
                    digit.classList.remove('shake-animation');
                }, 500);
            });
            loginStatus.textContent = 'Incorrect PIN. Please try again.';
            loginStatus.style.color = 'var(--danger-color)';
            
            // Clear after delay
            setTimeout(clearPin, 1000);
        }
    }
});