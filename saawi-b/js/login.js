import { authModule, auth } from './firebase.js';

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  authModule.signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Inicio de sesión exitoso
      const user = userCredential.user;
      console.log('Usuario iniciado sesión:', user);
      // Redirigir al usuario a la página principal o a una página protegida
      window.location.href = 'index.html';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      // Error de inicio de sesión
      console.error('Error de inicio de sesión:', error);

      switch (errorCode) {
        case "auth/invalid-email":
          alert("El correo electrónico no es válido.");
          break;
        case "auth/user-disabled":
          alert("El usuario ha sido deshabilitado.");
          break;
        case "auth/user-not-found":
          alert("El usuario no ha sido encontrado.");
          break;
        case "auth/wrong-password":
          alert("La contraseña es incorrecta.");
          break
        case "auth/invalid-credential":
          alert("Las credenciales de inicio de sesión no son válidas.");
          break;
        case "auth/too-many-requests":
          alert("Demasiados intentos de inicio de sesión fallidos. Intente nuevamente más tarde.");
          break;
        default:
          alert(errorMessage);
          break;
      }      
    });
});