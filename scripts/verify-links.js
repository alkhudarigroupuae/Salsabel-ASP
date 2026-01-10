const http = require('http');

const baseUrl = 'http://localhost:3000';
const routes = [
  '/',
  '/shop',
  '/cart',
  '/checkout', // Might redirect if empty cart, but checking status is good
  '/about-us',
  '/contact-us',
  '/privacy-policy',
  '/terms-and-conditions',
  '/login',
  '/my-account',
  '/bmw-spare-parts', // Category page
];

async function checkRoute(route) {
  return new Promise((resolve) => {
    let body = '';
    const url = route.startsWith('http') ? route : baseUrl + route;
    
    http.get(url, (res) => {
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        // Try to parse JSON if it looks like it
        let json = null;
        try { json = JSON.parse(body); } catch (e) {}
        
        resolve({ route, status: res.statusCode, body, json });
      });
    }).on('error', (e) => {
      resolve({ route, status: 'ERROR', error: e.message });
    });
  });
}

function extractProductLink(html) {
  const match = html.match(/href="\/product\/([^"]+)"/);
  return match ? `/product/${match[1]}` : null;
}

async function runVerification() {
  console.log('Starting verification of key routes...');
  let hasError = false;

  // 1. Verify Static Routes
  for (const route of routes) {
    const result = await checkRoute(route);
    if (result.status === 200) {
      console.log(`✅ ${result.route} - OK`);
    } else if (result.status >= 300 && result.status < 400) {
       console.log(`⚠️ ${result.route} - Redirect (${result.status})`);
    } else {
      console.log(`❌ ${result.route} - Failed (${result.status})`);
      hasError = true;
    }
  }

  // 2. Verify API and Dynamic Product Page
  console.log('\nVerifying API and Dynamic Product...');
  const apiResult = await checkRoute('/api/products?featured=true');
  
  if (apiResult.status === 200 && apiResult.json && Array.isArray(apiResult.json) && apiResult.json.length > 0) {
    console.log(`✅ /api/products - OK (Found ${apiResult.json.length} products)`);
    
    const firstProduct = apiResult.json[0];
    const productSlug = firstProduct.slug || firstProduct.id;
    const productUrl = `/product/${productSlug}`;
    
    console.log(`   Testing Product Page: ${productUrl}`);
    const productResult = await checkRoute(productUrl);
    
    if (productResult.status === 200) {
        console.log(`✅ ${productUrl} - OK`);
    } else {
        console.log(`❌ ${productUrl} - Failed (${productResult.status})`);
        hasError = true;
    }

  } else {
    console.log(`❌ /api/products - Failed or Empty`);
    console.log(`   Status: ${apiResult.status}`);
    console.log(`   Body Preview: ${apiResult.body.substring(0, 100)}`);
    hasError = true;
  }

  if (hasError) {
    console.log('\nSome routes failed. Please check the logs above.');
    process.exit(1);
  } else {
    console.log('\nAll key routes are accessible!');
  }
}

runVerification();
