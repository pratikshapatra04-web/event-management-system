import { getRecommendations } from "../Controllers/recommendationController.js";

const test = async (budget, location, guestCount, eventType) => {
  console.log(`\n=============================================`);
  console.log(`TESTING: Budget: ${budget}, Location: ${location}, Guests: ${guestCount}, Event: ${eventType}`);
  console.log(`=============================================`);
  
  const req = {
    body: {
      budget,
      eventType,
      guestCount,
      location
    }
  };

  let responseData = null;
  const res = {
    status: function(code) {
      this.statusCode = code;
      return this;
    },
    json: function(data) {
      responseData = data;
      return this;
    }
  };

  await getRecommendations(req, res);

  if (res.statusCode !== 200 || !responseData.success) {
    console.error("Failed!", responseData);
    return;
  }

  const { venue, caterer, decorator, products } = responseData.data.recommendations;
  const { total_estimated_cost } = responseData.data.pricing;

  console.log(`VENUE:      ${venue.venue_name} (Price: ${venue.price_per_day}, Rating: ${venue.rating}, Capacity: ${venue.capacity})`);
  console.log(`CATERER:    ${caterer.service_name} (Price: ${caterer.package_price}, Rating: ${caterer.rating})`);
  console.log(`DECORATOR:  ${decorator.service_name} (Price: ${decorator.package_price}, Rating: ${decorator.rating})`);
  console.log(`PRODUCTS:   ${products.map(p => `${p.product_name} (${p.rental_price})`).join(', ')}`);
  console.log(`TOTAL COST: ${total_estimated_cost}`);
};

const runAll = async () => {
  await test(150000, "Kolkata", 150, "Wedding");
  await test(300000, "Kolkata", 150, "Wedding");
  await test(500000, "Kolkata", 150, "Wedding");
  await test(850000, "Kolkata", 150, "Wedding");
};

runAll().catch(console.error);
