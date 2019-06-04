'use strict'

class TableContact{

    constructor(){
        
    }
    async asyncSelectAllContact(){
        try {
              var fectchContact = await fetch(
                "http://www.raydelto.org/agenda.php"
              );
              var data = fectchContact.json();;
              return await data;
        } catch (e) {
            alert("No sea podido conectar a la API")
        }
    

    }

    async asyncFindContactForName(name){
        var listContact = await this.asyncSelectAllContact()
        var spanCount = document.querySelector(".number--contact");
        spanCount.textContent = listContact.length
         listContact = await  listContact.filter((data) =>{
            return data.nombre.toUpperCase().includes(name.toUpperCase())
        })

        this.fillTableContact(listContact)
      
    }

    fillTableContact(listContact){
         var tbody = document.querySelector(
           ".table-contact .bodyTableList"
         );

         while (tbody.firstChild) {
           tbody.removeChild(tbody.firstChild);
         }

         listContact.forEach(element => {
           var tr = document.createElement("tr");
           for (let index = 0; index < 3; index++) {
             let td = document.createElement("td");
             if (index == 0) {
               td.append(element.nombre);
               tr.append(td);
             }
             if (index == 1) {
               td.append(element.apellido);
               tr.append(td);
             }
             if (index == 2) {
               td.append(element.telefono);
               tr.append(td);
             }
           }
           tbody.append(tr);
         });

    }
}
var tableContact = new TableContact()
var btnAddContact = document.getElementById("btnSubmit")
var searchContact = document.querySelector(".searchContact");
var btnSearchContact = document.querySelector(".btnSearchContact");

document.addEventListener("DOMContentLoaded", async () =>{
    await tableContact.asyncFindContactForName("");
});

btnSearchContact.addEventListener("click", async () => {
  await tableContact.asyncFindContactForName(searchContact.value);
});

