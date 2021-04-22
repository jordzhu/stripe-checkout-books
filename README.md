# Stripe Press Shop - Adding Payments Functionality via Stripe

This solution works by using the Stripe "Charges" API along with Stripe Elements to fulfill a customer's order. It first gets a customer's payment information by using Elements, where Elements is an easily-customizable set of UI components focused on checkout. In our case, we use the Card Element to collect credit card information. Then, we tokenize the information using Stripe.js, and submit form data that includes the token, as well as the amount to charge. Finally, the token creates a charge via the Charge API, and if the card's information is valid, the payment is accepted. We are then able to retrieve the charge ID from the Charge object response.

When working through this problem, I first made sure I thoroughly understood the problem and requirements. The major requirements were to use Stripe Elements to purchase the item selected, and to display a confirmation with the total amount charged and Stripe charge ID. I read up on very helpful documentation regarding Stripe Elements (https://stripe.com/docs/stripe-js) and explored some sample code on the Stripe Github page (https://github.com/stripe/elements-examples/blob/master/js/example3.js). I then looked up which APIs could be used to purchase an item and found that I had three options: Stripe Checkout, PaymentIntents, and Charge. I chose the Charge API, since only a Charge object has a charge ID. I then read up on sample use cases of the Charge API (https://stripe.com/docs/payments/charges-api).

One challenge I had was making sense of all of the documentation I had just read, but reading through sample use cases of Stripe Elements as well as the Charge API made it a lot easier. The other challenges I faced were mainly small technical bugs regarding things I'd forgotten about HTML and Python. For example, I had forgotten that although the form has

    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('value', token.id);

accessing this token is done through `request.form['stripeToken']`, not `request.form['value']`. There were many of these bugs that I worked through, but turning on debug mode and print statements helps a ton!

This is just the bare-bones functionality of a checkout process using Stripe's Charge API and Stripe Elements. If I were to extend this functionality, I would add a couple features as a next step: error handling, refunds and cancellations, and adding more personal information via Stripe Elements.

There can definitely be more features added to this checkout process, but I chose those 3 as they are the most essential. Currently, when a bad card number is the input (such as 4000 0000 0000 9995), there is no page for errors, which leads to a bad customer experience, and lower usage of the site. We also need to account for when a customer wants to immediately cancel an order before it has shipped out, or request a refund. Lastly, this site would need to request for more than just a card number, date, and CVC - such as name, email, address, and phone number. This is necessary information that the book selling site would need to have in order to ship out the books, as well as email or text any confirmations regarding the order.
