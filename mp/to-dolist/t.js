const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {


    if (inputBox.value === '') {
        alert("You must write something")
    } else {
        let li = document.createElement("li");

        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span2 = document.createElement("img");
        span2.src = 'image/unchecked.png'
        li.appendChild(span2)

        let span = document.createElement("span")
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        saveData();

        console.log(saveData)


    }
    inputBox.value = "";
}
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        let listItem = e.target;
        let textNode = listItem.firstChild; // Get the first child node of the list item (text node)
        let image = listItem.querySelector("img");

        // Toggle text decoration for the text node
        if (textNode && textNode.nodeType === Node.TEXT_NODE) {
            textNode.parentNode.classList.toggle("checked");
        }

        // Toggle image source between unchecked and checked
        if (image) {
            if (image.src.endsWith("unchecked.png")) {
                image.src = "image/checked.png";
            } else {
                image.src = "image/unchecked.png";
            }
        }

        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML)

}

function showTask() {

    listContainer.innerHTML = localStorage.getItem("data");


}
showTask();