
const TARGET_URL = "https://retrograde-lunar.vercel.app";

async function checkSecurity() {
  console.log(`🛡️  Starting Security Check on ${TARGET_URL}\n`);

  // 1. Check Security Headers
  console.log("1️⃣  Checking Security Headers...");
  try {
    const res = await fetch(TARGET_URL);
    const headers = res.headers;
    
    // List of headers to check
    const checks = [
      { name: 'strict-transport-security', label: 'HSTS' },
      { name: 'x-content-type-options', label: 'X-Content-Type-Options' },
      { name: 'x-frame-options', label: 'X-Frame-Options' },
      { name: 'x-xss-protection', label: 'X-XSS-Protection' },
      { name: 'content-security-policy', label: 'CSP' },
    ];

    checks.forEach(check => {
      const val = headers.get(check.name);
      if (val) {
        console.log(`✅ ${check.label}: Present (${val.substring(0, 40)}${val.length > 40 ? '...' : ''})`);
      } else {
        console.log(`⚠️  ${check.label}: Missing (Recommended for production)`);
      }
    });
  } catch (err) {
    console.error("❌ Failed to fetch headers:", err);
  }

  console.log("\n----------------------------------------\n");

  // 2. Access Control Test (Unauthorized Access)
  console.log("2️⃣  Testing Access Control (Unauthorized to /dashboard)...");
  try {
    // We expect a redirect (307/308) to /login or a 401/403.
    // fetch follows redirects by default, so we might land on /login.
    const startUrl = `${TARGET_URL}/dashboard`;
    const res = await fetch(startUrl, { redirect: 'manual' }); 
    
    // If manual redirect handling:
    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get('location');
      console.log(`✅ Protected Route Redirects: ${res.status} -> ${location}`);
      if (location && location.includes('login')) {
         console.log("   -> Correctly redirects to login.");
      } else {
         console.log("   -> Warning: Redirects, but not clearly to login page.");
      }
    } else if (res.status === 401 || res.status === 403) {
      console.log(`✅ Protected Route Blocks Access: Status ${res.status}`);
    } else if (res.status === 200) {
      console.log(`❌ CRITICAL: /dashboard returned 200 OK without auth info! (Check if it renders the real dashboard)`);
      // It might be the login page content served at that URL if middleware rewrites, 
      // but usually standard protection redirects.
    } else {
      console.log(`❓ Unexpected Status: ${res.status}`);
    }

  } catch (err) {
     console.error("❌ Access Control Test Error:", err);
  }
}

checkSecurity();
