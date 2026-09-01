const http = require('http');

const BASE_URL = 'http://localhost:3000';

function request(options, postData = null, cookie = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(options.path, BASE_URL);
    const reqOptions = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(cookie ? { Cookie: cookie } : {}),
        ...(options.headers || {}),
      },
    };

    const req = http.request(reqOptions, (res) => {
      let data = '';
      const setCookie = res.headers['set-cookie'];
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        let json = null;
        try {
          json = JSON.parse(data);
        } catch (e) {
          json = data;
        }
        resolve({
          status: res.statusCode,
          headers: res.headers,
          setCookie: setCookie ? setCookie.map((c) => c.split(';')[0]).join('; ') : null,
          data: json,
        });
      });
    });

    req.on('error', (err) => reject(err));
    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

async function runTests() {
  console.log('============ STARTING EDUNEXA E2E SUITE ============');
  let passed = 0;
  let failed = 0;
  const failures = [];

  function assert(condition, message) {
    if (condition) {
      console.log(`✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${message}`);
      failed++;
      failures.push(message);
    }
  }

  try {
    // 1. PUBLIC PAGES
    console.log('\n--- 1. Testing Public Routes ---');
    const publicRoutes = [
      '/',
      '/about',
      '/courses',
      '/faculty',
      '/admissions',
      '/results',
      '/events',
      '/gallery',
      '/contact',
      '/login',
      '/register',
    ];

    for (const route of publicRoutes) {
      const res = await request({ path: route });
      assert(res.status === 200, `GET ${route} returns status 200 (Got ${res.status})`);
    }

    // 2. PUBLIC API ENDPOINTS
    console.log('\n--- 2. Testing Public API Endpoints ---');
    const getCourses = await request({ path: '/api/courses' });
    assert(getCourses.status === 200 && getCourses.data && getCourses.data.success, 'GET /api/courses returns courses list');

    const getNotices = await request({ path: '/api/notices' });
    assert(getNotices.status === 200 && getNotices.data && getNotices.data.success, 'GET /api/notices returns notices');

    // 3. FORM VALIDATION & SUBMISSION
    console.log('\n--- 3. Testing Form Validation & Submissions ---');
    // Contact Form - Invalid
    const contactBad = await request({ path: '/api/contact', method: 'POST' }, { name: 'Test' });
    assert(contactBad.status === 400, 'POST /api/contact fails validation without email/message (Got 400)');

    // Contact Form - Valid
    const contactGood = await request(
      { path: '/api/contact', method: 'POST' },
      { name: 'John Doe', email: 'john@example.com', subject: 'Inquiry', message: 'Hello EduNexa' }
    );
    assert(contactGood.status === 200 || contactGood.status === 201, 'POST /api/contact submits successfully');

    // Admissions Form - Valid
    const admissionGood = await request(
      { path: '/api/admissions', method: 'POST' },
      { studentName: 'Jane Smith', email: 'jane@example.com', phone: '+1234567890', courseInterest: 'IIT-JEE' }
    );
    assert(admissionGood.status === 200 || admissionGood.status === 201, 'POST /api/admissions submits lead successfully');

    // 4. AUTHENTICATION & LOGIN
    console.log('\n--- 4. Testing Authentication Flow ---');
    // Test default admin login
    const adminLogin = await request(
      { path: '/api/auth/login', method: 'POST' },
      { email: 'admin@edunexa.edu', password: 'Admin@1234' }
    );
    assert(adminLogin.status === 200 && adminLogin.data && adminLogin.data.success, 'Admin Login with default credentials succeeds');
    const adminCookie = adminLogin.setCookie;

    // Test invalid login
    const badLogin = await request(
      { path: '/api/auth/login', method: 'POST' },
      { email: 'admin@edunexa.edu', password: 'WrongPassword' }
    );
    assert(badLogin.status === 401, 'Login with wrong password returns 401 Unauthorized');

    // Register new student user
    const testEmail = `student_${Date.now()}@edunexa.edu`;
    const registerRes = await request(
      { path: '/api/auth/register', method: 'POST' },
      { name: 'Test Student', email: testEmail, password: 'StudentPass123!', role: 'admin' } // Attempt role hack
    );
    assert(registerRes.status === 201 && registerRes.data && registerRes.data.success, 'Student Registration succeeds');
    assert(registerRes.data && registerRes.data.user && registerRes.data.user.role === 'student', 'Security Check: Public registration role is forced to student');
    const studentCookie = registerRes.setCookie;

    // Verify /api/auth/me for student
    const studentMe = await request({ path: '/api/auth/me' }, null, studentCookie);
    assert(studentMe.status === 200 && studentMe.data && studentMe.data.user?.email === testEmail, 'GET /api/auth/me returns registered student info');

    // 5. STUDENT PROFILE UPDATE TEST
    console.log('\n--- 5. Testing Student Profile Update ---');
    const updateProfileRes = await request(
      { path: '/api/student/profile', method: 'PUT' },
      { name: 'Aarav Garg Updated', phone: '+1 (555) 987-6543', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6' },
      studentCookie
    );
    assert(updateProfileRes.status === 200 && updateProfileRes.data && updateProfileRes.data.data?.name === 'Aarav Garg Updated', 'Student Profile update succeeds and returns updated name');

    const getProfileRes = await request({ path: '/api/student/profile' }, null, updateProfileRes.setCookie || studentCookie);
    assert(getProfileRes.status === 200 && getProfileRes.data && getProfileRes.data.data.name === 'Aarav Garg Updated', 'GET /api/student/profile returns persisted updated name');

    // 6. ROLE-BASED ACCESS CONTROL (RBAC)
    console.log('\n--- 6. Testing RBAC Authorization ---');
    // Student attempting Admin API route
    const studentAdminApi = await request({ path: '/api/admin/courses' }, null, studentCookie);
    assert(studentAdminApi.status === 403, 'Student denied access to /api/admin/courses (Got 403)');

    // Unauthenticated user attempting Admin API route
    const unauthAdminApi = await request({ path: '/api/admin/courses' });
    assert(unauthAdminApi.status === 403, 'Unauthenticated user denied access to /api/admin/courses (Got 403)');

    // Admin accessing Admin API route
    const adminApiRes = await request({ path: '/api/admin/courses' }, null, adminCookie);
    assert(adminApiRes.status === 200 && adminApiRes.data && adminApiRes.data.success, 'Admin allowed access to /api/admin/courses (Got 200)');

    // 7. COURSE CRUD LIFECYCLE
    console.log('\n--- 7. Testing Courses CRUD Lifecycle ---');
    // Create Course A
    const createA = await request(
      { path: '/api/admin/courses', method: 'POST' },
      { title: 'Test Course Alpha', category: 'Engineering', duration: '1 Year', fee: 5000 },
      adminCookie
    );
    assert(createA.status === 201 && createA.data && createA.data.success, 'Admin creates Course Alpha');
    const courseAId = createA.data?.data?.id || createA.data?.data?._id;

    // Create Course B
    const createB = await request(
      { path: '/api/admin/courses', method: 'POST' },
      { title: 'Test Course Beta', category: 'Medical', duration: '2 Years', fee: 8000 },
      adminCookie
    );
    assert(createB.status === 201 && createB.data && createB.data.success, 'Admin creates Course Beta');
    const courseBId = createB.data?.data?.id || createB.data?.data?._id;

    if (courseBId) {
      // Update Course B
      const updateB = await request(
        { path: '/api/admin/courses', method: 'PUT' },
        { id: courseBId, title: 'Test Course Beta (Updated)', fee: 8500 },
        adminCookie
      );
      assert(updateB.status === 200 && updateB.data && updateB.data.success, 'Admin updates Course Beta title and fee');

      // Delete Course B
      const deleteB = await request(
        { path: `/api/admin/courses?id=${courseBId}`, method: 'DELETE' },
        null,
        adminCookie
      );
      assert(deleteB.status === 200 && deleteB.data && deleteB.data.success, 'Admin deletes Course Beta');
    }

    // Verify Course A still exists and Course B is gone
    const verifyCourses = await request({ path: '/api/courses' });
    if (verifyCourses.data && Array.isArray(verifyCourses.data.data)) {
      const titles = verifyCourses.data.data.map((c) => c.title);
      assert(titles.includes('Test Course Alpha'), 'Course Alpha persists after deletion of Course Beta');
      assert(!titles.includes('Test Course Beta (Updated)'), 'Course Beta is deleted from system');
    }

    // Cleanup Course A
    if (courseAId) {
      await request({ path: `/api/admin/courses?id=${courseAId}`, method: 'DELETE' }, null, adminCookie);
    }

    // 8. FACULTY, EVENT, NOTICE, MEDIA CRUD
    console.log('\n--- 8. Testing Other Management CRUD Endpoints ---');
    // Faculty
    const createFac = await request(
      { path: '/api/admin/faculty', method: 'POST' },
      { name: 'Dr. Alan Turing', title: 'Senior Professor', department: 'Computer Science' },
      adminCookie
    );
    assert(createFac.status === 201 && createFac.data && createFac.data.success, 'Admin creates Faculty member');
    const facId = createFac.data?.data?.id || createFac.data?.data?._id;
    if (facId) {
      await request({ path: `/api/admin/faculty?id=${facId}`, method: 'DELETE' }, null, adminCookie);
    }

    // Events
    const createEvent = await request(
      { path: '/api/admin/events', method: 'POST' },
      { title: 'Annual Tech Summit', category: 'Workshop', date: '2026-11-15' },
      adminCookie
    );
    assert(createEvent.status === 201 && createEvent.data && createEvent.data.success, 'Admin creates Event');
    const eventId = createEvent.data?.data?.id || createEvent.data?.data?._id;
    if (eventId) {
      await request({ path: `/api/admin/events?id=${eventId}`, method: 'DELETE' }, null, adminCookie);
    }

    // Notices
    const createNotice = await request(
      { path: '/api/admin/notices', method: 'POST' },
      { title: 'Holiday Announcement', content: 'Campus closed on Friday.', audience: 'All' },
      adminCookie
    );
    assert(createNotice.status === 201 && createNotice.data && createNotice.data.success, 'Admin creates Notice');
    const noticeId = createNotice.data?.data?.id || createNotice.data?.data?._id;
    if (noticeId) {
      await request({ path: `/api/admin/notices?id=${noticeId}`, method: 'DELETE' }, null, adminCookie);
    }

    // 9. LOGOUT TEST
    console.log('\n--- 9. Testing Logout Behavior ---');
    const logoutRes = await request({ path: '/api/auth/logout', method: 'POST' }, null, studentCookie);
    assert(logoutRes.status === 200 && logoutRes.data && logoutRes.data.success, 'Logout returns success status');

    const expiredCookie = logoutRes.setCookie;
    const checkLoggedOut = await request({ path: '/api/auth/me' }, null, expiredCookie);
    assert(checkLoggedOut.status === 401 || (checkLoggedOut.data && checkLoggedOut.data.user === null), 'User session is cleared after logout (Got 401 or null user)');

  } catch (err) {
    console.error('CRITICAL UNHANDLED TEST FAILURE:', err);
    failed++;
  }

  console.log('\n====================================================');
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED.`);
  if (failed > 0) {
    console.log('FAILURES ENCOUNTERED:');
    failures.forEach((f, i) => console.log(`  ${i + 1}. ${f}`));
  }
  console.log('====================================================');
}

// Allow server 2 seconds to warm up if needed
setTimeout(runTests, 2000);
