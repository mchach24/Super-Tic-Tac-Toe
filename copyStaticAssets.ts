import * as shell from "shelljs";

shell.cp("-R", "src/public/assets", "dist/public/assets");
shell.cp("src/public/index.html", "dist/public/index.html");
