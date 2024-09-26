family = {
head: "dada",
head1: "mama",
wards:{
firstSon: "Joe",
secondSon: "Romanus",
firstDot:"keren",
secondDot:"immaculate"
}
}
console.log(typeof family.wards)
console.log(family.head)
console.log(JSON.stringify(family.wards))
console.log(JSON.stringify(family))

fileJson= JSON.stringify(family)
console.log(fileJson);
fileParse= JSON.parse(fileJson)
console.log(fileParse);