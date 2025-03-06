document.addEventListener('DOMContentLoaded', () => {
    const roomData = {
        'luxury-suite': {
            name: 'Luxury Suite',
            basePrice: 299.99,
            features: [
                'King Size Bed',
                'Private Balcony',
                'Jacuzzi',
                'City View',
                'Free WiFi',
                'Room Service'
            ],
            maxOccupancy: 2
        },
        'deluxe-room': {
            name: 'Deluxe Room',
            basePrice: 199.99,
            features: [
                'Queen Size Bed',
                'Work Desk',
                'Mini Fridge',
                'City View',
                'Free WiFi'
            ],
            maxOccupancy: 2
        },
        'family-suite': {
            name: 'Family Suite',
            basePrice: 249.99,
            features: [
                'Two Bedrooms',
                'Living Area',
                'Kitchenette',
                'Two Bathrooms',
                'Free WiFi',
                'Extra Beds Available'
            ],
            maxOccupancy: 4
        }
    };

    const roomCheckboxes = document.querySelectorAll('input[name="room"]');
    const comparisonResults = document.getElementById('comparison-results');
    
    function isMobileView() {
        return window.innerWidth < 768;
    }

    function updateComparison() {
        const selectedRooms = Array.from(roomCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        if (selectedRooms.length === 0) {
            comparisonResults.innerHTML = '<p class="text-center p-4">Select rooms to compare</p>';
            return;
        }

        if (isMobileView()) {
            // Mobile card-based layout
            let comparisonHTML = '';
            
            selectedRooms.forEach(room => {
                const roomInfo = roomData[room];
                
                comparisonHTML += `
                    <div class="mobile-card">
                        <div class="mobile-card-header">${roomInfo.name}</div>
                        <div class="mobile-card-content">
                `;
                
                // Features
                roomInfo.features.forEach(feature => {
                    comparisonHTML += `
                        <div class="mobile-feature-row">
                            <span>${feature}</span>
                            <span class="feature-highlight">✓</span>
                        </div>
                    `;
                });
                
                // Get features this room doesn't have
                const allFeatures = new Set(
                    selectedRooms.flatMap(r => roomData[r].features)
                );
                
                const missingFeatures = [...allFeatures].filter(
                    feature => !roomInfo.features.includes(feature)
                );
                
                missingFeatures.forEach(feature => {
                    comparisonHTML += `
                        <div class="mobile-feature-row">
                            <span>${feature}</span>
                            <span class="feature-unavailable">✗</span>
                        </div>
                    `;
                });
                
                comparisonHTML += `
                        <div class="mobile-price-row">
                            <span>Base Price Per Night</span>
                            <span class="price-tag">$${roomInfo.basePrice.toFixed(2)}</span>
                        </div>
                        <div class="mobile-feature-row">
                            <span>Max Occupancy</span>
                            <span>${roomInfo.maxOccupancy} Persons</span>
                        </div>
                    </div>
                </div>
                `;
            });
            
            comparisonResults.innerHTML = comparisonHTML;
        } else {
            // Desktop grid-based layout
            const columnCount = selectedRooms.length + 1; // +1 for feature name column
            
            // Create header row
            let comparisonHTML = `
                <div class="comparison-row comparison-header" style="grid-template-columns: repeat(${columnCount}, 1fr);">
                    <div>Feature</div>
                    ${selectedRooms.map(room => `<div>${roomData[room].name}</div>`).join('')}
                </div>
            `;

            // Compare all standard features
            const allFeatures = new Set(
                selectedRooms.flatMap(room => roomData[room].features)
            );

            allFeatures.forEach(feature => {
                comparisonHTML += `
                    <div class="comparison-row" style="grid-template-columns: repeat(${columnCount}, 1fr);">
                        <div>${feature}</div>
                        ${selectedRooms.map(room => 
                            `<div class="${
                                roomData[room].features.includes(feature) 
                                ? 'feature-highlight' 
                                : 'feature-unavailable'
                            }">
                                ${roomData[room].features.includes(feature) ? '✓' : '✗'}
                            </div>`
                        ).join('')}
                    </div>
                `;
            });

            // Price and Occupancy Comparison
            comparisonHTML += `
                <div class="comparison-row" style="grid-template-columns: repeat(${columnCount}, 1fr);">
                    <div>Base Price Per Night</div>
                    ${selectedRooms.map(room => 
                        `<div class="price-tag">$${roomData[room].basePrice.toFixed(2)}</div>`
                    ).join('')}
                </div>
                <div class="comparison-row" style="grid-template-columns: repeat(${columnCount}, 1fr);">
                    <div>Max Occupancy</div>
                    ${selectedRooms.map(room => 
                        `<div>${roomData[room].maxOccupancy} Persons</div>`
                    ).join('')}
                </div>
            `;

            comparisonResults.innerHTML = comparisonHTML;
        }
    }

    roomCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateComparison);
    });

    // Initial state
    updateComparison();
    
    // Resize handler for adjusting columns on window resize
    window.addEventListener('resize', updateComparison);
});