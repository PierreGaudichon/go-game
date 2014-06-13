class GoInfoView

	constructor: (@controller) ->
		@$el = {"jQuery"}

	render: ->
		@$el = $ "<div />"

		infos = [
			[ "turn", "Turn" ]
			[ "scoreP", "Score +" ]
			[ "scoreO", "Score o" ]
		]

		for i in infos
			p = $ "<p />"
				.addClass i[0] + "Info"
				.html i[1] + " : "
				.append "<span />"
				.appendTo @$el

		return @$el


	set: (key, t) ->
		@$el.find("." + key + "Info").find("span").html t