module.exports.signUpErrors = (err) => {
  let errors = { pseudo: "", email: "", password: "" };

  if (err.message.includes("pseudo")) errors.pseudo = "Pseudo incorrect";

  if (err.message.includes("email")) errors.email = "Email incorrect";

  if (err.message.includes("password"))
    errors.password = "Mot de passe incorrect";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
    errors.pseudo = "Pseudo déjà enregistré";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Email déjà enregistré";

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message.includes("email")) errors.email = "Email inconnu";

  if (err.message.includes("password"))
    errors.password = "Mot de passe incorrect";

  return errors;
};

module.exports.uploadErrors = (err) => {
  let errors = { format: "", maxSize: "" };

  if (err.message.includes("Invalid file"))
    errors.format = "Fichier non valide";

  if (err.message.includes("Max size"))
    errors.format = "Fichier trop volumineux";

    return errors;
};
