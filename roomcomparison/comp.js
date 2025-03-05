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

    function updateComparison() {
        const selectedRooms = Array.from(roomCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        if (selectedRooms.length === 0) {
            comparisonResults.innerHTML = '<p>Select rooms to compare</p>';
            return;
        }

        let comparisonHTML = `
            <div class="comparison-row comparison-header">
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
                <div class="comparison-row">
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
            <div class="comparison-row">
                <div>Base Price Per Night</div>
                ${selectedRooms.map(room => 
                    `<div class="price-tag">$${roomData[room].basePrice.toFixed(2)}</div>`
                ).join('')}
            </div>
            <div class="comparison-row">
                <div>Max Occupancy</div>
                ${selectedRooms.map(room => 
                    `<div>${roomData[room].maxOccupancy} Persons</div>`
                ).join('')}
            </div>
        `;

        comparisonResults.innerHTML = comparisonHTML;
    }

    roomCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateComparison);
    });

    // Initial state
    updateComparison();
});