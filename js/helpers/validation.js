function validateConditions() {
    var mtrW = document.forms["conditionValues"]["MatrixWidthInMilimetersInpt"].value;
    var mtrH = document.forms["conditionValues"]["MatrixHeightInMilimetersInpt"].value;
    var tilt = document.forms["conditionValues"]["TiltInpt"].value;
    var camH = document.forms["conditionValues"]["CameraHeightInpt"].value;

    if ((mtrW == "" || mtrW == null) || (mtrH == "" || mtrH == null) || (tilt == "" || tilt == null) || (camH == "" || camH == null)) {
        document.forms["conditionValues"].requestSubmit();
        return false;
    }
}

(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
})()