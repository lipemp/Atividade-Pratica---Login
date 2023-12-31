const formRegister = document.getElementById("form-edit-message");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const password = document.getElementById("password");
const avatar = document.getElementById("avatar");

const button = document.querySelector(".btn-submit");

button.addEventListener("click", async (event) => {
  event.preventDefault();
  await registerUser();
});

async function registerUser() {
  try {
    const response = await api.get("/users");
    const users = response.data;

    let existe = false

    const emailParent = email.parentElement;
    const emailError = document.createElement('small');
    emailParent.appendChild(emailError);

    users.forEach((user) => {
      if (user.login === email.value) {
        emailParent.classList.add("form-control-error");
        alert("Este email já esta cadastrado. Tente Novamente");
        existe = true;
      }
    });

    if (existe === false) {
      emailParent.classList.remove("form-control-error");
      emailError.textContent = '';
      
      const newUser = {
        name: `${nome.value}`,
        login: `${email.value}`,
        password: `${password.value}`,
        avatar: `${avatar.value}`,
      };
      localStorage.setItem('usuario', JSON.stringify(newUser));
      createNewUser(newUser);
    }
  } catch (error) {
    console.error(`Um erro inesperado ocorreu: ${error}`);
    console.log("Tente novamente");
  }
}

async function createNewUser(newUser) {
  try {
    const response = await api.post("/users", newUser);

    if (response.status === 201) {
      alert("Usuário cadastrado com sucesso!");

      email.value = "";
      password.value = "";
      nome.value = "";
      avatar.value = "";

      location.href = "login.html";
    }
  } catch (error) {
    console.log("Erro ao cadastrar usuário", error);
  }
}