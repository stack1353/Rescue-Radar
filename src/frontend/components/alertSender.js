export const sendAlertEmail = async (rescuerEmail, rescuerName, location, description) => {
    const serviceID = "service_xe9p8is";
    const templateID = "template_xxxxxx";
    const userID = "user_xxxxxxx";
  
    const templateParams = {
      rescuer_email: rescuerEmail, // Dynamically set the rescuer's email
      rescuer_name: rescuerName,
      location: location,
      description: description,
    };
  
    try {
      const response = await emailjs.send(serviceID, templateID, templateParams, userID);
      console.log("Email successfully sent:", response.status, response.text);
      return response;
    } catch (error) {
      console.error("Failed to send email:", error);
      throw error;
    }
  };
  