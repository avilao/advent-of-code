package main

import (
	"fmt"
)

func main() {
	// your code goes here
	vA := 699
	vB := 124

	factorA := 16807
	factorB := 48271

	mod := 2147483647
	sum := 0
	for r := 0; r < 40000000; r++ {
		vA = (vA * factorA % mod)
		vB = (vB * factorB % mod)

		tmpA := vA
		tmpB := vB
		eq := true
		for i := 0; i < 16; i++ {

			if tmpA%2 != tmpB%2 {
				eq = false
				break
			}
			tmpA /= 2
			tmpB /= 2
		}

		if eq {
			sum++
		}
	}

	fmt.Println(sum)
}
