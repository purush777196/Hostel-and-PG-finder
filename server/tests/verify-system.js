import http from 'http';
import app from '../src/app.js';
import { connectDB, disconnectDB } from '../src/config/db.js';
import { validateEnv } from '../src/utils/envValidate.js';

async function runVerification() {
  console.log('--- Starting System Verification ---');
  let failures = 0;

  // 1. Verify Environment Validation
  try {
    const envResult = validateEnv();
    if (envResult.isValid) {
      console.log('✔ [PASS] Environment validation executed successfully');
    } else {
      console.error('✘ [FAIL] Environment validation failed');
      failures++;
    }
  } catch (err) {
    console.error('✘ [FAIL] Environment validation threw error:', err.message);
    failures++;
  }

  // 2. Verify MongoDB Graceful Connection Handling
  try {
    const dbConn = await connectDB();
    console.log('✔ [PASS] MongoDB connection handled gracefully (resilient to offline state)');
    await disconnectDB();
  } catch (err) {
    console.error('✘ [FAIL] MongoDB connection threw unhandled error:', err.message);
    failures++;
  }

  // 3. Start ephemeral test server to verify HTTP, CORS, and Headers
  const testPort = 5055;
  const server = http.createServer(app);

  await new Promise((resolve) => server.listen(testPort, resolve));
  console.log(`Test server running on port ${testPort}`);

  // 4. Test GET /api/health
  try {
    const res = await fetch(`http://localhost:${testPort}/api/health`, {
      headers: {
        'Origin': 'http://localhost:5173',
      },
    });

    const status = res.status;
    const body = await res.json();
    const corsHeader = res.headers.get('access-control-allow-origin');

    if (status === 200) {
      console.log('✔ [PASS] GET /api/health returned HTTP 200');
    } else {
      console.error(`✘ [FAIL] GET /api/health returned HTTP ${status}`);
      failures++;
    }

    if (body.success === true && body.message === 'Hostel and PG Finder API is running') {
      console.log('✔ [PASS] Exact JSON payload matched:', JSON.stringify(body));
    } else {
      console.error('✘ [FAIL] JSON payload mismatch:', JSON.stringify(body));
      failures++;
    }

    if (corsHeader === 'http://localhost:5173' || corsHeader === '*') {
      console.log(`✔ [PASS] CORS origin correctly allowed: ${corsHeader}`);
    } else {
      console.error(`✘ [FAIL] CORS origin header unexpected: ${corsHeader}`);
      failures++;
    }
  } catch (err) {
    console.error('✘ [FAIL] Request to /api/health failed:', err.message);
    failures++;
  }

  // 5. Test 404 Route
  try {
    const res404 = await fetch(`http://localhost:${testPort}/api/unknown-endpoint`);
    const body404 = await res404.json();
    if (res404.status === 404 && body404.success === false) {
      console.log('✔ [PASS] 404 handler returned HTTP 404 with structured error');
    } else {
      console.error(`✘ [FAIL] 404 test failed. Status: ${res404.status}`);
      failures++;
    }
  } catch (err) {
    console.error('✘ [FAIL] 404 route test failed:', err.message);
    failures++;
  }

  // Close server
  await new Promise((resolve) => server.close(resolve));
  console.log('Test server closed cleanly.');

  if (failures === 0) {
    console.log('\n--- All System Verifications PASSED (0 failures) ---');
    process.exit(0);
  } else {
    console.error(`\n--- System Verification FAILED (${failures} failures) ---`);
    process.exit(1);
  }
}

runVerification();
