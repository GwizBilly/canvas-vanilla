let $ = {
	"func": function (_wow) {
		console.log(_wow + " what!?!?");
	},
	"x": 0,
	"f": function () {
		this.func("Say");
	}
}
console.log($.x);
$.f();
