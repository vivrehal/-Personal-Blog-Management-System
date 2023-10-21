const boldBtn = document.getElementById("boldBtn");
const italicBtn = document.getElementById("italicBtn");
const underlineBtn = document.getElementById("underlineBtn");
const textColorInput = document.getElementById("textColor");
const editor = document.getElementById("editor");

//functions

italicBtn.addEventListener("click", () => {
    if(italicBtn.classList.contains("activeItalic")){
        italicBtn.classList.remove("activeItalic")
    }
    else{
        italicBtn.classList.add("activeItalic")
    }
    document.execCommand("italic", false, null);
    editor.focus();
});

boldBtn.addEventListener("click", () => {
    if(boldBtn.classList.contains("activeBold")){
        boldBtn.classList.remove("activeBold")
    }
    else{
        boldBtn.classList.add("activeBold")
    }
    document.execCommand("bold", false, null);
    editor.focus();
});

underlineBtn.addEventListener("click", () => {
    if(underlineBtn.classList.contains("activeUnderline")){
        underlineBtn.classList.remove("activeUnderline")
    }
    else{
        underlineBtn.classList.add("activeUnderline")
    }
    document.execCommand("underline", false, null);
    editor.focus();
});

textColorInput.addEventListener("input", () => {
    document.execCommand("styleWithCSS", false, true);
    document.execCommand("foreColor", false, textColorInput.value);
    editor.focus();
});


