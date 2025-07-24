// home product detials Toast notification function
        function showCartToast(msg) {
            const toast = document.getElementById('cart-toast');
            if (!toast) return;
            
            const toastMsg = document.getElementById('cart-toast-msg');
            toastMsg.textContent = msg;
            toast.style.display = 'block';
            setTimeout(() => { toast.style.opacity = 1; }, 10);
            setTimeout(() => {
                toast.style.opacity = 0;
                setTimeout(() => { toast.style.display = 'none'; }, 400);
            }, 2000);
        }
        
        // Update cart count
        function updateCartCount() {
            const cartProducts = JSON.parse(localStorage.getItem('falcurmart_cart') || []);
            const cartCount = cartProducts.length;
            document.querySelectorAll('.cart-count').forEach(el => el.textContent = cartCount);
        }
        
        
       
        
        // Open cart modal
        document.querySelectorAll('.cart-icon').forEach(icon => {
            icon.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector('.cart-modal').classList.add('active');
                updateCartModal();
            });
        });
        
        // Close cart modal
        document.querySelector('.close-cart').addEventListener('click', function() {
            document.querySelector('.cart-modal').classList.remove('active');
        });
        
        // Main fix: Add to cart functionality for product details page
        document.getElementById('main-add-to-cart').addEventListener('click', function() {
            // Get product details
            const title = document.querySelector('.right h3').textContent;
            const priceText = document.querySelector('.right h4').textContent;
            const price = parseFloat(priceText.replace(/[^\d.]/g, '')) || 0;
            const img = document.querySelector('.sidel').src;
            const desc = document.querySelector('.right p').textContent;
            
            // Add to cart
            const cartProducts = JSON.parse(localStorage.getItem('falcurmart_cart') || []);
            cartProducts.push({ title, price, img, desc });
            localStorage.setItem('falcurmart_cart', JSON.stringify(cartProducts));
            
            // Update UI
            updateCartCount();
            updateCartModal(); // This updates the cart modal content
            showCartToast(`${title} added to cart`);
            
            // Button animation feedback
            this.textContent = 'Added!';
            setTimeout(() => {
                this.innerHTML = 'Add to Cart <i class="fa fa-shopping-cart" aria-hidden="true"></i>';
            }, 1000);
        });
        
        // Initialize cart on page load
        document.addEventListener('DOMContentLoaded', function() {
            updateCartCount();
            updateCartModal(); // Initialize modal content
        });





































        // Update cart modal content
        function updateCartModal() {
            const cartItems = document.querySelector('.cart-items');
            const totalAmount = document.querySelector('.total-amount');
            if (!cartItems || !totalAmount) return;
            
            cartItems.innerHTML = '';
            let total = 0;
            
            const cartProducts = JSON.parse(localStorage.getItem('falcurmart_cart') || []);
            
            cartProducts.forEach((item, idx) => {
                total += item.price;
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <img src="${item.img}" alt="">
                    <div class="cart-item-details">
                        <h4>${item.title}</h4>
                        <p>${item.desc}</p>
                        <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    </div>
                    <button class="remove-item" data-idx="${idx}">Remove</button>
                `;
                cartItems.appendChild(cartItem);
            });
            
            totalAmount.textContent = total.toFixed(2);
            
            // Add event listeners to remove buttons
            document.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', function() {
                    const idx = parseInt(this.getAttribute('data-idx'));
                    const cartProducts = JSON.parse(localStorage.getItem('falcurmart_cart') || []);
                    cartProducts.splice(idx, 1);
                    localStorage.setItem('falcurmart_cart', JSON.stringify(cartProducts));
                    
                    // Update UI
                    updateCartModal();
                    updateCartCount();
                });
            });
        }


        