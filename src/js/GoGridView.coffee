class GoGridView

	constructor: (@controller) ->
		@$table = {"jQuery"}


	renderGrid: (grid) ->
		@$table = $ "<table />"
			.addClass "goGame"

		for y, row of grid
			@renderRow(y, row).appendTo(@$table)

		return @$table


	renderRow: (y, row) ->
		$row = $ "<tr />"

		for x, tile of row
			@renderTile(x, y, tile).appendTo($row)

		return $row


	renderTile: (x, y, t) ->
		controller = @controller
		return $ "<td />"
			.attr
				"data-x": x
				"data-y": y
			.click ->
				t = $ @
				x = t.attr "data-x"
				y = t.attr "data-y"
				controller.onClickTile x, y
			.html t


	setTile: (x, y, t) ->
		dx = "[data-x='#{x}']"
		dy = "[data-y='#{y}']"
		el = @$table.find "td"+dx+dy
			.html t


