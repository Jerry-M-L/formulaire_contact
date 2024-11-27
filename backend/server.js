const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend")));

// Route pour envoyer un email
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Configurer le transporteur SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail", // Changez selon votre fournisseur (Outlook, Yahoo, etc.)
      auth: {
        user: "votre-email@gmail.com", // Remplacez par votre email
        pass: "votre-mot-de-passe",    // Remplacez par un mot de passe ou un App Password
      },
    });

    // Options de l'email
    const mailOptions = {
      from: email,
      to: "destination-email@gmail.com", // Email de destination
      subject: `Nouveau message de ${name}`,
      text: message,
    };

    // Envoyer l'email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email envoyé avec succès !" });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    res.status(500).json({ message: "Erreur lors de l'envoi de l'email." });
  }
});

// Démarrer le serveur
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
