export {};

declare global {

  interface Math {
    normal(): number;
  }
}

// Extends Math with standard normal variate using Box-Muller transform.
Math.normal = function() {

  var u = 1 - Math.random(); // Subtraction to flip [0, 1) to (0, 1].
  var v = 1 - Math.random();
  return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}
