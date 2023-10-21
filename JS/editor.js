const boldBtn = document.getElementById("boldBtn");
const italicBtn = document.getElementById("italicBtn");
const underlineBtn = document.getElementById("underlineBtn");
const textColorInput = document.getElementById("textColor");
const editor = document.getElementById("editor");

//functions

italicBtn.addEventListener("click", () => {
    document.execCommand("italic", false, null);
    editor.focus();
});

boldBtn.addEventListener("click", () => {
    document.execCommand("bold", false, null);
    editor.focus();
});

underlineBtn.addEventListener("click", () => {
    document.execCommand("underline", false, null);
    editor.focus();
});

textColorInput.addEventListener("input", () => {
    document.execCommand("styleWithCSS", false, true);
    document.execCommand("foreColor", false, textColorInput.value);
    editor.focus();
});


