//falta añadir metas semanales en el perfil tambien si se me olvida deje un buen dashboard de eejmplo en los pin de chrome
import { setNewScramble } from "./modules/scramble/scramble-generator.js";
import { handleDownKeys, handleUpKeys } from "./modules/timer/handle-keys.js";
import { generateStatistics } from "./modules/api/fetch-statistics.js";
import { updateStatisticsProfileChart, categoryFilterGen, cubeFilterGen , generateCategoryList } from "./modules/toggle/profile-filter.js";
import { toggleActiveNavBar } from "./modules/toggle/toggle.js";
import { loadTimerFilterOptions, toggleTimerCategory, toggleTimerCube } from "./modules/timer/timer-filter.js";
import { changeTheme } from "./modules/toggle/change-theme.js";

document.addEventListener("DOMContentLoaded", (e) => {
  try {
	  const currentUrl = window.location.href;
	  if (currentUrl.includes('/timer')) {
		loadTimerFilterOptions();
		document.querySelector("#category").addEventListener("change", toggleTimerCategory);
		document.querySelector("#category").addEventListener("change", setNewScramble);
		document.querySelector("#category").addEventListener("change", generateStatistics);
		document.querySelector("#cube").addEventListener("change", toggleTimerCube);
		document.querySelector("#cube").addEventListener("change", setNewScramble);
		document.querySelector("#cube").addEventListener("change", generateStatistics);
		document.addEventListener("keydown", handleDownKeys);
		document.addEventListener("keyup", handleUpKeys);
	  } else if (currentUrl.includes('/settings')) {
		document.querySelector("#theme").addEventListener("change", changeTheme);
	  } else if (currentUrl.includes('/profile')) {
		toggleActiveNavBar()
		const categoryFilter = document.querySelector("#category-filter");
		const cubeFilter = document.querySelector("#cube-filter");
		if (categoryFilter || cubeFilter) {
		  cubeFilter.setAttribute("disabled", true);
		  generateCategoryList();
		  updateStatisticsProfileChart();
		  categoryFilter.addEventListener("change", categoryFilterGen)
		  cubeFilter.addEventListener("change", cubeFilterGen)
		}
	  }
  } catch (error) {
	  console.log(error)
  }

});

