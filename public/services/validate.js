export function validateRegisterForm(form) {
  const form_data = new FormData(form);
  const errors = {};
  if (!form_data.get("username").trim())
    errors.username = "Le nom d'utilisateur est requis.";
  // validation email
  const email_regex = new RegExp(
    "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
  );

  const email = form_data.get("email").trim();
  if (!email_regex.test(email)) {
    errors.email = "Email invalide";
    console.log(errors.email);
  }
  //Regex mdp : 12 caractères mini, 1 maj, 1 chiffre, 1 caractère spé
  const strong_password_regex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{12,}$"
  );
  const password = form_data.get("password").trim();
  if (!strong_password_regex.test(password)) {
    errors.password =
      "Mot de passe invalide : 12 caractères minimum, 1 majuscule, 1 chiffre et 1 caractère spécial";
    console.log(errors.password);
  }

  const file = form_data.get("avatar");
  let errors_avatar_tab = [];
  // Avatar obligatoire
  //   if (!file.name) {
  //     errors_avatar_tab.push("Fichier avantar requis.");
  //   }
  if (file.name && !file.type.match(/^image\/(jpeg|png|jpg)$/)) {
    errors_avatar_tab.push("Fichier non valide [jpeg|png|jpg]");
  }
  const max_size = 2 * 1024 * 1024; // 2MB
  if (file.name && file.size > max_size) {
    errors_avatar_tab.push("Fichier trop volumineux [max: 2MB]");
  }
  if (errors_avatar_tab.length > 0) {
    errors.avatar = errors_avatar_tab.join(", ");
    console.log(errors.avatar);
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
