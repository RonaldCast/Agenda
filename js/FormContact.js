
'use strict'

class FormContact{
    constructor(){
        this.formContact = document.getElementById('formContact')
        this.name = this.formContact.name
        this.lastName = this.formContact.lastName
        this.telephone = this.formContact.telephone
        this.newContact = {}
     }


    validateInput(){
        if (
          this.name.value.trim() == "" ||
          this.lastName.value.trim() == "" ||
          this.telephone.value.trim() == ""
        ) {
          return false;
        } else {
         
          this.newContact = {
            nombre: this.name.value,
            apellido: this.lastName.value,
            telefono: this.telephone.value
          };
          return true;
        }
        
    }

    async asyncAddContact(){
        
        if(this.validateInput()){
            var bodyContact = JSON.stringify(this.newContact);
            console.log(bodyContact);
            try {
              await  fetch("http://www.raydelto.org/agenda.php", {
                method: "POST",
                mode: "no-cors",
                redirect: "follow",
                headers: {
                  "Content-Type": "application/json"
                },
                body: bodyContact
              })
            } catch (e) {
             
            }
     
              
        }else{
            alert("Debe de llenar todos los campos")
        }
    }
}
 var formContact;
 var tableContact;

window.addEventListener("DOMContentLoaded", () => {
  formContact = new FormContact();
  tableContact = new TableContact();
});

var btnSubmit = document.getElementById("btnSubmit")
btnSubmit.addEventListener('click',async (e) =>{
  
   e.preventDefault()
    await formContact. asyncAddContact()
    formContact.name.value = ''
    formContact.lastName.value = ''
    formContact.telephone.value = ''
    await tableContact.asyncFindContactForName('')
    alert("Contacto agregado correctamente")


})