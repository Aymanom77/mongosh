// Importation des modules nécessaires
const express = require('express');
const app = express();

// Middleware personnalisé pour vérifier l'heure de la demande
const checkHours = (req, res, next) => {
    const date = new Date();
    const dayOfWeek = date.getDay(); // 0 pour dimanche, 1 pour lundi, ..., 6 pour samedi
    const hourOfDay = date.getHours();

    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17) {
        // Si c'est un jour de la semaine et que l'heure est entre 9h et 17h
        next(); // Poursuit la demande
    } else {
        res.send('L\'application est disponible uniquement pendant les heures ouvrables (du lundi au vendredi, de 9h à 17h).');
    }
};

// Configuration du moteur de modèle (optionnel)
app.set('view engine', 'ejs');

// Middleware pour servir les fichiers statiques CSS
app.use(express.static('public'));

// Itinéraires
app.get('/', checkHours, (req, res) => {
    res.render('index'); // Rend la page d'accueil
});

app.get('/services', checkHours, (req, res) => {
    res.render('services'); // Rend la page Nos services
});

app.get('/contact', checkHours, (req, res) => {
    res.render('contact'); // Rend la page Contactez-nous
});

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
