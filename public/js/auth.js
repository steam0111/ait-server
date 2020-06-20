window.onload = function() {
  // declaration part
  var signUpBtn = document.getElementById("signUpBtn");
  var signInBtn = document.getElementById("signInBtn");
  var forgotLink = document.getElementById("forgotLink");

  var signIn = document.getElementById("signIn");
  var signUp = document.getElementById("signUp");
  var restore = document.getElementById("restore");

  // function declaration part
  function paginationLogic() {
    forgotLink.classList.remove("none");

    switch (this) {
      case signUpBtn:
        signInBtn.classList.remove("paginationBtn--active");

        signUp.classList.remove("none");
        signIn.classList.add("none");
        restore.classList.add("none");

        this.classList.add("paginationBtn--active");
        break;

      case signInBtn:
        signUpBtn.classList.remove("paginationBtn--active");

        signIn.classList.remove("none");
        signUp.classList.add("none");
        restore.classList.add("none");

        this.classList.add("paginationBtn--active");
        break;

      case forgotLink:
        forgotLink.classList.add("none");
        restore.classList.remove("none");
        break;
    }
  }
  // end of declaration part

  // main part
  signUpBtn.addEventListener("click", paginationLogic);
  signInBtn.addEventListener("click", paginationLogic);
  forgotLink.addEventListener("click", paginationLogic);
}
