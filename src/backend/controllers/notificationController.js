const nodemailer = require("nodemailer");
const Report = require("../models/Report");
const RescueRequest = require("../models/RescueRequest");

// Haversine formula to calculate distance between two geographical points
const haversine = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
};

// Function to send an email to the rescuer
const sendEmail = async (recipient, report) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASSWORD, // Your email password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipient,
      subject: "Urgent Animal Rescue Report",
      text: `Hello, a report has been submitted for an injured animal. Here are the details:

        Wound Details: ${report.woundDetails}
        Location: Lat: ${report.location.lat}, Lon: ${report.location.lon}
        Reported At: ${new Date(report.reportedAt).toLocaleString()}
        
        Please respond as soon as possible to assist the animal.`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${recipient}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Function to notify nearby rescuers about the report
const notifyNearbyRescuers = async (reportId) => {
  try {
    const report = await Report.findById(reportId);
    if (!report) {
      return console.log("Report not found");
    }

    const reportLat = report.location.lat;
    const reportLon = report.location.lon;

    // Find all rescues within the area
    const rescues = await RescueRequest.find();

    // Loop through the rescues and check distance
    rescues.forEach(async (rescue) => {
      const rescueLat = rescue.location.lat;
      const rescueLon = rescue.location.lon;
      const distance = haversine(reportLat, reportLon, rescueLat, rescueLon);

      // If the distance is less than 5 kilometers, send an email alert
      if (distance <= 5) {
        await sendEmail(rescue.contact, report);
      }
    });
  } catch (error) {
    console.error("Error notifying rescuers:", error);
  }
};

module.exports = { notifyNearbyRescuers };
