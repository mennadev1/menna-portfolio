
console.log("Welcome to Menna's Portfolio!");

const projects = document.querySelectorAll(".project");

projects.forEach(function(project) {
    project.addEventListener("click", function() {
        alert("Thanks for checking out my project!");
    });
});
