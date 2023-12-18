// script.js
document.getElementById('invoiceForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let invoiceData = {
        from: document.getElementById('from').value,
        to: document.getElementById('to').value,
        date: document.getElementById('date').value,
        due_date: document.getElementById('due_date').value,
        items: [
            {
                name: document.getElementById('name').value,
                quantity: parseInt(document.getElementById('quantity').value, 10),
                unit_cost: parseFloat(document.getElementById('unit_cost').value)
            }
        ]
    };

    fetch('https://invoice-generator.com', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.blob();
    })
    .then(blob => {
        // Create a link to download the invoice
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'invoice.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
        console.error('Error:', error);
        document.getElementById('result').innerText = 'An error occurred: ' + error.message;
    });
});