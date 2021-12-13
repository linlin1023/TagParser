const { doparse } = require("./tagparse");

test("should output correctly tagged ", () => {
  const text = "<B><A>this is correct test case .</A></B><C>Finger cross</C>";
  const result = doparse(text);
  expect(result).toBe("Correctly tagged paragraph");
});
//not having opening tag
test("should output expected # found </K>", () => {
  const text = "<A>This is an error case test,</A></K>";
  const result = doparse(text);
  expect(result).toBe("Expected # found </K>");
});
//not having opening tags
test("should output expected # found </A>", () => {
  const text = "This is an error case test,</A></K>";
  const result = doparse(text);
  expect(result).toBe("Expected # found </A>");
});

//not having closing tag
test("should output expected </K> found #", () => {
  const text = "<A>This is an error case test,</A><K>";
  const result = doparse(text);
  expect(result).toBe("Expected </K> found #");
});

//not having closing tags
test("should output expected </N> found #", () => {
  const text = "<A>This is an error case test,</A><K><N>";
  const result = doparse(text);
  expect(result).toBe("Expected </N> found #");
});

//not having a correct closing tag
test("should output expected </B> found </A>", () => {
  const text = "<B>This is an error case test,</A>";
  const result = doparse(text);
  expect(result).toBe("Expected </B> found </A>");
});

//having tangled tags
test("should output expected </B> found </A>", () => {
  const text = "<J><B>This is<D> for <O></D>an </J> </O>error case test,</A>";
  const result = doparse(text);
  expect(result).toBe("Expected </O> found </D>");
});

//not having any tag
test("should output correctly tagged", () => {
  const text =
    "I am not tagged, I am a right case too cause I am not  wrongly tagged at lease";
  const result = doparse(text);
  expect(result).toBe("Correctly tagged paragraph");
});


//having invalid tags
test("should output correctly tagged", () => {
    const text =
      "<a>I am tagged, but not a <span> </span>valid tag that will be detected</a>,<c> I will be treated as normal text</b><d>";
    const result = doparse(text);
    expect(result).toBe("Correctly tagged paragraph");
  });

//empty input
test("should output nothing", () => {
  const text = "";
  const result = doparse(text);
  expect(result).toBe(undefined);
});

test("should output nothing", () => {
  const text = undefined;
  const result = doparse(text);
  expect(result).toBe(undefined);
});

test("should output nothing", ()=>{
    const text = null;
    const result = doparse(text);
    expect(result).toBe(undefined);
})