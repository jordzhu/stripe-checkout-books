const getQueryVariable = (variable) => {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) == variable) {
          return decodeURIComponent(pair[1]);
      }
  }
  console.log('Query variable %s not found', variable);
};

// A reference to Stripe.js initialized with your real test publishable API key.
const stripe = Stripe("pk_test_51Ie8NmF4DpmDrbeQST1iGMigPywTTA8afN5qEl5OCId1NJViwQkFf6Hauv1pxeKwjTsVz910X5i17gcrfI8KSpEC006O3JCWHf");

// Disable the button until we have Stripe set up on the page
document.querySelector("button").disabled = true;
// Custom styling can be passed to options when creating an Element.
const style = {
  base: {
    // Add your base input styles here. For example:
    fontSize: '16px',
    color: '#32325d',
  },
};

// Create an instance of the card Element.
const elements = stripe.elements();

const card = elements.create('card', {style});

// Add an instance of the card Element into the `card-element` <div>.
card.mount('#card-element');

const form = document.getElementById('payment-form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const {token, error} = await stripe.createToken(card);

  if (error) {
    // Inform the customer that there was an error.
    const errorElement = document.getElementById('card-errors');
    errorElement.textContent = error.message;
  } else {
    // Send the token to your server.
    stripeTokenHandler(token);
  }
});

const stripeTokenHandler = (token) => {
  // Insert the token ID into the form so it gets submitted to the server
  const form = document.getElementById('payment-form');
  const hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeToken');
  hiddenInput.setAttribute('value', token.id);

  const hiddenInput2 = document.createElement('input');
  hiddenInput2.setAttribute('type', 'hidden');
  hiddenInput2.setAttribute('name', 'bookId');
  hiddenInput2.setAttribute('value', getQueryVariable('item'));

  form.appendChild(hiddenInput);
  form.appendChild(hiddenInput2);

  // Submit the form
  form.submit();
}