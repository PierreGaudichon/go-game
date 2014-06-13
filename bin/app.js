// Generated by CoffeeScript 1.7.1
(function() {
  var GoController, GoGridView, GoInfoView, GoModel;

  GoController = (function() {
    function GoController() {
      this.gridView = new GoGridView(this);
      this.infoView = new GoInfoView(this);
      this.model = new GoModel(this);
    }

    GoController.prototype.initialize = function(size) {
      this.model.buildGrid(size);
      this.gridView.renderGrid(this.model.grid).appendTo("body");
      this.infoView.render().appendTo("body");
      this.infoView.set("turn", this.model.turn);
      return this.onScoreChange();
    };

    GoController.prototype.onScoreChange = function() {
      this.infoView.set("scoreP", this.model.scoreP);
      return this.infoView.set("scoreO", this.model.scoreO);
    };

    GoController.prototype.onClickTile = function(x, y) {
      var t;
      t = this.model.getTile(x, y);
      if (t !== ".") {
        this.model.eatTile(x, y);
        return this.gridView.setTile(x, y, ".");
      } else {
        this.model.setTile(x, y, this.model.turn);
        this.gridView.setTile(x, y, this.model.turn);
        return this.toggleTurn();
      }
    };

    GoController.prototype.toggleTurn = function() {
      var t;
      t = this.model.toggleTurn();
      return this.infoView.set("turn", this.model.turn);
    };

    return GoController;

  })();

  GoModel = (function() {
    function GoModel(controller) {
      this.controller = controller;
      this.size = 0;
      this.grid = [];
      this.turn = "+";
      this.scoreP = 0;
      this.scoreO = 0;
    }

    GoModel.prototype["export"] = function() {
      return {
        size: this.size,
        grid: this.grid,
        turn: this.turn,
        scoreP: this.scoreP,
        scoreO: this.scoreO
      };
    };

    GoModel.prototype["import"] = function(data) {
      return this.size = data.size, this.grid = data.grid, this.turn = data.turn, this.scoreP = data.scoreP, this.scoreO = data.scoreO, data;
    };

    GoModel.prototype.buildGrid = function(s) {
      var i, j, _i, _results;
      this.size = s;
      _results = [];
      for (i = _i = 0; _i < s; i = _i += 1) {
        this.grid[i] = [];
        _results.push((function() {
          var _j, _results1;
          _results1 = [];
          for (j = _j = 0; _j < s; j = _j += 1) {
            _results1.push(this.grid[i][j] = ".");
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    GoModel.prototype.getTile = function(x, y) {
      return this.grid[y][x];
    };

    GoModel.prototype.setTile = function(x, y, t) {
      return this.grid[y][x] = t;
    };

    GoModel.prototype.eatTile = function(x, y) {
      var t;
      t = this.grid[y][x];
      this.setTile(x, y, ".");
      if (t === "+") {
        this.scoreP++;
      }
      if (t === "o") {
        this.scoreO++;
      }
      return this.controller.onScoreChange();
    };

    GoModel.prototype.toggleTurn = function() {
      this.turn = (function() {
        switch (this.turn) {
          case "+":
            return "o";
          case "o":
            return "+";
        }
      }).call(this);
      return this.turn;
    };

    return GoModel;

  })();

  GoGridView = (function() {
    function GoGridView(controller) {
      this.controller = controller;
      this.$table = {
        "jQuery": "jQuery"
      };
    }

    GoGridView.prototype.renderGrid = function(grid) {
      var row, y;
      this.$table = $("<table />").addClass("goGame");
      for (y in grid) {
        row = grid[y];
        this.renderRow(y, row).appendTo(this.$table);
      }
      return this.$table;
    };

    GoGridView.prototype.renderRow = function(y, row) {
      var $row, tile, x;
      $row = $("<tr />");
      for (x in row) {
        tile = row[x];
        this.renderTile(x, y, tile).appendTo($row);
      }
      return $row;
    };

    GoGridView.prototype.renderTile = function(x, y, t) {
      var controller;
      controller = this.controller;
      return $("<td />").attr({
        "data-x": x,
        "data-y": y
      }).click(function() {
        t = $(this);
        x = t.attr("data-x");
        y = t.attr("data-y");
        return controller.onClickTile(x, y);
      }).html(t);
    };

    GoGridView.prototype.setTile = function(x, y, t) {
      var dx, dy, el;
      dx = "[data-x='" + x + "']";
      dy = "[data-y='" + y + "']";
      return el = this.$table.find("td" + dx + dy).html(t);
    };

    return GoGridView;

  })();

  GoInfoView = (function() {
    function GoInfoView(controller) {
      this.controller = controller;
      this.$el = {
        "jQuery": "jQuery"
      };
    }

    GoInfoView.prototype.render = function() {
      var i, infos, p, _i, _len;
      this.$el = $("<div />");
      infos = [["turn", "Turn"], ["scoreP", "Score +"], ["scoreO", "Score o"]];
      for (_i = 0, _len = infos.length; _i < _len; _i++) {
        i = infos[_i];
        p = $("<p />").addClass(i[0] + "Info").html(i[1] + " : ").append("<span />").appendTo(this.$el);
      }
      return this.$el;
    };

    GoInfoView.prototype.set = function(key, t) {
      return this.$el.find("." + key + "Info").find("span").html(t);
    };

    return GoInfoView;

  })();

  $(function() {
    var game;
    game = new GoController;
    return game.initialize(19);
  });

}).call(this);