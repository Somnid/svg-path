QUnit.module("parse move");
QUnit.test("can parse move", function(assert){
  const svgPathParser = SvgPathParser.create();
  const instructions = svgPathParser.parsePath("M1,2");
	assert.equal(instructions[0].type, "moveAbsolute", "correct type");
  assert.equal(instructions[0].points[0], 1, "correct X");
  assert.equal(instructions[0].points[1], 2, "correct Y");
});
QUnit.test("can parse move with space delimiter", function(assert){
  const svgPathParser = SvgPathParser.create();
  const instructions = svgPathParser.parsePath("M1 2");
	assert.equal(instructions[0].type, "moveAbsolute", "correct type");
  assert.equal(instructions[0].points[0], 1, "correct X");
  assert.equal(instructions[0].points[1], 2, "correct Y");
});
QUnit.test("can parse move with space delimiter after control char", function(assert){
  const svgPathParser = SvgPathParser.create();
  const instructions = svgPathParser.parsePath("M 1 2");
	assert.equal(instructions[0].type, "moveAbsolute", "correct type");
  assert.equal(instructions[0].points[0], 1, "correct X");
  assert.equal(instructions[0].points[1], 2, "correct Y");
});
QUnit.test("can parse move with comma and whitespace", function(assert){
  const svgPathParser = SvgPathParser.create();
  const instructions = svgPathParser.parsePath("M1, 2");
	assert.equal(instructions[0].type, "moveAbsolute", "correct type");
  assert.equal(instructions[0].points[0], 1, "correct X");
  assert.equal(instructions[0].points[1], 2, "correct Y");
});

QUnit.module("parse line absolute");
QUnit.test("can parse line absolute", function(assert){
  const svgPathParser = SvgPathParser.create();
  const instructions = svgPathParser.parsePath("L2,3");
	assert.equal(instructions[0].type, "lineAbsolute", "correct type");
  assert.equal(instructions[0].points[0], 2, "correct X");
  assert.equal(instructions[0].points[1], 3, "correct Y");
});

QUnit.module("parse combinations");
QUnit.test("can parse a combination", function(assert){
  const svgPathParser = SvgPathParser.create();
  const instructions = svgPathParser.parsePath("M0,0 L 2 3");
	assert.equal(instructions[0].type, "moveAbsolute", "correct type 1");
  assert.equal(instructions[0].points[0], 0, "correct X 1");
  assert.equal(instructions[0].points[1], 0, "correct Y 1");
  assert.equal(instructions[1].type, "lineAbsolute", "correct type 2");
  assert.equal(instructions[1].points[0], 2, "correct X 2");
  assert.equal(instructions[1].points[1], 3, "correct Y 2");
});
QUnit.test("can parse with preceding space", function(assert){
  const svgPathParser = SvgPathParser.create();
  const instructions = svgPathParser.parsePath(" M0,0 L 2 3");
	assert.equal(instructions[0].type, "moveAbsolute", "correct type 1");
  assert.equal(instructions[0].points[0], 0, "correct X 1");
  assert.equal(instructions[0].points[1], 0, "correct Y 1");
  assert.equal(instructions[1].type, "lineAbsolute", "correct type 2");
  assert.equal(instructions[1].points[0], 2, "correct X 2");
  assert.equal(instructions[1].points[1], 3, "correct Y 2");
});
