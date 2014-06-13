class GoController

	constructor: ->
		@gridView = new GoGridView @
		@infoView = new GoInfoView @
		@model = new GoModel @



	initialize: (size) ->

		@model.buildGrid size
		@gridView.renderGrid(@model.grid).appendTo("body")

		@infoView.render().appendTo("body")
		@infoView.set "turn", @model.turn
		@onScoreChange()


	onScoreChange: ->
		@infoView.set "scoreP", @model.scoreP
		@infoView.set "scoreO", @model.scoreO


	onClickTile: (x, y) ->
		t = @model.getTile x, y

		if t != "."
			@model.eatTile x, y
			@gridView.setTile x, y, "."

		else
			@model.setTile x, y, @model.turn
			@gridView.setTile x, y, @model.turn

			@toggleTurn()



	toggleTurn: ->
		t = @model.toggleTurn()
		@infoView.set "turn", @model.turn