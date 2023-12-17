// script.js
document.getElementById('invoiceForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let invoiceData = {
        to: document.getElementById('to').value,
        from: document.getElementById('from').value,
        invoice_date: document.getElementById('invoiceDate').value,
        due_date: document.getElementById('dueDate').value,
        items: [
            {
                name: document.getElementById('itemDescription').value,
                quantity: parseInt(document.getElementById('quantity').value, 10),
                unit_cost: parseFloat(document.getElementById('unitPrice').value)
            }
        ]
    };

    fetch('https://invoice-generator.com', {
        method: 'POST',
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