pushd "W:\htdocs\lemon\plugins\cms\templates"
del tpl.js
for /r %%i in (*.hbs) do handlebars %%i -m >> tpl.js