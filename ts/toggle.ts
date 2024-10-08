let isToggle: boolean = false;

// Function to toggle dropdown
export const toggleDropdown = (dropdownSection: HTMLDivElement) => {
  isToggle = !isToggle;

  if (isToggle) {
    dropdownSection.classList.remove("hidden");
    dropdownSection.classList.add("flex");
  } else {
    dropdownSection.classList.add("hidden");
    dropdownSection.classList.remove("flex");
  }
};
