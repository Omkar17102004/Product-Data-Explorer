// Product Data Explorer - Main Application
class ProductDataExplorer {
    constructor() {
        this.currentPage = 'home';
        this.currentCategory = null;
        this.currentProduct = null;
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        this.filters = {
            priceRange: [0, 100],
            conditions: [],
            ratings: [],
            sortBy: 'relevance',
            view: 'grid'
        };
        this.currentPageNum = 1;
        this.itemsPerPage = 12;
        
        // Initialize data
        this.initializeData();
        
        // Initialize event listeners
        this.initializeEventListeners();
        
        // Load initial page
        this.navigateToPage('home');
        
        // Update cart count
        this.updateCartCount();
    }

    initializeData() {
        // Navigation categories from provided data
        this.navigationData = {
            "navigationCategories": [
                {
                    "id": "books",
                    "title": "Books",
                    "slug": "books",
                    "subcategories": [
                        {"id": "fiction", "title": "Fiction", "slug": "fiction", "productCount": 1245},
                        {"id": "non-fiction", "title": "Non-Fiction", "slug": "non-fiction", "productCount": 987},
                        {"id": "childrens", "title": "Children's Books", "slug": "childrens", "productCount": 654},
                        {"id": "biography", "title": "Biography", "slug": "biography", "productCount": 432}
                    ]
                },
                {
                    "id": "dvds",
                    "title": "DVDs & Blu-rays",
                    "slug": "dvds",
                    "subcategories": [
                        {"id": "action", "title": "Action", "slug": "action", "productCount": 234},
                        {"id": "comedy", "title": "Comedy", "slug": "comedy", "productCount": 345}
                    ]
                },
                {
                    "id": "cds",
                    "title": "CDs",
                    "slug": "cds",
                    "subcategories": [
                        {"id": "rock", "title": "Rock", "slug": "rock", "productCount": 567},
                        {"id": "classical", "title": "Classical", "slug": "classical", "productCount": 234}
                    ]
                }
            ]
        };

        // Extended product database
        this.productsDatabase = [
            {
                "id": "1",
                "title": "The Great Gatsby",
                "author": "F. Scott Fitzgerald",
                "price": 8.99,
                "originalPrice": 12.99,
                "currency": "GBP",
                "condition": "Very Good",
                "imageUrl": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
                "rating": 4.5,
                "reviewCount": 234,
                "description": "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream through the eyes of Nick Carraway as he observes the tragic story of Jay Gatsby.",
                "isbn": "9780141182636",
                "publisher": "Penguin Classics",
                "publicationDate": "2000-02-24",
                "pages": 180,
                "inStock": true,
                "category": "books",
                "subcategory": "fiction"
            },
            {
                "id": "2",
                "title": "To Kill a Mockingbird",
                "author": "Harper Lee",
                "price": 7.50,
                "originalPrice": 10.99,
                "currency": "GBP",
                "condition": "Good",
                "imageUrl": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
                "rating": 4.8,
                "reviewCount": 567,
                "description": "A gripping tale of racial injustice and childhood innocence in the American South, told through the eyes of Scout Finch as her father defends a black man falsely accused of rape.",
                "isbn": "9780060935467",
                "publisher": "HarperCollins",
                "publicationDate": "1960-07-11",
                "pages": 324,
                "inStock": true,
                "category": "books",
                "subcategory": "fiction"
            },
            {
                "id": "3",
                "title": "1984",
                "author": "George Orwell",
                "price": 6.99,
                "originalPrice": 9.99,
                "currency": "GBP",
                "condition": "Like New",
                "imageUrl": "https://images.unsplash.com/photo-1495640452828-3df6795cf69b?w=300&h=400&fit=crop",
                "rating": 4.7,
                "reviewCount": 890,
                "description": "A dystopian novel about totalitarianism and surveillance in a future society where Big Brother watches everything and the protagonist Winston Smith struggles for freedom.",
                "isbn": "9780451524935",
                "publisher": "Signet Classics",
                "publicationDate": "1949-06-08",
                "pages": 268,
                "inStock": true,
                "category": "books",
                "subcategory": "fiction"
            },
            {
                "id": "4",
                "title": "Pride and Prejudice",
                "author": "Jane Austen",
                "price": 5.99,
                "originalPrice": 8.99,
                "currency": "GBP",
                "condition": "Good",
                "imageUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
                "rating": 4.6,
                "reviewCount": 456,
                "description": "A romantic novel following Elizabeth Bennet as she navigates issues of manners, upbringing, morality, and marriage in Georgian England.",
                "isbn": "9780141439518",
                "publisher": "Penguin Classics",
                "publicationDate": "1813-01-28",
                "pages": 432,
                "inStock": true,
                "category": "books",
                "subcategory": "fiction"
            },
            {
                "id": "5",
                "title": "Harry Potter and the Philosopher's Stone",
                "author": "J.K. Rowling",
                "price": 9.99,
                "originalPrice": 14.99,
                "currency": "GBP",
                "condition": "Very Good",
                "imageUrl": "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=300&h=400&fit=crop",
                "rating": 4.9,
                "reviewCount": 1234,
                "description": "The first book in the Harry Potter series, following young Harry as he discovers he's a wizard and begins his magical education at Hogwarts.",
                "isbn": "9780747532699",
                "publisher": "Bloomsbury",
                "publicationDate": "1997-06-26",
                "pages": 223,
                "inStock": true,
                "category": "books",
                "subcategory": "childrens"
            },
            {
                "id": "6",
                "title": "The Lord of the Rings",
                "author": "J.R.R. Tolkien",
                "price": 15.99,
                "originalPrice": 22.99,
                "currency": "GBP",
                "condition": "Like New",
                "imageUrl": "https://images.unsplash.com/photo-1518373714866-3f1478910cc0?w=300&h=400&fit=crop",
                "rating": 4.8,
                "reviewCount": 2156,
                "description": "An epic high fantasy trilogy following the journey to destroy the One Ring and defeat the Dark Lord Sauron.",
                "isbn": "9780544003415",
                "publisher": "Houghton Mifflin",
                "publicationDate": "1954-07-29",
                "pages": 1216,
                "inStock": true,
                "category": "books",
                "subcategory": "fiction"
            },
            {
                "id": "7",
                "title": "Inception",
                "author": "Christopher Nolan",
                "price": 12.99,
                "originalPrice": 19.99,
                "currency": "GBP",
                "condition": "Very Good",
                "imageUrl": "https://images.unsplash.com/photo-1489599162367-2f51d8b52a0f?w=300&h=400&fit=crop",
                "rating": 4.7,
                "reviewCount": 892,
                "description": "A mind-bending thriller about dream infiltration and the nature of reality.",
                "isbn": "",
                "publisher": "Warner Bros",
                "publicationDate": "2010-07-16",
                "pages": 0,
                "inStock": true,
                "category": "dvds",
                "subcategory": "action"
            },
            {
                "id": "8",
                "title": "The Office Complete Series",
                "author": "Various",
                "price": 24.99,
                "originalPrice": 39.99,
                "currency": "GBP",
                "condition": "Like New",
                "imageUrl": "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=300&h=400&fit=crop",
                "rating": 4.9,
                "reviewCount": 1567,
                "description": "The complete collection of the beloved mockumentary comedy series.",
                "isbn": "",
                "publisher": "NBC Universal",
                "publicationDate": "2005-03-24",
                "pages": 0,
                "inStock": true,
                "category": "dvds",
                "subcategory": "comedy"
            },
            {
                "id": "9",
                "title": "Abbey Road",
                "author": "The Beatles",
                "price": 18.99,
                "originalPrice": 25.99,
                "currency": "GBP",
                "condition": "Good",
                "imageUrl": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=400&fit=crop",
                "rating": 4.8,
                "reviewCount": 3421,
                "description": "The iconic final studio album by The Beatles, featuring classics like 'Come Together' and 'Here Comes the Sun'.",
                "isbn": "",
                "publisher": "Apple Records",
                "publicationDate": "1969-09-26",
                "pages": 0,
                "inStock": true,
                "category": "cds",
                "subcategory": "rock"
            },
            {
                "id": "10",
                "title": "Beethoven's 9th Symphony",
                "author": "Ludwig van Beethoven",
                "price": 14.99,
                "originalPrice": 21.99,
                "currency": "GBP",
                "condition": "Very Good",
                "imageUrl": "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&h=400&fit=crop",
                "rating": 4.6,
                "reviewCount": 234,
                "description": "Performed by the Berlin Philharmonic Orchestra, this recording captures the majesty of Beethoven's final symphony.",
                "isbn": "",
                "publisher": "Deutsche Grammophon",
                "publicationDate": "1824-05-07",
                "pages": 0,
                "inStock": true,
                "category": "cds",
                "subcategory": "classical"
            }
        ];

        this.reviewsData = [
            {
                "id": "1",
                "productId": "1",
                "author": "BookLover123",
                "rating": 5,
                "text": "Excellent condition book, arrived quickly. Classic story that never gets old! The binding is tight and pages are clean.",
                "createdAt": "2024-01-15"
            },
            {
                "id": "2",
                "productId": "1",
                "author": "ReadingFan",
                "rating": 4,
                "text": "Good quality used book. Some minor wear but readable. Great price for this classic!",
                "createdAt": "2024-01-10"
            },
            {
                "id": "3",
                "productId": "2",
                "author": "ClassicReader",
                "rating": 5,
                "text": "One of the greatest American novels ever written. This edition is in fantastic condition.",
                "createdAt": "2024-01-12"
            },
            {
                "id": "4",
                "productId": "3",
                "author": "SciFiFan",
                "rating": 5,
                "text": "Orwell's masterpiece is more relevant than ever. Book arrived in excellent condition.",
                "createdAt": "2024-01-08"
            }
        ];
    }

    initializeEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('keyup', (e) => this.handleSearch(e));
        }

        // Filter change listeners
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('condition-filter') || 
                e.target.classList.contains('rating-filter')) {
                this.applyFilters();
            }
        });

        // Price range listeners
        const priceMin = document.getElementById('price-min');
        const priceMax = document.getElementById('price-max');
        if (priceMin && priceMax) {
            priceMin.addEventListener('input', () => this.updatePriceRange());
            priceMax.addEventListener('input', () => this.updatePriceRange());
        }

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-dropdown')) {
                this.closeAllDropdowns();
            }
        });

        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            if (e.state) {
                this.loadPageFromState(e.state);
            }
        });
    }

    // Navigation functions
    navigateToPage(page, data = null) {
        this.showLoading();
        
        setTimeout(() => {
            this.currentPage = page;
            this.loadPageContent(page, data);
            this.hideLoading();
            
            // Update browser history
            const state = { page, data };
            const url = this.getUrlForPage(page, data);
            history.pushState(state, '', url);
        }, 300);
    }

    navigateToCategory(categorySlug) {
        const category = this.navigationData.navigationCategories.find(cat => cat.slug === categorySlug);
        if (category) {
            this.currentCategory = category;
            this.navigateToPage('category', category);
        }
    }

    navigateToProduct(productId) {
        const product = this.productsDatabase.find(p => p.id === productId);
        if (product) {
            this.currentProduct = product;
            this.navigateToPage('product', product);
        }
    }

    getUrlForPage(page, data) {
        switch (page) {
            case 'home': return '/';
            case 'category': return `/category/${data?.slug || ''}`;
            case 'product': return `/product/${data?.id || ''}`;
            case 'about': return '/about';
            default: return '/';
        }
    }

    loadPageFromState(state) {
        this.currentPage = state.page;
        this.loadPageContent(state.page, state.data);
    }

    loadPageContent(page, data) {
        const mainContent = document.getElementById('main-content');
        const template = document.getElementById(`${page}-template`);
        
        if (template) {
            mainContent.innerHTML = template.innerHTML;
            
            switch (page) {
                case 'home':
                    this.loadHomePage();
                    break;
                case 'category':
                    this.loadCategoryPage(data);
                    break;
                case 'product':
                    this.loadProductPage(data);
                    break;
                case 'about':
                    this.loadAboutPage();
                    break;
            }
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Update mobile menu
        this.closeMobileMenu();
    }

    // Page loading functions
    loadHomePage() {
        // Load categories
        this.loadCategoriesGrid();
        
        // Load featured products
        this.loadFeaturedProducts();
    }

    loadCategoriesGrid() {
        const categoriesGrid = document.getElementById('categories-grid');
        if (!categoriesGrid) return;

        const categoryIcons = {
            books: `<svg width="32" height="32" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>`,
            dvds: `<svg width="32" height="32" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-3 5-3v6zm2-7.5V17h8v-7.5H12z"/></svg>`,
            cds: `<svg width="32" height="32" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>`
        };

        categoriesGrid.innerHTML = this.navigationData.navigationCategories.map(category => {
            const totalProducts = category.subcategories.reduce((sum, sub) => sum + sub.productCount, 0);
            return `
                <div class="category-card" onclick="app.navigateToCategory('${category.slug}')">
                    <div class="category-icon">
                        ${categoryIcons[category.slug] || categoryIcons.books}
                    </div>
                    <h3>${category.title}</h3>
                    <p>Discover amazing ${category.title.toLowerCase()} at great prices</p>
                    <span class="category-count">${totalProducts} items</span>
                </div>
            `;
        }).join('');
    }

    loadFeaturedProducts() {
        const featuredProducts = document.getElementById('featured-products');
        if (!featuredProducts) return;

        // Show first 6 products as featured
        const featured = this.productsDatabase.slice(0, 6);
        featuredProducts.innerHTML = featured.map(product => this.renderProductCard(product)).join('');
    }

    loadCategoryPage(category) {
        // Update breadcrumb
        this.updateBreadcrumb([
            { text: 'Home', action: () => this.navigateToPage('home') },
            { text: category.title, current: true }
        ]);

        // Update category header
        document.getElementById('category-title').textContent = category.title;
        document.getElementById('category-description').textContent = `Browse our collection of ${category.title.toLowerCase()}`;

        // Load subcategories
        this.loadSubcategories(category);

        // Load category products
        this.loadCategoryProducts(category);

        // Setup filters
        this.setupFilters();
    }

    loadSubcategories(category) {
        const subcategoriesGrid = document.getElementById('subcategories-grid');
        if (!subcategoriesGrid || !category.subcategories) return;

        subcategoriesGrid.innerHTML = category.subcategories.map(sub => `
            <div class="subcategory-card" onclick="app.filterBySubcategory('${sub.slug}')">
                <h3>${sub.title}</h3>
                <p class="subcategory-count">${sub.productCount} items</p>
            </div>
        `).join('');
    }

    loadCategoryProducts(category) {
        // Filter products by category
        const categoryProducts = this.productsDatabase.filter(product => 
            product.category === category.slug
        );

        this.currentCategoryProducts = categoryProducts;
        this.renderProducts(categoryProducts);
    }

    loadProductPage(product) {
        // Update breadcrumb
        const category = this.navigationData.navigationCategories.find(cat => cat.slug === product.category);
        this.updateBreadcrumb([
            { text: 'Home', action: () => this.navigateToPage('home') },
            { text: category?.title || 'Category', action: () => this.navigateToCategory(product.category) },
            { text: product.title, current: true }
        ]);

        // Update product details
        document.getElementById('product-main-image').src = product.imageUrl;
        document.getElementById('product-main-image').alt = product.title;
        document.getElementById('product-title').textContent = product.title;
        document.getElementById('product-author').textContent = product.author;
        document.getElementById('product-price').textContent = `£${product.price}`;
        document.getElementById('product-original-price').textContent = `£${product.originalPrice}`;
        document.getElementById('product-condition').textContent = product.condition;
        document.getElementById('product-description').textContent = product.description;

        // Update rating
        this.renderProductRating(product);

        // Load product specs
        this.loadProductSpecs(product);

        // Load reviews
        this.loadProductReviews(product);

        // Load related products
        this.loadRelatedProducts(product);
    }

    loadAboutPage() {
        // About page is static, no dynamic loading needed
    }

    // Product rendering functions
    renderProductCard(product) {
        const savings = product.originalPrice - product.price;
        return `
            <div class="product-card" onclick="app.navigateToProduct('${product.id}')">
                <div class="product-image-container">
                    <img src="${product.imageUrl}" alt="${product.title}" class="product-image" loading="lazy">
                    ${savings > 0 ? `<div class="product-badge">Save £${savings.toFixed(2)}</div>` : ''}
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-author">${product.author}</p>
                    <div class="product-rating">
                        ${this.renderStars(product.rating)}
                        <span class="rating-text">${product.rating} (${product.reviewCount})</span>
                    </div>
                    <div class="product-pricing">
                        <span class="current-price">£${product.price}</span>
                        ${product.originalPrice > product.price ? `<span class="original-price">£${product.originalPrice}</span>` : ''}
                    </div>
                    <div class="product-condition">Condition: ${product.condition}</div>
                    <button class="btn btn--primary quick-add-btn" onclick="event.stopPropagation(); app.addToCart('${product.id}')">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    }

    renderStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let starsHtml = '';
        
        // Full stars
        for (let i = 0; i < fullStars; i++) {
            starsHtml += '<svg class="star" width="14" height="14" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>';
        }
        
        // Empty stars
        for (let i = 0; i < emptyStars; i++) {
            starsHtml += '<svg class="star empty" width="14" height="14" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>';
        }
        
        return `<div class="rating-stars">${starsHtml}</div>`;
    }

    renderProductRating(product) {
        const ratingContainer = document.getElementById('product-rating-stars');
        const ratingText = document.getElementById('product-rating-text');
        
        if (ratingContainer) {
            ratingContainer.innerHTML = this.renderStars(product.rating).replace('<div class="rating-stars">', '').replace('</div>', '');
        }
        
        if (ratingText) {
            ratingText.textContent = `${product.rating} (${product.reviewCount} reviews)`;
        }
    }

    loadProductSpecs(product) {
        const specsContainer = document.getElementById('product-specs');
        if (!specsContainer) return;

        const specs = [];
        if (product.isbn) specs.push(['ISBN', product.isbn]);
        if (product.publisher) specs.push(['Publisher', product.publisher]);
        if (product.publicationDate) specs.push(['Publication Date', new Date(product.publicationDate).toLocaleDateString()]);
        if (product.pages) specs.push(['Pages', product.pages]);
        specs.push(['Condition', product.condition]);
        specs.push(['Stock Status', product.inStock ? 'In Stock' : 'Out of Stock']);

        specsContainer.innerHTML = specs.map(([label, value]) => `
            <div class="spec-item">
                <span class="spec-label">${label}:</span>
                <span class="spec-value">${value}</span>
            </div>
        `).join('');
    }

    loadProductReviews(product) {
        const reviewsList = document.getElementById('reviews-list');
        const reviewsSummary = document.getElementById('reviews-summary');
        
        if (!reviewsList || !reviewsSummary) return;

        // Get reviews for this product
        const productReviews = this.reviewsData.filter(review => review.productId === product.id);
        
        // Render reviews summary
        this.renderReviewsSummary(product, productReviews, reviewsSummary);
        
        // Render individual reviews
        reviewsList.innerHTML = productReviews.map(review => `
            <div class="review-item">
                <div class="review-header">
                    <div>
                        <div class="review-author">${review.author}</div>
                        ${this.renderStars(review.rating)}
                    </div>
                    <div class="review-date">${new Date(review.createdAt).toLocaleDateString()}</div>
                </div>
                <div class="review-text">${review.text}</div>
            </div>
        `).join('');
    }

    renderReviewsSummary(product, reviews, container) {
        const ratingCounts = [0, 0, 0, 0, 0];
        reviews.forEach(review => {
            ratingCounts[review.rating - 1]++;
        });

        container.innerHTML = `
            <div class="reviews-overview">
                <div class="overall-rating">
                    <div class="rating-number">${product.rating}</div>
                    ${this.renderStars(product.rating)}
                    <div>${product.reviewCount} reviews</div>
                </div>
                <div class="rating-breakdown">
                    ${ratingCounts.map((count, index) => {
                        const rating = 5 - index;
                        const percentage = product.reviewCount > 0 ? (count / product.reviewCount) * 100 : 0;
                        return `
                            <div class="rating-bar">
                                <div class="rating-bar-label">${rating} stars</div>
                                <div class="rating-bar-track">
                                    <div class="rating-bar-fill" style="width: ${percentage}%"></div>
                                </div>
                                <div class="rating-bar-count">${count}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    loadRelatedProducts(product) {
        const relatedContainer = document.getElementById('related-products');
        if (!relatedContainer) return;

        // Find related products (same category, different product)
        const related = this.productsDatabase
            .filter(p => p.category === product.category && p.id !== product.id)
            .slice(0, 4);

        relatedContainer.innerHTML = related.map(p => this.renderProductCard(p)).join('');
    }

    // Search and filtering functions
    handleSearch(event) {
        if (event.key === 'Enter') {
            this.performSearch();
        }
    }

    performSearch() {
        const searchTerm = document.getElementById('search-input')?.value?.trim();
        if (!searchTerm) return;

        this.showLoading();
        
        setTimeout(() => {
            const searchResults = this.productsDatabase.filter(product => 
                product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );

            // Navigate to search results (simulate category page)
            const searchCategory = {
                id: 'search',
                title: `Search Results for "${searchTerm}"`,
                slug: 'search',
                subcategories: []
            };

            this.currentCategoryProducts = searchResults;
            this.currentCategory = searchCategory;
            this.navigateToPage('category', searchCategory);
            
            this.hideLoading();
        }, 500);
    }

    filterBySubcategory(subcategorySlug) {
        if (!this.currentCategoryProducts) return;

        const filtered = this.currentCategoryProducts.filter(product => 
            product.subcategory === subcategorySlug
        );

        this.renderProducts(filtered);
    }

    applyFilters() {
        if (!this.currentCategoryProducts) return;

        let filtered = [...this.currentCategoryProducts];

        // Apply condition filters
        const conditionFilters = Array.from(document.querySelectorAll('.condition-filter:checked')).map(cb => cb.value);
        if (conditionFilters.length > 0) {
            filtered = filtered.filter(product => {
                const condition = product.condition.toLowerCase().replace(' ', '-');
                return conditionFilters.includes(condition);
            });
        }

        // Apply rating filters
        const ratingFilters = Array.from(document.querySelectorAll('.rating-filter:checked')).map(cb => parseInt(cb.value));
        if (ratingFilters.length > 0) {
            const minRating = Math.min(...ratingFilters);
            filtered = filtered.filter(product => product.rating >= minRating);
        }

        // Apply price range
        const priceMin = parseFloat(document.getElementById('price-min')?.value || 0);
        const priceMax = parseFloat(document.getElementById('price-max')?.value || 100);
        filtered = filtered.filter(product => product.price >= priceMin && product.price <= priceMax);

        this.renderProducts(filtered);
    }

    updatePriceRange() {
        const priceMin = document.getElementById('price-min');
        const priceMax = document.getElementById('price-max');
        const priceMinLabel = document.getElementById('price-min-label');
        const priceMaxLabel = document.getElementById('price-max-label');

        if (priceMin && priceMax && priceMinLabel && priceMaxLabel) {
            priceMinLabel.textContent = `£${priceMin.value}`;
            priceMaxLabel.textContent = `£${priceMax.value}`;
            
            // Apply filters after a short delay
            clearTimeout(this.priceFilterTimeout);
            this.priceFilterTimeout = setTimeout(() => this.applyFilters(), 300);
        }
    }

    renderProducts(products, page = 1) {
        const productsGrid = document.getElementById('category-products');
        const resultsCount = document.getElementById('results-count');
        
        if (!productsGrid) return;

        // Update results count
        if (resultsCount) {
            resultsCount.textContent = `${products.length} items`;
        }

        // Apply sorting
        const sortedProducts = this.sortProducts(products);

        // Apply pagination
        const startIndex = (page - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

        // Render products
        productsGrid.innerHTML = paginatedProducts.map(product => this.renderProductCard(product)).join('');

        // Render pagination
        this.renderPagination(products.length, page);
    }

    sortProducts(products) {
        const sortBy = document.getElementById('sort-select')?.value || 'relevance';
        
        switch (sortBy) {
            case 'price-low':
                return [...products].sort((a, b) => a.price - b.price);
            case 'price-high':
                return [...products].sort((a, b) => b.price - a.price);
            case 'rating':
                return [...products].sort((a, b) => b.rating - a.rating);
            case 'newest':
                return [...products].sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate));
            default:
                return products;
        }
    }

    renderPagination(totalItems, currentPage) {
        const pagination = document.getElementById('pagination');
        if (!pagination) return;

        const totalPages = Math.ceil(totalItems / this.itemsPerPage);
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        let paginationHtml = '';
        
        // Previous button
        paginationHtml += `
            <button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="app.goToPage(${currentPage - 1})">
                Previous
            </button>
        `;

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
                paginationHtml += `
                    <button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="app.goToPage(${i})">
                        ${i}
                    </button>
                `;
            } else if (i === currentPage - 3 || i === currentPage + 3) {
                paginationHtml += '<span class="page-ellipsis">...</span>';
            }
        }

        // Next button
        paginationHtml += `
            <button class="page-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="app.goToPage(${currentPage + 1})">
                Next
            </button>
        `;

        pagination.innerHTML = paginationHtml;
    }

    goToPage(page) {
        this.currentPageNum = page;
        if (this.currentCategoryProducts) {
            this.renderProducts(this.currentCategoryProducts, page);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Cart functions
    addToCart(productId) {
        const product = typeof productId === 'string' ? 
            this.productsDatabase.find(p => p.id === productId) : 
            productId;
            
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }

        this.saveCart();
        this.updateCartCount();
        this.showCartNotification(`Added ${product.title} to cart`);
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
        this.renderCartContent();
    }

    updateCartQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartCount();
                this.renderCartContent();
            }
        }
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    toggleCart() {
        const cartSidebar = document.getElementById('cart-sidebar');
        const cartOverlay = document.getElementById('cart-overlay');
        
        if (cartSidebar && cartOverlay) {
            const isOpen = cartSidebar.classList.contains('show');
            
            if (isOpen) {
                cartSidebar.classList.remove('show');
                cartOverlay.classList.remove('show');
                setTimeout(() => {
                    cartSidebar.classList.add('hidden');
                    cartOverlay.classList.add('hidden');
                }, 300);
            } else {
                cartSidebar.classList.remove('hidden');
                cartOverlay.classList.remove('hidden');
                setTimeout(() => {
                    cartSidebar.classList.add('show');
                    cartOverlay.classList.add('show');
                }, 10);
                this.renderCartContent();
            }
        }
    }

    renderCartContent() {
        const cartContent = document.getElementById('cart-content');
        if (!cartContent) return;

        if (this.cart.length === 0) {
            cartContent.innerHTML = `
                <div class="empty-cart">
                    <p>Your cart is empty</p>
                    <button class="btn btn--primary" onclick="app.navigateToPage('home'); app.toggleCart();">Start Shopping</button>
                </div>
            `;
            return;
        }

        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        cartContent.innerHTML = `
            <div class="cart-items">
                ${this.cart.map(item => `
                    <div class="cart-item">
                        <img src="${item.imageUrl}" alt="${item.title}" class="cart-item-image">
                        <div class="cart-item-info">
                            <div class="cart-item-title">${item.title}</div>
                            <div class="cart-item-price">£${item.price}</div>
                            <div class="cart-item-actions">
                                <button class="quantity-btn" onclick="app.updateCartQuantity('${item.id}', ${item.quantity - 1})">-</button>
                                <span class="quantity-display">${item.quantity}</span>
                                <button class="quantity-btn" onclick="app.updateCartQuantity('${item.id}', ${item.quantity + 1})">+</button>
                                <button class="btn btn--sm btn--outline" onclick="app.removeFromCart('${item.id}')" style="margin-left: auto;">Remove</button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="cart-footer">
                <div class="cart-total">
                    <strong>Total: £${total.toFixed(2)}</strong>
                </div>
                <button class="btn btn--primary btn--full-width" onclick="app.showCheckoutNotification()">
                    Checkout
                </button>
            </div>
        `;
    }

    showCartNotification(message) {
        // Simple notification - you could make this more sophisticated
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-success);
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    showCheckoutNotification() {
        alert('Checkout functionality would be implemented here. This is a demo application.');
    }

    // UI Helper functions
    updateBreadcrumb(items) {
        const breadcrumbList = document.getElementById('breadcrumb-list') || document.getElementById('product-breadcrumb');
        if (!breadcrumbList) return;

        breadcrumbList.innerHTML = items.map(item => `
            <li>
                ${item.current ? 
                    `<span class="current">${item.text}</span>` : 
                    `<a onclick="if(typeof ${item.action} === 'function') ${item.action}()">${item.text}</a>`
                }
            </li>
        `).join('');
    }

    setupFilters() {
        // Initialize price range
        const priceMin = document.getElementById('price-min');
        const priceMax = document.getElementById('price-max');
        
        if (priceMin && priceMax && this.currentCategoryProducts) {
            const prices = this.currentCategoryProducts.map(p => p.price);
            const minPrice = Math.floor(Math.min(...prices));
            const maxPrice = Math.ceil(Math.max(...prices));
            
            priceMin.min = minPrice;
            priceMin.max = maxPrice;
            priceMin.value = minPrice;
            
            priceMax.min = minPrice;
            priceMax.max = maxPrice;
            priceMax.value = maxPrice;
            
            this.updatePriceRange();
        }
    }

    toggleFilters() {
        const filtersSidebar = document.getElementById('filters-sidebar');
        const productsContent = document.querySelector('.products-content');
        
        if (filtersSidebar && productsContent) {
            filtersSidebar.classList.toggle('hidden');
            productsContent.classList.toggle('with-filters');
        }
    }

    toggleView(view) {
        const productsGrid = document.getElementById('category-products');
        const viewBtns = document.querySelectorAll('.view-btn');
        
        if (productsGrid) {
            productsGrid.classList.remove('grid-view', 'list-view');
            productsGrid.classList.add(`${view}-view`);
        }
        
        viewBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });
        
        this.filters.view = view;
    }

    handleSort() {
        if (this.currentCategoryProducts) {
            this.renderProducts(this.currentCategoryProducts, this.currentPageNum);
        }
    }

    clearFilters() {
        // Clear all filter inputs
        document.querySelectorAll('.condition-filter, .rating-filter').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Reset price range
        const priceMin = document.getElementById('price-min');
        const priceMax = document.getElementById('price-max');
        if (priceMin && priceMax) {
            priceMin.value = priceMin.min;
            priceMax.value = priceMax.max;
            this.updatePriceRange();
        }
        
        // Reapply filters
        this.applyFilters();
    }

    // Theme and UI functions
    toggleTheme() {
        const html = document.documentElement;
        const themeIcons = document.querySelectorAll('.theme-icon');
        
        const currentTheme = html.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-color-scheme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        themeIcons.forEach(icon => {
            icon.classList.toggle('hidden');
        });
    }

    toggleMobileMenu() {
        const mobileNav = document.getElementById('mobile-nav');
        if (mobileNav) {
            mobileNav.classList.toggle('hidden');
        }
    }

    closeMobileMenu() {
        const mobileNav = document.getElementById('mobile-nav');
        if (mobileNav && !mobileNav.classList.contains('hidden')) {
            mobileNav.classList.add('hidden');
        }
    }

    toggleDropdown(dropdownId) {
        const dropdown = document.getElementById(`${dropdownId}-dropdown`);
        if (dropdown) {
            // Close other dropdowns
            this.closeAllDropdowns();
            // Toggle current dropdown
            dropdown.classList.toggle('show');
        }
    }

    closeAllDropdowns() {
        document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
            dropdown.classList.remove('show');
        });
    }

    showLoading() {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.remove('hidden');
        }
    }

    hideLoading() {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
        }
    }

    // Wishlist functions (bonus feature)
    toggleWishlist(product) {
        const existingIndex = this.wishlist.findIndex(item => item.id === product.id);
        
        if (existingIndex > -1) {
            this.wishlist.splice(existingIndex, 1);
            this.showCartNotification('Removed from wishlist');
        } else {
            this.wishlist.push(product);
            this.showCartNotification('Added to wishlist');
        }
        
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    }
}

// Global functions for HTML onclick handlers
function navigateToPage(page, data) {
    app.navigateToPage(page, data);
}

function navigateToCategory(slug) {
    app.navigateToCategory(slug);
}

function toggleDropdown(id) {
    app.toggleDropdown(id);
}

function handleSearch(event) {
    app.handleSearch(event);
}

function performSearch() {
    app.performSearch();
}

function toggleCart() {
    app.toggleCart();
}

function toggleTheme() {
    app.toggleTheme();
}

function toggleMobileMenu() {
    app.toggleMobileMenu();
}

function toggleFilters() {
    app.toggleFilters();
}

function toggleView(view) {
    app.toggleView(view);
}

function handleSort() {
    app.handleSort();
}

function clearFilters() {
    app.clearFilters();
}

function addToCart(productOrId) {
    app.addToCart(productOrId);
}

function toggleWishlist(product) {
    app.toggleWishlist(product);
}

// Initialize theme from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-color-scheme', savedTheme);
        
        const themeIcons = document.querySelectorAll('.theme-icon');
        themeIcons.forEach(icon => {
            if ((savedTheme === 'dark' && icon.classList.contains('sun')) ||
                (savedTheme === 'light' && icon.classList.contains('moon'))) {
                icon.classList.add('hidden');
            } else {
                icon.classList.remove('hidden');
            }
        });
    }
});

// Add custom styles for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        font-weight: 500;
    }
`;
document.head.appendChild(notificationStyles);

// Global app instance
let app;

// Initialize the application and safely assign global handlers after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app = new ProductDataExplorer();
    window.currentProduct = null; // For product page context

    // Assign global functions to window to ensure they are available for HTML event handlers
    window.navigateToPage = (page, data) => app.navigateToPage(page, data);
    window.navigateToCategory = (slug) => app.navigateToCategory(slug);
    window.toggleDropdown = (id) => app.toggleDropdown(id);
    window.handleSearch = (event) => app.handleSearch(event);
    window.performSearch = () => app.performSearch();
    window.toggleCart = () => app.toggleCart();
    window.toggleTheme = () => app.toggleTheme();
    window.toggleMobileMenu = () => app.toggleMobileMenu();
    window.toggleFilters = () => app.toggleFilters();
    window.toggleView = (view) => app.toggleView(view);
    window.handleSort = () => app.handleSort();
    window.clearFilters = () => app.clearFilters();
    window.addToCart = (productOrId) => app.addToCart(productOrId);
    window.toggleWishlist = (product) => app.toggleWishlist(product);
    window.setCurrentProduct = (product) => { window.currentProduct = product; };
});