window. addEventListener("load", function() {

    let form = document.querySelector("form");

    form.addEventListener("submit", function(e) {
       
        let errors = [];

        let productName = document.querySelector("#nombre")

        if (productName.value == ""){
            errors.push("Product name cannot be empty")
        } else if (productName.value.length <5) {
            errors.push("Product name must be at least 5 characters" )
        }

        let price = document.querySelector("#precio")

        if (price.value == ""){
            errors.push("Price cannot be empty")
        } else if (price.value < 60) {
            errors.push("Price must not be lower than 60 USD" )
        }

        let reference = document.querySelector("#reference")

        if (reference.value == ""){
            errors.push("Reference field cannot be empty")
        } else if (reference.value.length <5) {
            errors.push("Reference field must be 8-20 characters" )
        }

        let image = document.querySelector("#imagen");
        let extAllowed = /(.PNG|.JPG|.JPEG|.GIF|.webp)$/i;

       /*  if (image.value == "") {
            errors.push("Image must be uploaded")
        } else */ /* if (!extAllowed.exec(image.value)){
            errors.push("Sorry, this file type is not allowed.")
        }  */


        let features = document.querySelector('input[name="features"]')

        if (features.value == ""){
            errors.push("Features cannot be empty")
        }

        if (errors.length > 0 ) {

            e.preventDefault();
            
            let ulErrors =  document.querySelector(".errors ul");
            ulErrors.innerHTML = "";
            for (let i=0; i<errors.length; i++ ) {

                ulErrors.innerHTML += "<li>" + errors[i] + "</li>"
                ulErrors.style.listStyleType = 'none'
            }
            document.getElementById("focusDivErrors").focus();
        }
    })

})