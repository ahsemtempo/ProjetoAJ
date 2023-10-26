class FormSubmit {
    constructor(settings) {
        this.settings = settings
        this.form = document.querySelector(settings.form);
        this.formButton = document.querySelector(settings.button);
        if (this.form) {
            this.url = this.form.getAttribute("action")
        }
        this.sendForm = this.sendForm.bind(this);

    }

    displaySucess() {
        this.form.innerHTML = this.settings.sucess;

    }

    displayError() {
        this.form.innerHTML = this.settings.error;
        
    }

    getFormObject() {
        const formObject = {};
        const fields = this.form.querySelectorAll("[name]");
        fields.forEach((field) =>  {
            formObject[field.getAttribute("name")] = field.value;
        });
        return formObject;
    }

    onSubmission(event) {
        event.preventDefault();
        event.target.disable = true;
        event.target.innerText = "Enviando..."; 
    }

    async sendForm(event) {
      try {
        this.onSubmission(event);
        await fetch(this.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json"
          },
          body: JSON.stringify(this.FormObject()),
        });
        this.displaySucess();
      } catch (error) {
        this.displayError();
        throw new Error(error);
      }
    }

    init() {
        if(this.form) this.formButton.addEventListener("click", this.sendForm);
        return this;
    }

}

const formSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
    sucess: "<h1 class= 'sucess'>Mensagem enviada!</h1>",
    error: "<h1 class= 'error'>Não foi possível enviar sua mensagem</h1>",
});
formSubmit.init();
