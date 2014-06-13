paths=(
	GoController
	GoModel
	GoGridView
	GoInfoView
	main
	)
paths=( "${paths[@]/#/src/js/}" )
paths=( "${paths[@]/%/.coffee}" )

coffee -j bin/app.js -c ${paths[@]}


stylus -o bin/ src/css/*.styl