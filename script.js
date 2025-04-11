const pricePer100K = 0.99;
const pricePerUnit = pricePer100K / 100000;

function selectCurrency(amount) {
  const price = (pricePerUnit * amount).toFixed(2);
  document.getElementById('custom-price').textContent = price;
}

function updateCustomPrice() {
  const customAmount = parseFloat(document.getElementById('custom-amount').value);
  if (isNaN(customAmount) || customAmount <= 0) {
    document.getElementById('custom-price').textContent = '0.00';
  } else {
    const price = (pricePerUnit * customAmount).toFixed(2);
    document.getElementById('custom-price').textContent = price;
  }
}

async function triggerPayment() {
  const amount = parseFloat(document.getElementById('custom-price').textContent);
  if (isNaN(amount) || amount <= 0) {
    alert('Please select a valid amount.');
    return;
  }

  const response = await fetch('http://localhost:5000/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount }),
  });

  const session = await response.json();
  const stripe = Stripe('pk_test_51RCN4OPRHC7jcWnUpBPFBn5qwZBeepmXBEpz1MBDU3Q5kSATAKAtx5Yu04huzk1TTlGFRcrkmbNcJky7u9DhlzmI00MlQAplBZ'); // Replace with your real Stripe public key
  stripe.redirectToCheckout({ sessionId: session.id });
}

function openSection(section) {
  const sections = document.querySelectorAll('.details-section');
  sections.forEach(sec => sec.style.display = 'none');
  document.getElementById(`${section}-section`).style.display = 'block';
}

function updateTurtlePrice() {
  const count = parseInt(document.getElementById('turtle-count').value);
  const price = (count * 1.12).toFixed(2);
  document.getElementById('turtle-price').textContent = price;
}

window.onload = () => {
  document.getElementById('currency-section').style.display = 'block';
};
