class GoModel

	constructor: (@controller) ->
		@size = 0
		@grid = []

		@turn = "+"
		@scoreP = 0 # symbol : "+"
		@scoreO = 0 # symbol : "o"

	export: ->
		{ @size, @grid, @turn, @scoreP, @scoreO }

	import: (data) ->
		{ @size, @grid, @turn, @scoreP, @scoreO } = data


	buildGrid: (s) -> # empty symbol : "."
		@size = s

		for i in [0...s] by 1
			@grid[i] = []
			for j in [0...s] by 1
				@grid[i][j] = "."


	getTile: (x, y) ->
		return @grid[y][x]


	setTile: (x, y, t) ->
		@grid[y][x] = t


	eatTile: (x, y) ->
		t = @grid[y][x]
		@setTile x, y, "."

		@scoreP++ if t == "+"
		@scoreO++ if t == "o"
		@controller.onScoreChange()


	toggleTurn: ->
		@turn = switch @turn
			when "+" then "o"
			when "o" then "+"

		return @turn