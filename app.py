import json
import os
import stripe

stripe.api_key = "sk_test_51Ie8NmF4DpmDrbeQ09d0jZTPzVk8NrlFeBbhvl3leKiGNtphNOFgBoyygoSXcSdyIDBO6X3QWqD4gKzyk6uFUQ7h00E81sNVmB"

from flask import Flask, request, render_template, jsonify

app = Flask(__name__,
  static_url_path='',
  template_folder=os.path.join(os.path.dirname(os.path.abspath(__file__)), "views"),
  static_folder=os.path.join(os.path.dirname(os.path.abspath(__file__)), "public"))

booksDB = {'1': {'title': 'The Art of Doing Science and Engineering', 'amount': 2300}, '2': {'title': 'The Making of Prince of Persia: Journals 1985-1993', 'amount': 2500}, '3': {'title': 'Working in Public: The Making and Maintenance of Open Source', 'amount': 2800}}

@app.route('/charge', methods=['POST'])
def create_payment():
    try:
        chargedAmount = booksDB[request.form['bookId']]['amount']
        charge = stripe.Charge.create(
            amount=chargedAmount,
            currency='usd',
            source=request.form['stripeToken']
        )
        return render_template('success.html', amount=chargedAmount, chargeId=charge['id'])
    except Exception as e:
        return jsonify(error=str(e)), 403

# Home route
@app.route('/', methods=['GET'])
def index():
  return render_template('index.html')

# Checkout route
@app.route('/checkout', methods=['GET'])
def checkout():
  # Just hardcoding amounts here to avoid using a database
  item = request.args.get('item')
  title = None
  amount = None
  error = None

  if item in booksDB:
    title = booksDB[item]['title']
    amount = booksDB[item]['amount']
  else:
    # Included in layout view, feel free to assign error
    error = 'No item selected'

  return render_template('checkout.html', title=title, amount=amount, error=error)

if __name__ == '__main__':
  app.run(port=5000, host='0.0.0.0', debug=True)