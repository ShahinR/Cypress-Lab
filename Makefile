install:
	@if [ -f "cypress.json" ]; then\
		echo "\033[33mSkipping copy:\033[0m The file \033[36mcypress.json\033[0m \033[33malready exists\033[0m";\
	else\
		cp cypress.json.dist cypress.json ||:;\
		echo "\033[32mSuccessful:\033[0m Created \033[36mcypress.json\033[0m from \033[36mcypress.json.dist\033[0m";\
	fi

	npm install

percy:
	PERCY_TOKEN=9c19833f046569a178a239509c697af2458db4eda1ce78f659c2be2ac50061ae npx percy exec -- cypress run

percy-file:
	@[ "${file}" ] || ( echo "\033[33mYou must provide the argument\033[0m for \033[36mfile=<<YOUR_FILE>>\033[0m to run percy !"; exit 1 )

	PERCY_TOKEN=9c19833f046569a178a239509c697af2458db4eda1ce78f659c2be2ac50061ae npx percy exec -- cypress run --spec './cypress/integration/FO/${file}'
