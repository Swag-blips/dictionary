// function to toggle checkbox theme
export const toggleCheckboxTheme = (checkbox) => {
    if (checkbox.checked) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
    }
    else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
    }
};
// function to toggle theme
export const toggleTheme = (checkbox) => {
    let savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        if (savedTheme === "light") {
            document.documentElement.classList.add("dark");
            checkbox.checked = true;
            localStorage.setItem("theme", "dark");
        }
        else {
            document.documentElement.classList.remove("dark");
            checkbox.checked = false;
            localStorage.setItem("theme", "light");
        }
    }
    else {
        if (document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
        else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
    }
};
// function to call the saved theme on page load
export const applyTheme = (checkbox) => {
    if (localStorage.getItem("theme") === "dark") {
        document.documentElement.classList.add("dark");
        checkbox.checked = true;
    }
    else {
        document.documentElement.classList.remove("dark");
        checkbox.checked = false;
    }
};
