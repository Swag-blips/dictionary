// function to call the saved font on page load

let fontPrefix: string = "font-";

export const applySavedFont = (): void => {
  let savedFont: string | null = localStorage.getItem("selectedFont");

  if (savedFont) {
    document.body.classList.add(savedFont);
  }
};

// Function to switch fonts

export const switchFont = (fontName: string) => {
  document.body.classList.forEach((className) => {
    if (className.startsWith(fontPrefix)) {
      document.body.classList.remove(className);
    }
  });

  document.body.classList.add(fontName);

  localStorage.setItem("selectedFont", fontName);
};
