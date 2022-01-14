var modal = document.getElementById("modal");

function hide_modal() {
    modal.style.display = "none";
}
function show_modal() {
    modal.style.display = "block";
}

// When user clicks a close button, close it.
$(".close").click(hide_modal);
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        hide_modal();
    }
}

function display_modal_content(id){
    show_modal();
    var m = document.getElementById(id);
    m.style.display = "block";
}
