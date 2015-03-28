var _ = require('underscore');



// var arr = [ [ '907 EAST 173 STREET', 2029780205, 3 ],
//   [ '2264 85 STREET', 3063480032, 2 ],
//   [ '1510 JESUP AVENUE', 2028720287, 1 ],
//   [ '2264 85 STREET', 3063480032, 2 ],
//   [ '907 EAST 173 STREET', 2029780205, 3 ],
//   [ '907 EAST 173 STREET', 2029780205, 3 ] ]

//   console.log(arr)
//   console.log('\n')
//   console.log(_.uniq(arr))

// var arr = [['a', 'b', 'c'], ['c', 'y', 'x'], ['2', 'b', '3']];
// var h = [{
//   'foo': '1',
//   'bar': '2'
// },
// {
//   'foo': '2',
//   'bar': '2'
// },
// {
//   'foo': '1',
//   'x': 44
// }]
// console.log(_.where(h, {'foo': '1'}));

// console.log(_.where(arr, {'1': 'b'}));

// console.log(_.sortBy(arr, '1'));

// var arr = ['a', 'b']

// // console.log(_.map(arr, function(v, i, l){
// //   l.push('c')
// //   l.push('d')
// //   return v;

// // }))


// console.log(arr.concat(['1', '2']));

// var dates = [ ['one', '2014-07-13'], ['two', '2014-07-14'], ['really first', '2014-12-13']]
// // console.log(_.sortBy(dates, '1').reverse())

// console.log(_.where(dates, {'0': 'three'})[0]);


 var arr = ['a', 'b'];

 arr.push('c', 'd', 'e');

 // console.log(arr);

 console.log(_.isEmpty([]))
 console.log(_.isEmpty(['1']))
 