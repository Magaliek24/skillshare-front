import { fetchData } from "../../lib/fetchData.js";
import { validateRegisterForm } from "../../services/validate.js";

document.addEventListener("DOMContentLoaded", () => {
  // redirection si connecté
  const register_form = document.querySelector("#register-form");
  const API_URL = document.querySelector("#api-url").value;
  //   console.log(API_URL);

  register_form.addEventListener("submit", async (e) => {
    e.preventDefault();
    // réinitialisation des champs erreurs à vide
    register_form
      .querySelectorAll(".error")
      .forEach((span) => (span.textContent = ""));
    register_form
      .querySelectorAll(".error-input")
      .forEach((input) => input.classList.remove("error-input"));
    // validation données
    const { valid, errors } = validateRegisterForm(register_form);

    if (!valid) {
      for (const [field, message] of Object.entries(errors)) {
        const error_span = register_form.querySelector(
          `[data-error="${field}"]`
        );
        if (error_span) error_span.textContent = message;

        const input = document.querySelector(`[name="${field}"]`);
        if (input) {
          input.classList.add("error-input");
        }
      }
      return;
    }

    // Récupération des saisies via les attributs 'name' => clé:valeur
    const form_data = new FormData(register_form);

    const json_data = {};
    form_data.forEach((value, key) => {
      if (key !== "avatar") {
        json_data[key] = value;
      }
    });

    // si un fichier avatar est présent, créer un form_data
    const avatar_file = form_data.get("avatar");
    if (avatar_file && avatar_file.size > 0) {
      const avatar_file_data = new FormData();
      avatar_file_data.append("avatar", avatar_file);
      try {
        const result = await fetchData({
          route: "/api/upload-avatar",
          api: API_URL,
          options: {
            method: "POST",
            body: avatar_file_data,
          },
        });
      } catch (error) {
        // message utilisateur...
      }
    }

    try {
      const result = await fetchData({
        route: "/api/register",
        api: API_URL,
        options: {
          method: "POST",
          body: JSON.stringify(json_data),
        },
      });
    } catch (error) {
      // message utilisateur...
    }
    // const json_data_string = JSON.stringify(json_data);
    // console.log(json_data_string);
  });
});
