export function usePhoto(e) {
    e.target.classList.remove("animate-bounce");
    let file = document.querySelector("#fileInput");
    file.click();
}