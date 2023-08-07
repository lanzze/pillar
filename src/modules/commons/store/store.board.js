const map = {};
export const state = {
  /**
   * The board config for board container.
   * When you want to show a data panel in screen right side, you should use this.
   * Do not change the value direct, use actions#'board.show'(add board) or actions#'board.hide'(remove board).
   *
   * The board have many position, the east, west, south, each place have those property:
   * <li> items:Object[]
   * The board items. Each item have property like:
   * <pre>
   * {
   *  id:String, [Must] The id of board, if the id is exists, then cover board data.
   *  title:String, [Must] The board title, will hide title if just have one board.
   *  attrs:Object, [Optional] The attributes data for component.
   *  position:String, [Optional] Witch position you want to open(west,east,south), default is east.
   *  component:function [Must] The component you want to show on screen.
   * }
   * </pre>
   * </li>
   * <li>index:Number the current component index.</li>
   * <li>state:String Set the board-container state(spread,narrow,minify,hidden).</li>
   *
   * [Note]
   * <i>If the id already exists in board-list, we do not join it, just replace the data and the component.</i>
   * @formatter:off
   */
  board: {
    east:   {items: [], index: 0, state: "spread"},
    top:    {items: [], index: 0, state: "hidden"},
    west:   {items: [], index: 0, state: "hidden"},
    south:  {items: [], index: 0, state: "hidden"},
    full:   {items: [], index: 0, state: "hidden"}
  }
  //@formatter:on
};
export const actions = {
  /**
   * Display a board panel to screen.
   * If board id already exists, then cover the board data, include component.
   *
   * <b color='red'>
   *   There is one thing about the board id, that is the board 'id' can not same with other board in different position.
   * </b>
   * @param state {Vuex.state}
   * @param options {Object} The board options.
   */
  "board.show": ({state}, options) => {
    let place = options.position || "east";
    let board = state.board[place];
    let index = board.items.findIndex(e => e.id === options.id);
    if (index > -1) {
      board.status = "spread";
      Object.assign(board.items[index], options);
      return board.index = index;
    }
    if (options.content == null) {
      return;
    }
    board.state = "spread";
    board.items.push(options);
    board.index = board.items.length - 1;
    map[options.id] = place;
  },
  /**
   * Hide a board panel by given id(remove from container).
   * If board will remove was activated, then active next board.
   * @param state {Vuex.state}
   * @param id {String} The board id.
   */
  "board.hide": ({state}, id) => {
    let place = map[id];
    let board = state.board[place];
    if (board == null) return;
    let index = board.items.findIndex(e => e.id === id);
    if (index > -1) {
      board.items.splice(index, 1);
    }
    if (index === board.items.length - 1) {
      board.index--;
    }
    if (board.items.length === 0) {
      board.state = "hidden";
    }
    delete map[id];
  },

  /**
   * Set the board-container status. Passable value is 'hidden','minify','spread'.
   * @param context {Vuex.Store}
   * @param state {String} The board-container status.
   * @param position {String} Witch board status you want to change.
   */
  "board.state": (context, {state, position = 'east'}) => {
    context.state.board[position].state = state;
  },

  /**
   * Clear all board by given position.
   * @param state {Object}
   * @param position {String} Witch board you want to clear, default is 'east'.
   */
  "board.clear": ({state}, position = "east") => {
    state.board[position].items.forEach(e => delete map[e.id]);
    state.board[position].items.length = 0;
    state.board[position].index = 0;
    state.board[position].state = "hidden";
  },
  /**
   * Clear all board.
   * @param state {Vuex.State}
   */
  "board.clear.all": ({state}) => {
    Object.keys(state.board).forEach(place => {
      state.board[place].items.length = 0;
      state.board[place].index = 0;
      state.board[place].state = "hidden";
    });
    Object.keys(map).forEach(id => delete map[id]);
  }
}