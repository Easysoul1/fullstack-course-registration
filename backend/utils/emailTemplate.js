export function generateEmailHTML(data) {
  const { fullName, email, mobileNumber, fatherName, motherName, course, dateOfBirth, gender, address } = data;
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Course Registration - SmartDesignHub</title>
  <style>
    body {
      font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #1A2238;
      background-color: #FAFAF9;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #0D7377 0%, #10B981 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
    }
    .header p {
      margin: 10px 0 0;
      font-size: 16px;
      opacity: 0.95;
    }
    .content {
      padding: 30px;
    }
    .section {
      margin-bottom: 25px;
    }
    .section-title {
      color: #0D7377;
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 15px;
      padding-bottom: 8px;
      border-bottom: 2px solid #0D7377;
    }
    .info-row {
      display: flex;
      padding: 10px 0;
      border-bottom: 1px solid #F3F4F6;
    }
    .info-label {
      font-weight: 600;
      color: #4A5568;
      width: 180px;
      flex-shrink: 0;
    }
    .info-value {
      color: #1A2238;
      flex: 1;
    }
    .footer {
      background: #F3F4F6;
      padding: 20px 30px;
      text-align: center;
      font-size: 14px;
      color: #4A5568;
    }
    .footer a {
      color: #0D7377;
      text-decoration: none;
      font-weight: 600;
    }
    .badge {
      display: inline-block;
      background: #10B981;
      color: white;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎓 New Course Registration</h1>
      <p>SmartDesignHub - 2026 Tech Courses</p>
      <div class="badge">Registration Received</div>
    </div>
    
    <div class="content">
      <div class="section">
        <div class="section-title">Personal Information</div>
        <div class="info-row">
          <div class="info-label">Full Name:</div>
          <div class="info-value">${fullName}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Date of Birth:</div>
          <div class="info-value">${new Date(dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Gender:</div>
          <div class="info-value">${gender.charAt(0).toUpperCase() + gender.slice(1)}</div>
        </div>
      </div>
      
      <div class="section">
        <div class="section-title">Contact Information</div>
        <div class="info-row">
          <div class="info-label">Email:</div>
          <div class="info-value">${email}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Mobile Number:</div>
          <div class="info-value">${mobileNumber}</div>
        </div>
      </div>
      
      <div class="section">
        <div class="section-title">Parent/Guardian Information</div>
        <div class="info-row">
          <div class="info-label">Father's Name:</div>
          <div class="info-value">${fatherName}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Mother's Name:</div>
          <div class="info-value">${motherName}</div>
        </div>
      </div>
      
      <div class="section">
        <div class="section-title">Course Selection</div>
        <div class="info-row">
          <div class="info-label">Desired Course:</div>
          <div class="info-value"><strong>${course}</strong></div>
        </div>
      </div>
      
      <div class="section">
        <div class="section-title">Address</div>
        <div class="info-row">
          <div class="info-label">Street:</div>
          <div class="info-value">${address.street}</div>
        </div>
        <div class="info-row">
          <div class="info-label">City:</div>
          <div class="info-value">${address.city}</div>
        </div>
        <div class="info-row">
          <div class="info-label">State:</div>
          <div class="info-value">${address.state}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Postal Code:</div>
          <div class="info-value">${address.postalCode}</div>
        </div>
      </div>
    </div>
    
    <div class="footer">
      <p><strong>SmartDesignHub</strong></p>
      <p>Visit: <a href="https://www.smartdesignhub.space">www.smartdesignhub.space</a></p>
      <p>Follow us on social media: @SmartDesignHub</p>
      <p style="margin-top: 15px; font-size: 12px; color: #6B7280;">
        This is an automated email. Please do not reply to this message.
      </p>
    </div>
  </div>
</body>
</html>
  `;
}
