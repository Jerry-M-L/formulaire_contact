document.getElementById("contact-form").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
  
    const status = document.getElementById("status");
  
    try {
      const response = await fetch("/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
  
      if (response.ok) {
        status.textContent = "Message envoyé avec succès !";
        status.style.color = "green";
        document.getElementById("contact-form").reset();
      } else {
        status.textContent = "Erreur lors de l'envoi.";
        status.style.color = "red";
      }
    } catch (error) {
      status.textContent = "Problème de connexion avec le serveur.";
      status.style.color = "red";
    }
  });
  