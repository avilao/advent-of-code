// Reading and writing files are basic tasks needed for
// many Go programs. First we'll look at some examples of
// reading files.

package main

import (
	"fmt"
)

// Reading files requires checking most calls for errors.
// This helper will streamline our error checks below.
func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {

	n := 368078

	// find depth
	i := 1
	for ; (i*2+1)*(i*2+1) < n; i++ {
	}

	squareSide := (i * 2) + 1

	n = n - (i*2-1)*(i*2-1) // number from 0 to the previous square
	r := (n + i) % (i * 2)  // position on the side of the square, adding i to rotate de square so the corners are the center of the side

	x := squareSide - 1 - r // distance to the "corner"

	if x > r {
		i += r
	} else {
		i += x
	}
	fmt.Println("steps: ", i)
}
